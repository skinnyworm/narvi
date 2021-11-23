import React from 'react';
import { OutputSpec, Schema } from 'app/types';
import { EditingOutput } from './ConfigGrouping';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { ExpressionField } from 'components/expression';
import { Box } from '@mui/system';

export type OutputFormProps = {
  schema: Schema[];
  value: EditingOutput;
  onSubmit: (output: OutputSpec, index?: number) => void;
  onClose: () => void;
};

export function OutputForm(props: OutputFormProps) {
  const { schema, value, onSubmit, onClose } = props;
  const { index } = value;
  const editing = index !== undefined;
  const [output, setOutput] = React.useState(value.output);

  const fields = React.useMemo(() => {
    return schema.filter((s) => s.type === 'number').map((s) => s.field);
  }, [schema]);

  const updateField = (field: string, value: string) => {
    setOutput({ ...output, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(output, index);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography>{value.index !== undefined ? output.name : '创建新的输出项'}</Typography>
      <TextField
        name="name"
        label="输出项名称"
        variant="outlined"
        value={output.name}
        onChange={(e) => updateField('name', e.currentTarget.value)}
        margin="normal"
        disabled={editing}
        fullWidth
        required
      />
      <ExpressionField
        label="表达式"
        value={output.expression}
        fields={fields}
        onChange={(value) => updateField('expression', value)}
        margin="normal"
        fullWidth
        required
      />
      <FormControl margin="normal" fullWidth>
        <InputLabel id="demo-simple-select-label">输出格式</InputLabel>
        <Select
          label="输出格式"
          value={output.format}
          onChange={(e) => {
            updateField('format', e.target.value);
          }}>
          <MenuItem value="number">整数</MenuItem>
          <MenuItem value="currency">货币</MenuItem>
          <MenuItem value="percent">百分比</MenuItem>
          <MenuItem>
            <Typography color="textSecondary">
              <em>无格式</em>
            </Typography>
          </MenuItem>
        </Select>
      </FormControl>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          '& > *': {
            mr: 1,
          },
        }}>
        <Button onClick={onClose}>取消</Button>
        <Button type="submit" variant="contained">
          {editing ? '确认修改' : '创建'}
        </Button>
      </Box>
    </form>
  );
}
