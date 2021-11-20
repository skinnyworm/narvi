import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';

const grids = {
  small: {
    xs: 12,
    sm: 6,
    md: 4,
    lg: 3,
  },
  medium: {
    xs: 12,
    sm: 12,
    md: 8,
    lg: 6,
  },
  large: {
    xs: 12,
  },
};

export type WidgetSize = 'small' | 'medium' | 'large';

export type ChartPaperProps = {
  title?: string;
  size?: WidgetSize;
  children: React.ReactNode;
};

export function ChartPaper({ title, size = 'small', children }: ChartPaperProps) {
  const gridProps = grids[size];
  return (
    <Grid item {...gridProps}>
      <Paper>
        {title && (
          <Box p={2}>
            <Typography>{title}</Typography>
          </Box>
        )}
        {children}
      </Paper>
    </Grid>
  );
}
