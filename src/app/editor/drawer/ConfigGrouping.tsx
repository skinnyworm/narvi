import React, { FormEvent } from 'react';
import {
  Box,
  List,
  IconButton,
  ListItem,
  ListSubheader,
  ListItemButton,
  Typography,
  Divider,
  ListItemText,
  Slide,
  Paper,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Clear';
import { OutputSpec, Schema, Widget } from 'app/types';
import { ExpressionField } from 'components/expression';
import update from 'immutability-helper';
import { useAppSelector } from 'app/store';

type EditingOutput = {
  index?: number;
  output: OutputSpec;
};

export type ConfigGroupingProps = {
  value: Partial<Widget>;
  onChange: (value: Partial<Widget>) => void;
};

export const ConfigGrouping = ({ value, onChange }: ConfigGroupingProps) => {
  const { label = '', output = [] } = value;
  const outputEditorRef = React.useRef<HTMLElement>(null);
  const [editingOutput, setEditingOutput] = React.useState<EditingOutput | null>(null);
  const datasource = useAppSelector((state) => {
    if (value.datasource) {
      return state.datasource.allDatasources.find((ds) => ds.id === value.datasource);
    }
  });

  const schema = React.useMemo(() => {
    return datasource?.meta.schema || [];
  }, [datasource]);

  const groupFields = React.useMemo(() => {
    return schema.filter((s) => s.type === 'string').map((s) => s.field);
  }, [schema]);

  const handleNewOutput = () => {
    setEditingOutput({
      output: {
        name: '',
        expression: '',
      },
    });
  };

  const handleEditOutput = (i: number, output: OutputSpec) => {
    setEditingOutput({
      index: i,
      output: output,
    });
  };

  const handleDeleteOutput = (i: number) => {
    onChange(update(value, { output: { $splice: [[i, 1]] } }));
  };

  const handleSubmitOutput = (outputSpec: OutputSpec, index?: number) => {
    setEditingOutput(null);
    if (index === undefined) {
      const next = value.output ? value : { ...value, output: [] };
      onChange(update(next, { output: { $push: [outputSpec] } }));
    } else {
      onChange(update(value, { output: { [index]: { $set: outputSpec } } }));
    }
  };

  const handleLabelChange = (label: string) => {
    onChange(update(value, { label: { $set: label } }));
  };

  return (
    <Box>
      <ExpressionField
        label="分组表达式"
        value={label || ''}
        onChange={handleLabelChange}
        margin="normal"
        fields={groupFields}
        fullWidth
        required
      />
      <Box
        ref={outputEditorRef}
        sx={{
          position: 'relative',
          mt: 2,
          borderRadius: 1,
          border: 1,
          boxSizing: 'border-box',
          borderColor: 'text.disabled',
          overflow: 'hidden',
          height: 400,
        }}>
        <Box height="100%" overflow="auto">
          <List
            subheader={
              <ListSubheader
                component="div"
                sx={{
                  bgcolor: '#f0f0f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <span>输出项表达式</span>
                <IconButton size="small" onClick={() => handleNewOutput()}>
                  <AddIcon />
                </IconButton>
              </ListSubheader>
            }>
            {output.map((item, i) => {
              return (
                <React.Fragment key={item.name}>
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        size="small"
                        color="warning"
                        onClick={() => handleDeleteOutput(i)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                    disablePadding>
                    <ListItemButton onClick={() => handleEditOutput(i, item)}>
                      <ListItemText primary={item.name} secondary={item.expression} />
                    </ListItemButton>
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              );
            })}
          </List>
        </Box>

        <Slide direction="up" in={editingOutput !== null} container={outputEditorRef.current}>
          <Paper sx={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, zIndex: 10, p: 2 }}>
            {editingOutput && (
              <EditingForm
                value={editingOutput}
                schema={schema}
                onSubmit={handleSubmitOutput}
                onClose={() => setEditingOutput(null)}
              />
            )}
          </Paper>
        </Slide>
      </Box>
    </Box>
  );
};

const EditingForm = ({
  schema,
  value,
  onSubmit,
  onClose,
}: {
  schema: Schema[];
  value: EditingOutput;
  onSubmit: (output: OutputSpec, index?: number) => void;
  onClose: () => void;
}) => {
  const { index } = value;
  const editing = index !== undefined;
  const [output, setOutput] = React.useState(value.output);

  const fields = React.useMemo(() => {
    return schema.filter((s) => s.type === 'number').map((s) => s.field);
  }, [schema]);

  const updateField = (field: string, value: string) => {
    setOutput({ ...output, [field]: value });
  };

  const handleSubmit = (e: FormEvent) => {
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
};
