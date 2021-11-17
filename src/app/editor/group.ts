import { DataSource, LabelSpec, OutputSpec, Value } from "app/types";
import { AnyExpression, evaluate, parse, reduce } from "./expression";

type LabelState = Record<string, AnyExpression>;

export type LabelOutput = Record<string, any>;

export type GroupResult = Record<string, LabelOutput>;

export function group(
  datasource: DataSource,
  label: LabelSpec,
  output: OutputSpec[]
): GroupResult {
  const { data, meta } = datasource;
  const keys = meta.schema.map((item) => `$${item.field}`);
  const labelExp = parse(label);

  const getRow = (values: Value[]) =>
    values.reduce<Record<string, Value>>(
      (row, value, i) => ({ ...row, [keys[i]]: value }),
      {}
    );

  const getInitialLabelState = () => {
    return output.reduce<LabelState>(
      (labelState, { name, expression }) => ({
        ...labelState,
        [name]: parse(expression),
      }),
      {}
    );
  };

  const state = data.reduce<Record<string, LabelState>>(
    (resultData, values) => {
      const row = getRow(values);
      const label = evaluate(labelExp, row);
      const labelState = output.reduce<LabelState>((labelState, { name }) => {
        return { ...labelState, [name]: reduce(labelState[name], row) };
      }, resultData[label] || getInitialLabelState());
      return { ...resultData, [label]: labelState };
    },
    {}
  );

  return Object.entries(state).reduce<GroupResult>(
    (labelRecords, [label, labelState]) => {
      const labelValues = Object.entries(labelState).reduce<LabelOutput>(
        (labelValues, [label, expression]) => {
          return { ...labelValues, [label]: evaluate(expression, {}) };
        },
        {}
      );
      return { ...labelRecords, [label]: labelValues };
    },
    {}
  );
}
