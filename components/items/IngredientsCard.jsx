import React from "react";
import { Card, Stack } from "@mui/joy";
import { CardMedia } from "@mui/material";

const IngredientsCard = ({ name, quantity, iconUrl, unit_name, buttons }) => {
  return (
    <Card sx={{ width: "49%", minWidth: "18rem" }} variant={"soft"}>
      <Stack direction={"row"} gap={2}>
        <CardMedia
          component="img"
          sx={{
            height: 32,
            width: 32,
          }}
          image={iconUrl}
          title={name}
        />
        <Stack
          direction={"row"}
          alignItems={"center"}
          width={"100%"}
          justifyContent={"space-between"}
          gap={1}
        >
          <span>
            {quantity} [{unit_name}] {name}&nbsp;
          </span>
          <Stack direction={"row"} gap={1}>
            {buttons}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default IngredientsCard;
