import { BmapChartOptions } from 'components/charts/BmapChart';
import { RadarChartOptions } from 'components/charts/RadarChart';
import { SimpleChartOptions } from 'components/charts/SimpleChart';

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

export type ChartSpec =
  | (SimpleChartOptions & { type: 'simple' })
  | (RadarChartOptions & { type: 'radar' })
  | (BmapChartOptions & { type: 'bmap' });

export type Widget = {
  id: string;
  title: string;
  datasource: string;
  label: LabelSpec;
  output: OutputSpec[];
  charts: ChartSpec[];
};
