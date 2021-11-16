import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { AppPage } from "components/layout";

export default function WidgetPage() {
  return (
    <AppPage title="Widget">
      <Container>
        <Box
          sx={{
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h2">Widget Page</Typography>
        </Box>
      </Container>
    </AppPage>
  );
}
