import React from 'react';
import type { EChartsOption } from 'echarts';
import { GroupResult } from 'app/editor/group';
import { ReactECharts } from './ReactECharts';
import { ChartPaper, ChartPaperProps } from './ChartPaper';

export type SimpleChartOptions = Omit<SimpleChartProps, 'groupResult'>;

export type SimpleChartType = 'line' | 'bar' | 'scatter';

export type SimpleChartSeries = {
  name: string;
  type?: SimpleChartType;
};
export type SimpleChartProps = Omit<ChartPaperProps, 'children'> & {
  showLegend?: boolean;
  category: string; // '品牌'
  series: Array<SimpleChartSeries>; // [{name:销量: type:'bar'}],
  groupResult: GroupResult; // [{"大众": {销量: 39}}]
};

export function SimpleChart(props: SimpleChartProps) {
  const { showLegend = true, category, series: seriesData, groupResult, ...paperProps } = props;
  const chartOptions = React.useMemo<Partial<EChartsOption>>(() => {
    const { names, series } = seriesData.reduce<{ names: string[]; series: Array<{ type: SimpleChartType }> }>(
      (options, item) => {
        return {
          names: [...options.names, item.name],
          series: [...options.series, { type: item.type || 'bar' }],
        };
      },
      {
        names: [],
        series: [],
      },
    );
    const dataset = {
      dimensions: [category, ...names],
      source: Object.entries(groupResult).map(([label, data]) => {
        return { [category]: label, ...data };
      }),
    };

    return { dataset, series };
  }, [category, seriesData, groupResult]);

  const option: EChartsOption = {
    ...chartOptions,
    xAxis: {
      type: 'category',
    },
    yAxis: {},
    legend: {
      show: showLegend,
    },
  };

  return (
    <ChartPaper {...paperProps}>
      <ReactECharts option={option} style={{ height: 300 }} size={props.size} />
    </ChartPaper>
  );
}
