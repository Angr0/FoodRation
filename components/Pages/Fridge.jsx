import React, { useEffect, useRef, useState } from "react";
import { Button, Grid, Input, Option, Select, Stack } from "@mui/joy";
import Ingredient from "../Items/Ingredient.jsx";
import { HiPlus } from "react-icons/hi";
import axios from "axios";

const Fridge = () => {
  const [ingredients, setIngredients] = useState([]);
  const [fridgeIngredients, setFridgeIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState(-1);
  const quantityRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:8000/all-ingredients/").then(({ data }) => {
      setIngredients(data);
    });

    axios.get("http://localhost:8000/fridge/Adach/").then(({ data }) => {
      setFridgeIngredients(data);
    });
  }, []);

  const addIngredient = () => {
    axios
      .put("http://localhost:8000/fridge/Adach/", [
        {
          name: ingredients[currentIngredient].name,
          quantity: parseInt(quantityRef.current.value),
        },
      ])
      .then((r) => {
        console.log(r);

        axios.get("http://localhost:8000/fridge/Adach/").then(({ data }) => {
          setFridgeIngredients(data);
        });
      });
  };

  return (
    <Stack direction={"row"} justifyContent={"center"}>
      <Stack
        gap={2}
        mt={2}
        mb={4}
        sx={{ width: "100%", maxWidth: "var(--max-width-main-content)" }}
        alignItems={"center"}
      >
        <Grid
          container
          direction={{ xs: "column", sm: "row" }}
          width={"100%"}
          gap={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid xs={5}>
            <Select
              placeholder="Ingredients"
              sx={{ minWidth: "12rem" }}
              onChange={(_, newValue) => setCurrentIngredient(newValue)}
            >
              {ingredients.map(({ name }, index) => (
                <Option key={name} value={index}>
                  {name}
                </Option>
              ))}
            </Select>
          </Grid>

          <Grid xs={2}>
            <Input
              type="number"
              defaultValue={1}
              slotProps={{
                input: {
                  ref: quantityRef,
                  min: 1,
                  step: 1,
                },
              }}
            />
          </Grid>

          <Grid xs={2}>
            <span>{ingredients[currentIngredient]?.unit_name}</span>
          </Grid>

          <Grid xs={1}>
            <Button onClick={addIngredient} disabled={currentIngredient === -1}>
              <HiPlus />
            </Button>
          </Grid>
        </Grid>
        <Stack
          direction={"row"}
          useFlexGap
          flexWrap={"wrap"}
          gap={1}
          justifyContent={"center"}
        >
          {fridgeIngredients.map(
            ({ ingredient_name, quantity, icon_link, unit_name }) => (
              <Ingredient
                key={ingredient_name}
                name={ingredient_name}
                quantity={quantity}
                iconUrl={icon_link}
                unit_name={unit_name}
                setFridgeIngredients={setFridgeIngredients}
              />
            ),
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Fridge;
