import React from 'react';
import { Story, Meta } from '@storybook/react';
import { EditorSteps, EditorStepsProps } from './EditSteps';

export default {
  title: 'app/editor/drawer/EditorSteps',
  component: EditorSteps,
} as Meta;

const Template: Story<EditorStepsProps> = (args) => <EditorSteps {...args} />;

export const Example = Template.bind({});
Example.args = {
  widget: {},
};
