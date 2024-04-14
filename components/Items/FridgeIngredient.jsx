import React from "react";
import { Button, Card, Stack } from "@mui/joy";
import { CardMedia } from "@mui/material";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";

const FridgeIngredient = ({
  name,
  quantity,
  iconUrl,
  unit_name,
  setFridgeIngredients,
}) => {
  const username = useSelector((state) => state.user.username);

  const deleteIngredient = () => {
    axios
      .delete(`http://localhost:8000/fridge/${username}/`, { data: [name] })
      .then((r) => {
        console.log(r);

        axios
          .get(`http://localhost:8000/fridge/${username}/`)
          .then(({ data }) => {
            setFridgeIngredients(
              data.filter((fridgeIngredient) => fridgeIngredient?.quantity > 0),
            );
          });
      });
  };

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
            {name}&nbsp;x&nbsp;{quantity} [{unit_name}]
          </span>
          <Button onClick={deleteIngredient} color={"danger"}>
            <FaTrashAlt />
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

export default FridgeIngredient;
