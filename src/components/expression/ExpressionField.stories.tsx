import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ExpressionField, ExpressionFieldProps } from './ExpressionField';
import { Container } from '@mui/material';

export default {
  title: 'components/ExpressionField',
  component: ExpressionField,
} as Meta;

const Template: Story<ExpressionFieldProps> = (args) => (
  <Container>
    <ExpressionField {...args} />
  </Container>
);

export const Example = Template.bind({});
Example.args = {
  label: 'Expression',
  value: 'sum($销售数量)',
  fullWidth: true,
  fields: ['销售数量', '订单数量'],
};
