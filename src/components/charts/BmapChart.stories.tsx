import React from 'react';
import { Story, Meta } from '@storybook/react';
import { BmapChart, BmapChartProps } from './BmapChart';

export default {
  title: 'components/charts/BmapChart',
  component: BmapChart,
} as Meta;

const Template: Story<BmapChartProps> = (args) => <BmapChart {...args} />;

export const Example = Template.bind({});
Example.args = {
  title: '城市销量统计',
  size: 'medium',
  category: 'city',
  series: [
    {
      name: '销量',
      size: 'scaled',
    },
    {
      name: '销售金额',
      size: 'scaled',
    },
  ],
  groupResult: {
    上海: {
      销量: 120,
      销售金额: 400000,
    },
    北京: {
      销量: 220,
      销售金额: 500000,
    },
    广州: {
      销量: 400,
      销售金额: 600000,
    },
  },
};
