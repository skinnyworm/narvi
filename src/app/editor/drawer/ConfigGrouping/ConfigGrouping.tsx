import React from 'react';
import { Box, IconButton, ListItem, ListItemButton, Divider, ListItemText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Clear';
import { ExpressionField } from 'components/expression';
import { OutputSpec, Widget } from 'app/types';
import update from 'immutability-helper';
import { useAppSelector } from 'app/store';
import { OutputForm } from './OutputFrom';
import { DataList } from './DataList';

export type EditingOutput = {
  index?: number;
  output: OutputSpec;
};

export type ConfigGroupingProps = {
  value: Partial<Widget>;
  onChange: (value: Partial<Widget>) => void;
};

export const ConfigGrouping = ({ value, onChange }: ConfigGroupingProps) => {
  const { label = '', output = [] } = value;

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

      <DataList
        title="输出项表达式"
        action={
          <IconButton size="small" onClick={() => handleNewOutput()}>
            <AddIcon />
          </IconButton>
        }
        input={
          editingOutput && (
            <OutputForm
              value={editingOutput}
              schema={schema}
              onSubmit={handleSubmitOutput}
              onClose={() => setEditingOutput(null)}
            />
          )
        }
        showInput={editingOutput !== null}>
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
      </DataList>
    </Box>
  );
};
