import React from 'react';
import update from 'immutability-helper';
import { Divider, IconButton, ListItem, ListItemButton, ListItemText, Menu, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { ChartSpec, OutputSpec, Widget } from 'app/types';
import { DataList } from '../ConfigGrouping';
import { ChartInput } from './ChartInput';

export type ConfigChartProps = {
  value: Partial<Widget>;
  onChange: (value: Partial<Widget>) => void;
};

export const chartTypes: Record<ChartSpec['type'], string> = {
  simple: '基本图表',
  radar: '雷达图',
  bmap: '地图',
};

const createSimpleChart = (output: OutputSpec[]): ChartSpec => {
  return {
    type: 'simple',
    title: '基本图表',
    size: 'medium',
    showLegend: true,
    category: 'label',
    series: output.map((item) => ({
      name: item.name,
      type: 'bar',
    })),
  };
};

const createRadarChart = (output: OutputSpec[]): ChartSpec => {
  return {
    type: 'radar',
    title: '雷达图',
    size: 'medium',
    showLegend: true,
    category: 'label',
    series: output.map((item) => ({
      name: item.name,
    })),
  };
};

const createBmapChart = (output: OutputSpec[]): ChartSpec => {
  return {
    type: 'bmap',
    title: '全国城市地图',
    showLegend: false,
    category: 'city',
    series: output.map((item) => ({
      name: item.name,
      showLabel: true,
      size: 'scaled',
    })),
  };
};

export function ConfigChart(props: ConfigChartProps) {
  const { value: widget, onChange } = props;

  const [addMenuAnchor, setAddMenuAnchor] = React.useState<HTMLElement | null>(null);
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);

  const handleNewChartSpec = (type: ChartSpec['type']) => {
    setAddMenuAnchor(null);
    const addChart = (widget: Partial<Widget>): Partial<Widget> => {
      if (!widget.charts) {
        widget = { ...widget, charts: [] };
      }

      switch (type) {
        case 'simple':
          return update(widget, { charts: { $push: [createSimpleChart(widget.output!)] } });
        case 'radar':
          return update(widget, { charts: { $push: [createRadarChart(widget.output!)] } });
        case 'bmap':
          return update(widget, { charts: { $push: [createBmapChart(widget.output!)] } });
      }
    };

    const next = addChart(widget);
    setEditingIndex(next.charts!.length - 1);
    setAddMenuAnchor(null);
    onChange(next);
  };

  const handleUpdateChartSpec = (value: ChartSpec) => {
    onChange(update(widget, { charts: { [editingIndex!]: { $set: value } } }));
  };

  const handleDeleteChartSpec = (index: number) => {
    onChange(update(widget, { charts: { $splice: [[index, 1]] } }));
  };

  const editing = editingIndex !== null && widget.charts ? widget.charts[editingIndex] : null;

  return (
    <DataList
      title="图表组件"
      action={
        <>
          <IconButton size="small" onClick={(e) => setAddMenuAnchor(e.currentTarget)}>
            <AddIcon />
          </IconButton>
          <Menu open={Boolean(addMenuAnchor)} anchorEl={addMenuAnchor} onClose={() => setAddMenuAnchor(null)}>
            {Object.entries(chartTypes).map(([chartType, name]) => (
              <MenuItem key={chartType} onClick={() => handleNewChartSpec(chartType as ChartSpec['type'])}>
                {name}
              </MenuItem>
            ))}
          </Menu>
        </>
      }
      input={
        editing && (
          <ChartInput
            value={editing}
            output={widget.output!}
            onChange={handleUpdateChartSpec}
            onClose={() => setEditingIndex(null)}
          />
        )
      }
      showInput={editingIndex !== null}>
      {(widget.charts || []).map((chart, i) => {
        return (
          <React.Fragment key={i}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete" size="small" onClick={() => handleDeleteChartSpec(i)}>
                  <DeleteIcon />
                </IconButton>
              }
              disablePadding>
              <ListItemButton onClick={() => setEditingIndex(i)}>
                <ListItemText primary={chart.title} secondary={chart.type} />
              </ListItemButton>
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        );
      })}
    </DataList>
  );
}
