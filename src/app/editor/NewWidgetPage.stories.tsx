import React from 'react';
import { Story, Meta } from '@storybook/react';
import { NewWidgetPage } from './NewWidgetPage';
import { AppProvider } from 'app/helpers';

export default {
  title: 'app/editor/NewWidgetPage',
  component: NewWidgetPage,
} as Meta;

const Template: Story<{}> = (args) => (
  <AppProvider>
    <NewWidgetPage {...args} />
  </AppProvider>
);

export const Example = Template.bind({});
Example.args = {};
