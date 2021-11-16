import React from "react";
import {
  AppBar as MuiAppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { AppDrawer, drawerWidth } from "./AppDrawer";
import { Footer } from "./Footer";

export type SitePageProps = {
  title: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

export function SitePage(props: SitePageProps) {
  const { children, title, actions } = props;
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  const [elm, setElm] = React.useState<any>(null);
  const theme = useTheme();
  const inverse = useScrollTrigger({
    disableHysteresis: true,
    threshold: 64,
    target: elm !== null ? elm : undefined,
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundColor: "background.default",
      }}
    >
      <MuiAppBar
        sx={{
          transition: theme.transitions.create("background-color", {
            duration: theme.transitions.duration.standard,
            easing: theme.transitions.easing.easeIn,
          }),
          ...(inverse
            ? {
                color: "rgba(255, 255, 255, 0.9)",
                backgroundColor: theme.palette.primary.main,
              }
            : {
                color: theme.palette.primary.main,
                backgroundColor: "transparent",
              }),
        }}
        elevation={inverse ? 4 : 0}
      >
        <Toolbar>
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
        </Toolbar>
      </MuiAppBar>

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
          flexGrow: 1,
          overflow: "auto",
        }}
        ref={(elm) => setElm(elm)}
      >
        <Toolbar />
        {children}
        <Footer />
      </Box>
    </Box>
  );
}

export default SitePage;
