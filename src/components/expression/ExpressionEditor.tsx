import React from 'react';
import Editor from '@draft-js-plugins/editor';
import { EditorState, ContentState, EditorProps } from 'draft-js';
import createMentionPlugin, { MentionData } from '@draft-js-plugins/mention';
import '@draft-js-plugins/mention/lib/plugin.css';
import { decorators, defaultSuggestionsFilter } from './helpers';

export type ExpressionEditorProps = Pick<EditorProps, 'onFocus' | 'onBlur'> & {
  fields: string[];
  value: string;
  onChange: (value: string) => void;
};

export const ExpressionEditor = React.forwardRef<Editor, ExpressionEditorProps>((props, ref) => {
  const { fields, value, onChange, ...editorProps } = props;

  const { MentionSuggestions, plugins } = React.useMemo(() => {
    const mentionPlugin = createMentionPlugin({ mentionTrigger: '$' });
    const { MentionSuggestions } = mentionPlugin;
    const plugins = [mentionPlugin];
    return { plugins, MentionSuggestions };
  }, []);

  const [open, setOpen] = React.useState(false);

  const mentions = React.useMemo(() => {
    return fields.map((field) => {
      return {
        name: `$${field}`,
      };
    });
  }, [fields]);

  const [suggestions, setSuggestions] = React.useState<MentionData[]>(mentions);

  const [editorState, setEditorState] = React.useState<EditorState>(() => {
    let content = ContentState.createFromText(value);
    let editorState = EditorState.createWithContent(content);
    return editorState;
  });

  const handleChange = (state: EditorState) => {
    setEditorState(state);
    // const contentState = state.getCurrentContent();
    // console.log(convertToRaw(contentState));
    onChange(state.getCurrentContent().getPlainText());
  };

  return (
    <>
      <Editor
        editorKey={'editor'}
        editorState={editorState}
        onChange={handleChange}
        ref={ref}
        plugins={plugins}
        decorators={decorators}
        {...editorProps}
      />
      <MentionSuggestions
        open={open}
        onOpenChange={(open) => setOpen(open)}
        suggestions={suggestions}
        onSearchChange={(e) => setSuggestions(defaultSuggestionsFilter(e.value, mentions))}
        onAddMention={() => {
          // get the mention object selected
        }}
      />
    </>
  );
});
