import React from "react";
import {
  Typography,
  Box,
  Drawer,
  IconButton,
  Divider,
  Toolbar,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Widget } from "app/types";
import Designer from "./Designer";

export const drawerWidth = 400;

export type EditorDrawerProps = {
  widget: Partial<Widget>;
  onChange: (widget: Partial<Widget>) => void;
  open: boolean;
  onClose: () => void;
};

export const EditorDrawer = (props: EditorDrawerProps) => {
  const { open, onClose } = props;
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
      }}
      variant="persistent"
      anchor="right"
      open={open}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          py: 1,
          justifyContent: "flex-start",
        }}
      >
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant="h6"> Design </Typography>
      </Toolbar>
      <Divider />
      <Box p={2}>
        <Designer />
      </Box>
    </Drawer>
  );
};
