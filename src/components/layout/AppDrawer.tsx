import React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem as MuiListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import { useAppSelector } from "app/store";
import { genAvatar } from "./avatars";
import { useNavigate, useMatch } from "react-router-dom";

export const drawerWidth = 300;

const menuItems: Array<{
  uri: string;
  label: string;
  exact?: boolean;
}> = [
  {
    uri: "/",
    label: "Home",
    exact: true,
  },
  {
    uri: "/dashboard",
    label: "Dashboard",
  },
];

const ListItem = (props: {
  children: React.ReactNode;
  exact?: boolean;
  to: string;
}) => {
  const { exact = false, to } = props;
  const matched = Boolean(useMatch({ path: to, end: Boolean(exact) }));
  const navigate = useNavigate();
  return (
    // @ts-ignore
    <MuiListItem>
      <ListItemButton
        href={to}
        onClick={() => navigate(to)}
        disabled={matched}
        sx={{
          "&.Mui-disabled": {
            opacity: 1,
          },
        }}
      >
        <Typography
          variant="h6"
          align="center"
          sx={{ flex: 1, color: matched ? "text.primary" : "text.disabled" }}
        >
          {props.children}
        </Typography>
      </ListItemButton>
    </MuiListItem>
  );
};

export function AppDrawer() {
  const { loaded, userInfo } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!loaded) {
    return null;
  }

  return (
    <Box component="nav">
      <Stack alignItems="center" my={2} spacing={2}>
        {userInfo ? (
          <>
            <Avatar
              sx={{ width: 96, height: 96, bgcolor: "primary.light" }}
              src={
                userInfo.photoURL ||
                genAvatar(userInfo.displayName || userInfo.email!)
              }
            />
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="subtitle1">
                {userInfo.displayName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {userInfo.email}
              </Typography>
            </Box>
            <Button color="secondary" onClick={() => {}}>
              Signout
            </Button>
          </>
        ) : (
          <Button
            color="secondary"
            onClick={() => {
              navigate("/auth/signin");
            }}
          >
            Signin
          </Button>
        )}
      </Stack>
      <Stack px={2}>
        <Divider />
        <List>
          {menuItems.map(({ uri, label, exact }) => (
            <ListItem key={uri} to={uri} exact={exact}>
              {label}
            </ListItem>
          ))}
        </List>
      </Stack>
    </Box>
  );
}
