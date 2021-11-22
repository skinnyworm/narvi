import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

import { ChartSpec } from 'app/types';
import { GroupResult } from '../group';
import { RadarChart } from 'components/charts/RadarChart';
import { BmapChart } from 'components/charts/BmapChart';
import { SimpleChart } from 'components/charts';

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
        {charts.map((spec, i) => {
          console.log(spec);
          switch (spec.type) {
            case 'radar':
              return (
                <RadarChart
                  key={i}
                  groupResult={groupResult}
                  title={spec.title}
                  size={spec.size}
                  category={spec.category}
                  series={spec.series}
                />
              );

            case 'bmap':
              return (
                <BmapChart
                  key={i}
                  groupResult={groupResult}
                  title={spec.title}
                  category={spec.category}
                  series={spec.series}
                />
              );

            default:
              return (
                <SimpleChart
                  key={i}
                  groupResult={groupResult}
                  title={spec.title}
                  size={spec.size}
                  category={spec.category}
                  series={spec.series}
                />
              );
          }
        })}
      </Grid>
    </Box>
  );
}
