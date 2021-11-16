import React from "react";
import { Container, Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AppPage } from "components/layout";
import { useNavigate } from "react-router";

export default function DashboardPage() {
  const navigate = useNavigate();
  return (
    <AppPage
      title="Dashboard"
      actions={
        <IconButton color="inherit" onClick={() => navigate("new")}>
          <AddIcon />
        </IconButton>
      }
    >
      <Container>
        <Box
          sx={{
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h2">Dashboard Page</Typography>
        </Box>
      </Container>
    </AppPage>
  );
}
