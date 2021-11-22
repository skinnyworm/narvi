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
  // const chartOptions = React.useMemo<Partial<EChartsOption>>(() => {
  //   // const { names, series } = seriesData.reduce<{ names: string[]; series: Array<{ type: ChartType }> }>(
  //   //   (options, item) => {
  //   //     return {
  //   //       names: [...options.names, item.name],
  //   //       series: [...options.series, { type: item.type }],
  //   //     };
  //   //   },
  //   //   {
  //   //     names: [],
  //   //     series: [],
  //   //   },
  //   // );
  //   const dataset = {
  //     dimensions: [category, ...seriesData],
  //     source: Object.entries(groupResult).map(([label, data]) => {
  //       return { [category]: label, ...data };
  //     }),
  //   };
  //   return { dataset };
  // }, [category, seriesData, groupResult]);

  const option: EChartsOption = {
    legend: {
      show: showLegend,
    },
    radar: {
      indicator: [
        { text: '完成率', max: 1 },
        { text: '转化率', max: 1 },
        { text: '跟进率', max: 1 },
        { text: '销售完成率', max: 1 },
        { text: '指标转换率', max: 1 },
      ],
      center: ['50%', '60%'],
      radius: 105,
      axisName: {
        color: '#fff',
        backgroundColor: '#666',
        borderRadius: 3,
        padding: [3, 5],
      },
    },
    series: [
      {
        name: '个人表现',
        type: 'radar',
        data: [
          {
            value: [0.5, 0.8, 0.6, 0.4, 0.9],
            name: '章三',
          },
          {
            value: [0.6, 0.4, 0.7, 0.8, 0.9],
            name: '李四',
          },
        ],
      },
    ],
  };

  return (
    <ChartPaper {...paperProps}>
      <ReactECharts option={option} style={{ height: 300 }} size={props.size} />
    </ChartPaper>
  );
}
