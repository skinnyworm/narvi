import React from 'react';
import { Typography, Box, List, ListItemText, ListItem, ListItemButton } from '@mui/material';
import { DataSource } from 'app/types';

export function SelectDatasource({
  datasources,
  value,
  onChange,
}: {
  datasources: DataSource[];
  value?: string;
  onChange: (value: string) => void;
}) {
  return (
    <Box>
      <Typography variant="body2">
        请从已有的数据源中选择一个进行数据转换。尽管有多种数据转换的方案可供选择，但在本演示中我们仅使用Group策略。
      </Typography>
      <Box border={1} mt={2} borderColor="#CCC" borderRadius={1}>
        <List>
          {datasources.map((ds) => (
            <ListItem key={ds.id} dense disablePadding selected={ds.id === value}>
              <ListItemButton onClick={() => onChange(ds.id)}>
                <ListItemText primary={ds.meta.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
