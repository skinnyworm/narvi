import React from 'react';
import { Navigate, useParams } from 'react-router';
import { Container, Typography, IconButton, Toolbar, Breadcrumbs } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from 'app/store';
import { Link } from 'components';
import { AppPage } from 'components/layout';
import { Main } from './Main';
import { EditorDrawer, drawerWidth } from './drawer/EditorDrawer';
import { Widget } from 'app/types';
import { Viewer } from './viewer';

export function WidgetPage() {
  const [open, setOpen] = React.useState(true);
  const { id } = useParams<'id'>();
  const initialWidget = useAppSelector((state) => state.dashboard.widgets.find((item) => item.id === id));
  const [widget, setWidget] = React.useState<Partial<Widget>>(initialWidget || {});

  if (!initialWidget) {
    return <Navigate to="/404" replace />;
  }

  return (
    <AppPage
      title={widget.title}
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
            <Typography color="text.primary">{widget.title}</Typography>
          </Breadcrumbs>
          <Viewer widget={widget} />
        </Container>
      </Main>
      <EditorDrawer widget={widget} onChange={setWidget} open={open} onClose={() => setOpen(false)} />
    </AppPage>
  );
}
