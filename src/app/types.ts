export type Value = number | string;

export type Type = "number" | "string" | "unknow";

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
  format?: "currency" | "number" | "percent";
};

export type ChartSpec =
  | LineChartSpec
  | BarChatSpec
  | SpiderChartSpec
  | PieChartSpec;

export type BarChatSpec = {
  type: "bar-chart";
  valueFields: string[];
};

export type LineChartSpec = {
  type: "line-chart";
  valueFields: string[];
};

export type SpiderChartSpec = {
  type: "spider-chart";
  valueFields: string[];
};

export type PieChartSpec = {
  type: "pie-chart";
  valueField: string;
};

export type Widget = {
  id: string;
  title: string;
  datasource: string;
  label: LabelSpec;
  output: OutputSpec[];
  charts: ChartSpec[];
  size: "s" | "m" | "l";
};
