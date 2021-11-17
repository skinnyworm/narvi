import React from "react";
import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";
import { useNavigate } from "react-router";

export const Link = (props: MuiLinkProps & { to?: string }) => {
  const navigate = useNavigate();
  const { to, ...linkProps } = props;
  return to ? (
    <MuiLink
      {...linkProps}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
      href={to}
    />
  ) : (
    <MuiLink {...linkProps} target="_blank" rel="noopener noreferrer" />
  );
};
