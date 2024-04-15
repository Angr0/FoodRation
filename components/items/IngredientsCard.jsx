import React from "react";
import { Button, Card, Stack } from "@mui/joy";
import { CardMedia } from "@mui/material";
import { FaTrashAlt } from "react-icons/fa";

const IngredientsCard = ({
  name,
  quantity,
  iconUrl,
  unit_name,
  deleteIngredient,
  deleteIcon = <FaTrashAlt />,
}) => {
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
          <Button
            onClick={() => deleteIngredient(name)}
            color={"danger"}
            variant={"plain"}
          >
            {deleteIcon}
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

export default IngredientsCard;
