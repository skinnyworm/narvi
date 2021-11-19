import React from 'react';
import { Box, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp, zhCN } from '@mui/x-data-grid';
import type { Widget } from 'app/types';
import { GroupResult } from '../group';
import { DataGridPaper } from './DatasourceView';

type RowColumn = {
  rows: GridRowsProp;
  columns: GridColDef[];
};

export function OutputView({ groupResult, widget }: { groupResult: GroupResult; widget: Widget }) {
  const { rows, columns } = React.useMemo<RowColumn>(() => {
    const rows: GridRowsProp = Object.entries(groupResult).map(([label, output], i) => ({
      id: i,
      label: label,
      ...output,
    }));
    const columns = widget.output.reduce<GridColDef[]>(
      (columns, outputSpec) => {
        return [
          ...columns,
          {
            field: outputSpec.name,
            width: 150,
          },
        ];
      },
      [{ field: 'label', headerName: widget.label, width: 150 }],
    );
    return { rows, columns };
  }, [widget, groupResult]);

  return (
    <Box component="section" my={2}>
      <Typography variant="h6" gutterBottom>
        输出结果
      </Typography>
      <DataGridPaper>
        <DataGrid rows={rows} columns={columns} localeText={zhCN.components.MuiDataGrid.defaultProps.localeText} />
      </DataGridPaper>
    </Box>
  );
}
