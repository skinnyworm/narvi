import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ConfigGrouping, ConfigGroupingProps } from './ConfigGrouping';
import { Box } from '@mui/system';

export default {
  title: 'app/editor/drawer/ConfigGrouping',
  component: ConfigGrouping,
  argTypes: { onChange: { action: 'changed' } },
} as Meta;

const Template: Story<ConfigGroupingProps> = (args) => (
  <Box width={400}>
    <ConfigGrouping {...args} />
  </Box>
);

export const Example = Template.bind({});
Example.args = {
  value: {
    label: '$车型',
    output: [
      {
        name: '销量',
        expression: 'sum($交付数量)',
      },
      {
        name: '完成度',
        expression: 'sum($交付数量)/300',
        format: 'percent',
      },
    ],
  },
};
