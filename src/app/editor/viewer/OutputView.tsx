import React from 'react';
import { Box, Typography } from '@mui/material';
import { GroupResult } from '../group';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { LabelSpec, OutputSpec } from 'app/types';

type RowColumn = {
  rows: GridRowsProp;
  columns: GridColDef[];
};

export function OutputView({
  groupResult,
  output,
  label,
}: {
  groupResult: GroupResult;
  output: OutputSpec[];
  label: LabelSpec;
}) {
  const { rows, columns } = React.useMemo<RowColumn>(() => {
    const rows: GridRowsProp = Object.entries(groupResult).map(([label, output], i) => ({
      id: i,
      label: label,
      ...output,
    }));
    const columns = output.reduce<GridColDef[]>(
      (columns, outputSpec) => {
        return [
          ...columns,
          {
            field: outputSpec.name,
          },
        ];
      },
      [{ field: 'label', headerName: '标签' }],
    );
    return { rows, columns };
  }, [groupResult]);

  console.log(rows);

  return (
    <section>
      <Typography variant="h6">输出结果</Typography>
      <Box height={500} display="flex">
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </section>
  );
}
