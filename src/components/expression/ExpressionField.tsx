import React from 'react';
import Editor from '@draft-js-plugins/editor';
import { FormControl, FormHelperText, styled, InputLabel, InputLabelProps, FormControlProps } from '@mui/material';
import NotchedOutline from '@mui/material/OutlinedInput/NotchedOutline';
import clsx from 'clsx';

import { ExpressionEditor } from './ExpressionEditor';

const InputRoot = styled('div')(({ theme }) => {
  const borderColor = theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
  return {
    color: theme.palette.text.primary,
    lineHeight: '1.4375em',
    // 23px
    boxSizing: 'border-box',
    // Prevent padding issue with fullWidth.
    position: 'relative',
    cursor: 'text',
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    padding: '16.5px 14px',
    ...theme.typography.body1,

    '& > .DraftEditor-root': {
      flex: 1,
    },

    [`&:hover .notchedOutline`]: {
      borderColor: theme.palette.text.primary,
    },
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      [`&:hover .notchedOutline`]: {
        borderColor,
      },
    },
    [`&.focused .notchedOutline`]: {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },

    [`&.error .notchedOutline`]: {
      borderColor: theme.palette.error.main,
    },
    [`&.disabled .notchedOutline`]: {
      borderColor: theme.palette.action.disabled,
      color: theme.palette.text.disabled,
      cursor: 'default',
    },
  };
});

export type ExpressionFieldProps = Pick<InputLabelProps, 'disabled' | 'error'> &
  Pick<FormControlProps, 'fullWidth' | 'margin' | 'required'> & {
    fields: string[];
    label?: string;
    helperText?: string;
    value: string;
    onChange: (value: string) => void;
  };

export function ExpressionField(props: ExpressionFieldProps) {
  const { label, helperText, value, onChange, fullWidth, margin, disabled, error, required, fields = [] } = props;

  const editor = React.useRef<Editor>(null);

  const [focused, setFocused] = React.useState(false);

  return (
    <FormControl fullWidth={fullWidth} margin={margin} required={required}>
      {label && (
        <InputLabel className="label" shrink={true} focused={focused} disabled={disabled} error={error}>
          {label}
        </InputLabel>
      )}
      <InputRoot onClick={() => editor.current?.focus()} className={clsx({ focused, disabled, error })}>
        <ExpressionEditor
          ref={editor}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={value}
          onChange={onChange}
          fields={fields}
        />
        <NotchedOutline
          className="notchedOutline"
          label={required ? `${label} *` : label}
          notched={Boolean(label)}
          focused={focused}
        />
      </InputRoot>
      {helperText && <FormHelperText id="label-input-helper">{helperText}</FormHelperText>}
    </FormControl>
  );
}
