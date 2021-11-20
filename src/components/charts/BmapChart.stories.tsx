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
  title: 'Example',
  size: 'large',
};
