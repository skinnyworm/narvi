import React from 'react';
import { Story, Meta } from '@storybook/react';
import { EditorSteps, EditorStepsProps } from './EditSteps';
import { AppProvider } from 'app/helpers';

export default {
  title: 'app/editor/drawer/EditorSteps',
  component: EditorSteps,
} as Meta;

const Template: Story<EditorStepsProps> = (args) => (
  <AppProvider>
    <EditorSteps {...args} />
  </AppProvider>
);

export const Example = Template.bind({});
Example.args = {
  widget: {},
};
