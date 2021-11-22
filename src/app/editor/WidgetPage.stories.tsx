import React from 'react';
import { Story, Meta } from '@storybook/react';
import { WidgetPage } from './WidgetPage';
import { AppProvider, AppProviderProps } from 'app/helpers';
import { Route, Routes } from 'react-router';
import { initialState } from 'app/helpers/mocks';
import update from 'immutability-helper';
import { Widget } from 'app/types';

export default {
  title: 'app/editor/WidgetPage',
  component: WidgetPage,
} as Meta;

const Template: Story<AppProviderProps> = (args) => (
  <AppProvider path="/narvi/dashboard/example">
    <Routes>
      <Route path="/narvi/dashboard/:id" element={<WidgetPage />} />
    </Routes>
  </AppProvider>
);

const exampleWidget: Widget = {
  id: 'example',
  title: '2021车型销量',
  datasource: initialState.datasource.allDatasources[0].id,
  label: '$车型',
  output: [
    {
      name: '销量',
      expression: 'sum($交付数量)',
    },
  ],
  charts: [
    {
      type: 'simple',
      title: '销量图表',
      size: 'small',
      category: '车型',
      series: [{ name: '销量', type: 'bar' }],
    },
  ],
};

export const Example = Template.bind({});
Example.args = {
  state: update(initialState, { dashboard: { widgets: { $set: [exampleWidget] } } }),
};
