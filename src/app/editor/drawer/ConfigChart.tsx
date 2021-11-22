import React from 'react';
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  Paper,
  Select,
  Slide,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import { ChartSpec, OutputSpec, Widget } from 'app/types';
import update from 'immutability-helper';
import { WidgetSize } from 'components/charts/ChartPaper';

export type ConfigChartProps = {
  value: Partial<Widget>;
  onChange: (value: Partial<Widget>) => void;
};

const chartTypes: Record<ChartSpec['type'], string> = {
  simple: '基本图表',
  radar: '雷达图',
  bmap: '地图',
};

const createSimpleChart = (output: OutputSpec[]): ChartSpec => {
  return {
    type: 'simple',
    title: '基本图表',
    size: 'medium',
    showLegend: false,
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
    showLegend: false,
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
  const rootRef = React.useRef<HTMLElement | null>(null);
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
    <Box
      ref={rootRef}
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
              <span>图表组件</span>
              <IconButton size="small" onClick={(e) => setAddMenuAnchor(e.currentTarget)}>
                <AddIcon />
              </IconButton>
              <Menu open={Boolean(addMenuAnchor)} anchorEl={addMenuAnchor}>
                {Object.entries(chartTypes).map(([chartType, name]) => (
                  <MenuItem key={chartType} onClick={() => handleNewChartSpec(chartType as ChartSpec['type'])}>
                    {name}
                  </MenuItem>
                ))}
              </Menu>
            </ListSubheader>
          }>
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
        </List>
      </Box>

      <Slide direction="up" in={editingIndex !== null} container={rootRef.current}>
        <Paper sx={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, zIndex: 10, p: 2 }}>
          {editing && (
            <ChartForm
              value={editing}
              output={widget.output!}
              onChange={handleUpdateChartSpec}
              onClose={() => setEditingIndex(null)}
            />
          )}
        </Paper>
      </Slide>
    </Box>
  );
}

const ChartForm = ({
  output,
  value: chartSpec,
  onChange,
  onClose,
}: {
  output: OutputSpec[];
  value: ChartSpec;
  onChange: (value: ChartSpec) => void;
  onClose: () => void;
}) => {
  const handleApplyOutput = (item: OutputSpec, apply: boolean) => {
    if (apply) {
      onChange(update(chartSpec, { series: { $push: [{ name: item.name }] } }));
    } else {
      const index = chartSpec.series.findIndex((series) => series.name === item.name);
      onChange(update(chartSpec, { series: { $splice: [[index, 1]] } }));
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography>{chartTypes[chartSpec.type]}</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Stack>
        <TextField
          label="Title"
          value={chartSpec.title}
          margin="dense"
          size="small"
          onChange={(e) => onChange(update(chartSpec, { title: { $set: e.currentTarget.value } }))}
        />
        {chartSpec.type !== 'bmap' && (
          <FormControl margin="dense">
            <InputLabel id="chartspec-size">Size</InputLabel>
            <Select
              label="Size"
              labelId="chartspec-size"
              value={chartSpec.size}
              size="small"
              onChange={(e) => onChange(update(chartSpec, { size: { $set: e.target.value as WidgetSize } }))}>
              <MenuItem value="small">Small</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="large">Large</MenuItem>
            </Select>
          </FormControl>
        )}
        <List>
          {output.map((item) => {
            const series = chartSpec.series.find((series) => series.name === item.name);
            const checked = series !== undefined;
            return (
              <React.Fragment key={item.name}>
                <ListItem dense disablePadding>
                  <ListItemButton onClick={() => handleApplyOutput(item, !checked)}>
                    <ListItemIcon>
                      <Checkbox edge="start" checked={checked} tabIndex={-1} disableRipple />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            );
          })}
        </List>
      </Stack>
    </Box>
  );
};
