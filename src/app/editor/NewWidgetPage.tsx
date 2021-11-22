import React from 'react';
import { Container, Typography, IconButton, Toolbar, Breadcrumbs } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Widget } from 'app/types';
import { Link } from 'components';
import { AppPage } from 'components/layout';
import { Main } from './Main';
import { EditorDrawer, drawerWidth } from './drawer';
import { Viewer } from './viewer/Viewer';

export function NewWidgetPage() {
  const [open, setOpen] = React.useState(true);
  const [widget, setWidget] = React.useState<Partial<Widget>>({
    charts: [],
  });
  const handleWidgetChange = (widget: Partial<Widget>) => setWidget(widget);

  return (
    <AppPage
      title="New Widget"
      rightDrawerWidth={drawerWidth}
      rightDrawerOpen={open}
      actions={
        !open && (
          <IconButton color="inherit" onClick={() => setOpen(true)}>
            <EditIcon />
          </IconButton>
        )
      }>
      <Main drawerWidth={drawerWidth} open={open}>
        <Container component="article">
          <Toolbar />
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="/narvi/dashboard">
              Dashboard
            </Link>
            <Typography color="text.primary">New Widget</Typography>
          </Breadcrumbs>

          <Viewer widget={widget} />
        </Container>
      </Main>
      <EditorDrawer widget={widget} onChange={handleWidgetChange} open={open} onClose={() => setOpen(false)} />
    </AppPage>
  );
}
