import React from "react";
import {
  Box,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  AppBar,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { AppDrawer, drawerWidth } from "./AppDrawer";

export type AppPageProps = {
  title?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

export function AppPage(props: AppPageProps) {
  const { title, actions } = props;
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "background.default",
      }}
    >
      <AppBar>
        <Toolbar>
          <IconButton
            sx={{ mr: 2 }}
            color="inherit"
            edge="start"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography sx={{ flexGrow: 1 }} variant="h6" noWrap>
            {title}
          </Typography>
          {actions && <Box ml={1}>{actions}</Box>}
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="temporary"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        anchor="left"
        ModalProps={{ keepMounted: true }}
      >
        <AppDrawer />
      </Drawer>

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
