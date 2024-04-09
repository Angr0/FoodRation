import React from "react";
import { Button, Card, Stack } from "@mui/joy";
import { CardMedia } from "@mui/material";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";

const Ingredient = ({
  name,
  quantity,
  iconUrl,
  unit_name,
  setFridgeIngredients,
}) => {
  const deleteIngredient = () => {
    axios
      .delete("http://localhost:8000/fridge/Adach/", { data: [name] })
      .then((r) => {
        console.log(r);

        axios.get("http://localhost:8000/fridge/Adach/").then(({ data }) => {
          setFridgeIngredients(data);
        });
      });
  };

  return (
    <Card sx={{ width: "48%", minWidth: "18rem" }}>
      <Stack direction={"row"} gap={2}>
        <CardMedia
          component="img"
          sx={{
            height: 32,
            width: 32,
            backgroundColor: "lightgreen",
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

export default Ingredient;
