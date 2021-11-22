import React from 'react';
import { Widget } from 'app/types';
import { useAppSelector } from 'app/store';
import { group } from 'app/editor/group';
import { ChartCard } from 'components/charts';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router';

export type WidgetCardProps = {
  widget: Widget;
};

export const WidgetCard = (props: WidgetCardProps) => {
  const { widget } = props;
  const [menuAnchor, setMenuAnchor] = React.useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const datasource = useAppSelector((state) => {
    if (widget.datasource) {
      return state.datasource.allDatasources.find((ds) => ds.id === widget.datasource);
    }
  });

  const groupResult = React.useMemo(() => {
    if (datasource && widget.label && widget.output) {
      return group(datasource, widget.label, widget.output);
    }
  }, [datasource, widget]);

  const handleEdit = () => {
    setMenuAnchor(null);
    navigate(`/dashboard/${widget.id}`);
  };

  if (!groupResult) {
    return null;
  }

  return (
    <>
      {(widget.charts || []).map((spec, i) => (
        <ChartCard
          key={i}
          spec={spec}
          groupResult={groupResult}
          actions={
            <>
              <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
                <MoreVertIcon />
              </IconButton>
              <Menu open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)} anchorEl={menuAnchor}>
                <MenuItem onClick={() => handleEdit()}>Edit</MenuItem>
              </Menu>
            </>
          }
        />
      ))}
    </>
  );
};
