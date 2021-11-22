import React from 'react';
import { ContentBlock, ContentState, DraftDecorator } from 'draft-js';
import { blue, pink } from '@mui/material/colors';
import { MentionData } from '@draft-js-plugins/mention';

const findWithRegex = (regex: RegExp, contentBlock: ContentBlock, callback: (start: number, end: number) => void) => {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
};

export const decorators: DraftDecorator[] = [
  {
    strategy: (block: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) => {
      findWithRegex(/(sum|count)/g, block, callback);
    },
    component: ({ children }: { children: React.ReactNode }) => (
      <span style={{ fontWeight: 'bold', color: blue[400] }}>{children}</span>
    ),
  },
  {
    strategy: (block: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) => {
      findWithRegex(/\$[^(\s|)|()]+/g, block, callback);
    },
    component: ({ children }: { children: React.ReactNode }) => (
      <span
        style={{
          padding: 2,
          backgroundColor: blue[50],
          borderRadius: 4,
          marginLeft: 3,
          marginRight: 3,
          display: 'inline-block',
          color: pink[400],
        }}>
        {children}
      </span>
    ),
  },
];

// export const applyMentionEntity(editorState: EditorState){
//   const contentState = editorState.getCurrentContent();
//   const blocks = contentState.getBlocksAsArray();
//   const block =blocks[0]
//   const text = block.getText();
//   const selction = SelectionState.createEmpty(block.getKey())

//   const regex = /($\w)/
//   let result;
//   while((result = regex.exect))
// }

export const defaultSuggestionsFilter = (
  searchValue: string,
  suggestions: MentionData[],
  trigger?: string,
): MentionData[] => {
  const value = searchValue.toLowerCase();
  const triggerSuggestions: MentionData[] =
    trigger && !Array.isArray(suggestions) ? suggestions[trigger] : (suggestions as MentionData[]);
  const filteredSuggestions = triggerSuggestions.filter(
    (suggestion) => !value || suggestion.name.toLowerCase().indexOf(value) > -1,
  );
  const length = filteredSuggestions.length < 8 ? filteredSuggestions.length : 8;
  return filteredSuggestions.slice(0, length);
};
