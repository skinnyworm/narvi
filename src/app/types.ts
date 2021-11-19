import { SimpleChartOptions } from 'components/widgets/SimpleChart';

export type Value = number | string;

export type Type = 'number' | 'string' | 'unknow';

export type Schema = {
  field: string;
  type: Type;
};

export type DataSource = {
  id: string;
  meta: {
    title: string;
    schema: Schema[];
  };
  data: Array<Value[]>;
};

export type LabelSpec = string;

export type OutputSpec = {
  name: string;
  expression: string;
  format?: 'currency' | 'number' | 'percent';
};

export type ChartSpec = SimpleChartOptions;

export type Widget = {
  id: string;
  title: string;
  datasource: string;
  label: LabelSpec;
  output: OutputSpec[];
  charts: WidgetSpec[];
};
