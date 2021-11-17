import React from "react";
import { Typography, Box } from "@mui/material";

export const NotFound = () => {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h2">OOPS... page not found!</Typography>
    </Box>
  );
};
