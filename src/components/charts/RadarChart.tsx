import React from 'react';
import type { EChartsOption } from 'echarts';
import { GroupResult } from 'app/editor/group';
import { ReactECharts } from './ReactECharts';
import { ChartPaper, ChartPaperProps } from './ChartPaper';

export type RadarChartOptions = Omit<RadarChartProps, 'groupResult'>;

export type RadarChartProps = Omit<ChartPaperProps, 'children'> & {
  showLegend?: boolean;
  category: string; // '品牌'
  series: Array<{ name: string }>; // [{name:销量}],
  groupResult: GroupResult; // [{"大众": {销量: 39}}]
};

export function RadarChart(props: RadarChartProps) {
  const { showLegend = true, category, series: seriesData, groupResult, ...paperProps } = props;

  const chartOptions = React.useMemo<Partial<EChartsOption>>(() => {
    const indicator = seriesData.map<{ text: string; max: number }>((item) => {
      const max = Object.entries(groupResult).reduce(
        (max, [label, data]) => Math.max(max, data[item.name]),
        Number.MIN_SAFE_INTEGER,
      );
      return {
        text: item.name,
        max: max,
      };
    });

    const data = Object.keys(groupResult).map((label) => {
      const value = seriesData.map<{ name: string; value: number[] }>(({ name }) => groupResult[label][name]);
      return {
        value,
        name: label,
      };
    });

    return {
      series: [
        {
          name: category,
          type: 'radar',
          data,
        },
      ],
      radar: {
        indicator,
        center: ['50%', '60%'],
        radius: 105,
        axisName: {
          color: '#fff',
          backgroundColor: '#666',
          borderRadius: 3,
          padding: [3, 5],
        },
      },
    } as Partial<EChartsOption>;
  }, [category, seriesData, groupResult]);

  const option: EChartsOption = {
    legend: {
      show: showLegend,
    },
    ...chartOptions,
  };

  return (
    <ChartPaper {...paperProps}>
      <ReactECharts option={option} style={{ height: 300 }} size={props.size} />
    </ChartPaper>
  );
}
