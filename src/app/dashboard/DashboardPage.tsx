import React from "react";
import { Container, IconButton, Toolbar, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AppPage, Main } from "components/layout";
import { useNavigate } from "react-router";
import { WidgetCard } from "./WidgetCard";
import { useAppSelector } from "app/store";

export function DashboardPage() {
  const navigate = useNavigate();
  const widgets = useAppSelector((state) => state.dashboard.widgets);

  return (
    <AppPage
      title="Dashboard"
      actions={
        <IconButton color="inherit" onClick={() => navigate("new")}>
          <AddIcon />
        </IconButton>
      }
    >
      <Main>
        <Toolbar />
        <Container component="article">
          <Grid sx={{ mt: 2 }} container spacing={2}>
            {widgets.map((widget) => (
              <Grid key={widget.id} xs={12} sm={6} md={4}>
                <WidgetCard
                  widget={widget}
                  onClick={() => navigate(`/dashboard/${widget.id}`)}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Main>
    </AppPage>
  );
}
