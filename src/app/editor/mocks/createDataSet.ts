import { Schema, Value, DataSource } from "../types";
import range from "lodash/range";

export type SchemaSpec = Schema & {
  value: (prev: Value[]) => Value;
};

export function createDataSet(
  title: string,
  schema: SchemaSpec[],
  rows: number
): DataSource {
  return {
    meta: {
      title,
      schema: schema.map<Schema>(({ field, type }) => ({ field, type })),
    },
    data: range(0, rows).map<Value[]>((i) => {
      return schema.reduce<Value[]>((prev, spec) => {
        return [...prev, spec.value(prev)];
      }, []);
    }),
  };
}

export function toCsv(ds: DataSource) {
  const header = ds.meta.schema.map((item) => item.field).join(",");
  const rows = ds.data.map((row) => row.join(","));
  return [header, ...rows].join("\n");
}
