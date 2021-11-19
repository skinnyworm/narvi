import React from 'react';
import { Story, Meta } from '@storybook/react';
import { SimpleChart, SimpleChartProps } from './SimpleChart';
import { Container, Grid } from '@mui/material';

export default {
  title: 'components/charts/SimpleChart',
  component: SimpleChart,
} as Meta;

const Template: Story<SimpleChartProps> = (args) => (
  <Container>
    <Grid container spacing={2}>
      <SimpleChart {...args} />
    </Grid>
  </Container>
);

export const Example = Template.bind({});
Example.args = {
  title: '半年度销量统计',
  size: 'medium',
  category: '月份',
  series: [
    { name: '销量', type: 'bar' },
    { name: '指标', type: 'line' },
  ],
  groupResult: {
    '2021年1月': {
      销量: 1000,
      指标: 1500,
    },
    '2021年2月': {
      销量: 2000,
      指标: 1700,
    },
    '2021年3月': {
      销量: 1500,
      指标: 2400,
    },
    '2021年4月': {
      销量: 2300,
      指标: 2000,
    },
    '2021年5月': {
      销量: 900,
      指标: 1000,
    },
    '2021年6月': {
      销量: 400,
      指标: 500,
    },
  },
};
