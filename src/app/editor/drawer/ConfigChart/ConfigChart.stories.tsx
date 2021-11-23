import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ConfigChart, ConfigChartProps } from './ConfigChart';
import { Container, Box } from '@mui/material';
import { Widget } from 'app/types';

export default {
  title: 'app/editor/drawer/ConfigChart',
  component: ConfigChart,
} as Meta;

const Template: Story<ConfigChartProps> = (args) => <TestComponent {...args} />;

const TestComponent = (props: ConfigChartProps) => {
  const [widget, setWidget] = React.useState(props.value);
  const handleChange = (widget: Partial<Widget>) => {
    console.log(widget);
    setWidget(widget);
  };
  return (
    <Container>
      <Box width={400}>
        <ConfigChart value={widget} onChange={handleChange} />
      </Box>
    </Container>
  );
};

export const Empty = Template.bind({});
Empty.args = {
  value: {
    output: [
      {
        name: '销量',
        expression: 'sum()',
      },
      {
        name: '金额',
        expression: 'sum()',
      },
    ],
    charts: [],
  },
};

export const Example = Template.bind({});
Example.args = {
  value: {
    output: [
      {
        name: '销量',
        expression: 'sum()',
      },
      {
        name: '金额',
        expression: 'sum()',
      },
    ],
    charts: [
      {
        type: 'simple',
        title: '年度销量统计',
        size: 'small',
        showLegend: false,
        category: '月',
        series: [
          {
            name: '销量',
            type: 'bar',
          },
        ],
      },
    ],
  },
};
