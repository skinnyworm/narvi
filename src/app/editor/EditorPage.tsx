import React from "react";
import { Box, Stack } from "@mui/material";
import { AppPage } from "components/layout";
import { DataSource, LabelSpec, OutputSpec, WidgetSpec } from "./types";

type Project = {
  datasource: DataSource;
  label: LabelSpec;
  output: OutputSpec[];
  widgets: WidgetSpec[];
};

export type WidgetEditorProps = {
  project: Partial<Project>;
};

export function EditorPage(props: WidgetEditorProps) {
  return (
    <AppPage title="Editor">
      <Stack direction="row">
        <Box component="article" flex={1} bgcolor="#F0F0F0"></Box>
        <Box component="aside" width={300} bgcolor="white"></Box>
      </Stack>
    </AppPage>
  );
}
