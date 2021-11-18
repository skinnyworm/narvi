import React from 'react';
import { Typography, Box, Drawer, IconButton, Divider, Toolbar } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { EditorSteps, EditorStepsProps } from './EditSteps';

export const drawerWidth = 400;

export type EditorDrawerProps = EditorStepsProps & {
  open: boolean;
  onClose: () => void;
};

export const EditorDrawer = (props: EditorDrawerProps) => {
  const { open, onClose, ...stepperProps } = props;
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
        },
      }}
      variant="persistent"
      anchor="right"
      open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          py: 1,
          justifyContent: 'flex-start',
        }}>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant="h6"> Design </Typography>
      </Toolbar>
      <Divider />
      <Box p={2}>
        <EditorSteps {...stepperProps} />
        {/* <Button onClick={() => setActiveStep(0)}>Reset</Button> */}
      </Box>
    </Drawer>
  );
};
