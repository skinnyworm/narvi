import React from "react";
import { Box } from "@mui/material";
import { Widget } from "app/types";

export type ViewerProps = {
  widget: Partial<Widget>;
};

export function Viewer(props: ViewerProps) {
  return <Box></Box>;
}
