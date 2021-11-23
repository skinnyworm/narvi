import React from 'react';
import update from 'immutability-helper';
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
  Menu,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { ChartSpec, OutputSpec } from 'app/types';
import { SimpleChartSeries, SimpleChartType, WidgetSize } from 'components/charts';
import { chartTypes } from './ConfigChart';

export type ChartInputProps = {
  output: OutputSpec[];
  value: ChartSpec;
  onChange: (value: ChartSpec) => void;
  onClose: () => void;
};

export function ChartInput(props: ChartInputProps) {
  const { output, value: chartSpec, onChange, onClose } = props;

  const handleApplyOutput = (item: OutputSpec, apply: boolean) => {
    if (apply) {
      onChange(update(chartSpec, { series: { $push: [{ name: item.name }] } }));
    } else {
      const index = chartSpec.series.findIndex((series) => series.name === item.name);
      onChange(update(chartSpec, { series: { $splice: [[index, 1]] } }));
    }
  };

  const secondaryAction = (index: number) => {
    switch (chartSpec.type) {
      case 'simple': {
        const series = chartSpec.series[index] as SimpleChartSeries;

        return (
          <ChartTypeMenu
            series={series}
            onChange={(value) => {
              onChange(update(chartSpec, { series: { [index]: { $set: value } } }));
            }}
          />
        );
      }

      case 'bmap':
        return (
          <IconButton onClick={() => {}}>
            <MoreVertIcon />
          </IconButton>
        );

      default:
        return null;
    }
  };

  return (
    <Stack>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography>{chartTypes[chartSpec.type]}</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Stack flex={1} overflow="hidden">
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
          {output.map((item, i) => {
            const seriesIndex = chartSpec.series.findIndex((series) => series.name === item.name);
            const checked = seriesIndex >= 0;
            return (
              <React.Fragment key={item.name}>
                <ListItem dense disablePadding secondaryAction={seriesIndex >= 0 && secondaryAction(seriesIndex)}>
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
    </Stack>
  );
}

const CheckedMenuItem = ({
  checked,
  children,
  onClick,
}: {
  checked: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return checked ? (
    <MenuItem onClick={onClick}>
      <ListItemIcon>
        <CheckIcon />
      </ListItemIcon>
      {children}
    </MenuItem>
  ) : (
    <MenuItem>
      <ListItemText onClick={onClick} inset>
        {children}
      </ListItemText>
    </MenuItem>
  );
};

const ChartTypeMenu = ({
  series,
  onChange,
}: {
  series: SimpleChartSeries;
  onChange: (series: SimpleChartSeries) => void;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const updateSimpleSeries = (chartType: SimpleChartType) => {
    onChange({ ...series, type: chartType });
    setAnchorEl(null);
  };

  if (!series) {
    return null;
  }
  return (
    <>
      <IconButton
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}>
        <MoreVertIcon />
      </IconButton>
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        {['line', 'bar', 'scatter'].map((chartType) => {
          return (
            <CheckedMenuItem
              key={chartType}
              checked={series.type === chartType}
              onClick={() => updateSimpleSeries(chartType as SimpleChartType)}>
              {chartType}
            </CheckedMenuItem>
          );
        })}
      </Menu>
    </>
  );
};
