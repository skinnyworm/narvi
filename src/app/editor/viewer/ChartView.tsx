import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { ChartSpec } from 'app/types';
import { ChartCard } from 'components/charts';
import { GroupResult } from '../group';

export type ChartViewProps = {
  charts: ChartSpec[];
  groupResult: GroupResult;
};

export function ChartView(props: ChartViewProps) {
  const { charts, groupResult } = props;

  return (
    <Box component="section" my={2}>
      <Typography variant="h6" gutterBottom>
        图表组件
      </Typography>
      <Grid container spacing={2}>
        {charts.map((spec, i) => (
          <ChartCard key={i} spec={spec} groupResult={groupResult} />
        ))}
      </Grid>
    </Box>
  );
}
