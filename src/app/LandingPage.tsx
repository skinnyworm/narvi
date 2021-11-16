import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { AppPage } from "components/layout";

export default function LandingPage() {
  return (
    <AppPage title="Home">
      <Container>
        <Box
          sx={{
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h2">Landing Page</Typography>
        </Box>
      </Container>
    </AppPage>
  );
}
