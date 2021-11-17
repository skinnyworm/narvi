import React from "react";
import {
  Card,
  CardHeader,
  CardActionArea,
  CardMedia,
  Skeleton,
} from "@mui/material";
import { Widget } from "app/types";

export type WidgetCardProps = {
  widget: Widget;
  onClick: () => void;
};

export const WidgetCard = (props: WidgetCardProps) => {
  const { widget, onClick } = props;
  return (
    <Card elevation={0}>
      <CardHeader
        sx={{
          ".MuiCardHeader-title": {
            typography: "subtitle1",
          },
          ".MuiCardHeader-subheader": {
            typography: "body2",
            color: "text.disabled",
          },
        }}
        title={widget.title}
        subheader="2021年11月"
      />
      <CardActionArea onClick={onClick}>
        <CardMedia>
          <Skeleton
            sx={{ height: 190 }}
            animation="wave"
            variant="rectangular"
          />
        </CardMedia>
      </CardActionArea>
    </Card>
  );
};
