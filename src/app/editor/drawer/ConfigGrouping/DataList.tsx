import React from 'react';
import { Box, Paper, Slide, List, ListSubheader } from '@mui/material';

export type DataListProps = {
  title: string;
  action: React.ReactNode;
  children: React.ReactNode;
  input: React.ReactNode;
  showInput: boolean;
};

export function DataList(props: DataListProps) {
  const { title, action, children, input, showInput } = props;
  const rootRef = React.useRef<HTMLElement | null>(null);
  return (
    <Box
      ref={rootRef}
      sx={{
        position: 'relative',
        mt: 2,
        borderRadius: 1,
        border: 1,
        boxSizing: 'border-box',
        borderColor: 'text.disabled',
        overflow: 'hidden',
        height: 520,
      }}>
      <Box height="100%" overflow="auto">
        <List
          subheader={
            <ListSubheader
              component="div"
              sx={{
                bgcolor: '#f0f0f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <span>{title}</span>
              {action}
            </ListSubheader>
          }>
          {children}
        </List>
      </Box>

      <Slide direction="up" in={showInput} container={rootRef.current}>
        <Paper
          sx={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, zIndex: 10, p: 2, overflow: 'hidden' }}>
          {input}
        </Paper>
      </Slide>
    </Box>
  );
}
