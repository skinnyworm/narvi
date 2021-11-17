import React from "react";
import { Navigate, useParams } from "react-router";
import {
  Container,
  Typography,
  IconButton,
  Toolbar,
  Breadcrumbs,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useAppSelector } from "app/store";
import { Link } from "components";
import { AppPage } from "components/layout";
import { Main } from "./Main";
import { EditorDrawer, drawerWidth } from "./EditorDrawer";

export function WidgetPage() {
  const [open, setOpen] = React.useState(false);
  const { id } = useParams<"id">();
  const widget = useAppSelector((state) =>
    state.dashboard.widgets.find((item) => item.id === id)
  );

  const handleWidgetChange = () => {};

  if (!widget) {
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
      }
    >
      <Main drawerWidth={drawerWidth} open={open}>
        <Container component="article">
          <Toolbar />
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="/dashboard">
              Dashboard
            </Link>
            <Typography color="text.primary">{widget.title}</Typography>
          </Breadcrumbs>

          <Typography variant="h6">Content</Typography>
        </Container>
      </Main>
      <EditorDrawer
        widget={widget}
        onChange={handleWidgetChange}
        open={open}
        onClose={() => setOpen(false)}
      />
    </AppPage>
  );
}
