import React from 'react';
import { Paper, Box, Typography, styled } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp, zhCN } from '@mui/x-data-grid';
import { DataSource } from 'app/types';

export const DataGridPaper = styled(Paper)(({ theme }) => {
  return {
    display: 'flex',
    height: 300,
    '& .MuiDataGrid-footerContainer': {
      backgroundColor: '#f0f0f0',
    },
  };
});

export function DatasourceView({ datasource }: { datasource: DataSource }) {
  const {
    meta: { schema },
    data,
  } = datasource;

  const { rows, columns } = React.useMemo(() => {
    const rows: GridRowsProp = data.map<Record<string, any>>((row, i) => {
      return row.reduce((item, value, i) => ({ ...item, [schema[i].field]: value }), { id: String(i) });
    });

    const columns: GridColDef[] = schema.map((schema) => ({
      field: schema.field,
    }));

    return { rows, columns };
  }, [data, schema]);

  return (
    <Box component="section" my={2}>
      <Typography variant="h6" gutterBottom>
        数据集
      </Typography>
      <DataGridPaper>
        <DataGrid rows={rows} columns={columns} localeText={zhCN.components.MuiDataGrid.defaultProps.localeText} />
      </DataGridPaper>
    </Box>
  );
}
