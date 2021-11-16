import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { AppPage } from "components/layout";

export default function NewWidgetPage() {
  return (
    <AppPage title="New Widget">
      <Container>
        <Box
          sx={{
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h2">New Widget Page</Typography>
        </Box>
      </Container>
    </AppPage>
  );
}
