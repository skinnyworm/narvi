export type Value = number | string;

export type Type = "number" | "string" | "unknow";

export type Schema = {
  field: string;
  type: Type;
};

export type DataSource = {
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

export type WidgetSpec =
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
