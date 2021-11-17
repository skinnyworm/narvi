import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { AppPage, Main } from "components/layout";

export function LandingPage() {
  return (
    <AppPage title="Home">
      <Main>
        <Container component="article">
          <Box
            sx={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h2">Landing Page</Typography>
          </Box>
        </Container>
      </Main>
    </AppPage>
  );
}
