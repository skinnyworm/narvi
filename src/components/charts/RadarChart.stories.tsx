import React from 'react';
import { Story, Meta } from '@storybook/react';
import { RadarChart, RadarChartProps } from './RadarChart';

export default {
  title: 'components/charts/RadarChart',
  component: RadarChart,
} as Meta;

const Template: Story<RadarChartProps> = (args) => <RadarChart {...args} />;

export const Example = Template.bind({});
Example.args = {
  title: 'Example',
};
