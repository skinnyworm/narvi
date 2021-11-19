import React from 'react';
import {
  Box,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  styled,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AppDrawer, drawerWidth } from './AppDrawer';

type AppBarProps = MuiAppBarProps & {
  open?: boolean;
  rightDrawerWidth: number;
};

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => ['open', 'rightDrawerWidth'].indexOf(prop as string) < 0,
})<AppBarProps>(({ theme, open, rightDrawerWidth }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${rightDrawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: rightDrawerWidth,
  }),
}));

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
  backgroundColor: theme.palette.grey[50],
}));

export type AppPageProps = {
  title?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  rightDrawerWidth?: number;
  rightDrawerOpen?: boolean;
};

export function AppPage(props: AppPageProps) {
  const { title, actions, children, rightDrawerWidth = 0, rightDrawerOpen = false } = props;
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  return (
    <Root>
      <AppBar rightDrawerWidth={rightDrawerWidth} open={rightDrawerOpen}>
        <Toolbar>
          <IconButton sx={{ mr: 2 }} color="inherit" edge="start" onClick={() => setDrawerOpen(true)}>
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
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="temporary"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        anchor="left"
        ModalProps={{ keepMounted: true }}>
        <AppDrawer />
      </Drawer>
      {children}
    </Root>
  );
}

export const Main = (props: { children: React.ReactNode }) => (
  <Box
    component="main"
    sx={{
      flexGrow: 1,
      overflow: 'auto',
      backgroundColor: (theme) => (theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]),
    }}>
    {props.children}
  </Box>
);
