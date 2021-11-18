import React from 'react';
import { Table, Typography } from '@mui/material';
import { DataSource } from 'app/types';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Box } from '@mui/system';

export function DatasourceView({ datasource }: { datasource: DataSource }) {
  const {
    meta: { schema },
    data,
  } = datasource;

  const { rows, columns } = React.useMemo(() => {
    const rows: GridRowsProp = datasource.data.map<Record<string, any>>((row, i) => {
      return row.reduce((item, value, i) => ({ ...item, [schema[i].field]: value }), { id: String(i) });
    });

    const columns: GridColDef[] = schema.map((schema) => ({
      field: schema.field,
    }));

    return { rows, columns };
  }, [data, schema]);

  return (
    <section>
      <Typography variant="h6">数据集</Typography>
      <Box height={500} display="flex">
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </section>
  );
}
