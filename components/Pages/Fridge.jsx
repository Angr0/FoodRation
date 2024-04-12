import React, { useEffect, useState } from "react";
import { Button, Grid, Input, Stack } from "@mui/joy";
import FridgeIngredient from "../Items/FridgeIngredient.jsx";
import { HiPlus } from "react-icons/hi";
import axios from "axios";
import SelectIngredients from "../Items/SelectIngredients.jsx";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const Fridge = () => {
  const username = useSelector((state) => state.user.username);
  const [fridgeIngredients, setFridgeIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState({});
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/fridge/${username}/`)
      .then(({ data }) => {
        setFridgeIngredients(data);
      })
      .catch((errors) => {
        console.log(errors);
      });
  }, [username]);

  const addIngredient = ({ quantity }, e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8000/fridge/${username}/`, [
        {
          name: currentIngredient?.name,
          quantity: parseInt(quantity),
        },
      ])
      .then((r) => {
        console.log(r);

        axios
          .get(`http://localhost:8000/fridge/${username}/`)
          .then(({ data }) => {
            setFridgeIngredients(data);
          });
      })
      .catch((errors) => {
        console.log(errors);
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
        <form onSubmit={handleSubmit(addIngredient)} style={{ width: "100%" }}>
          <Grid
            container
            width={"100%"}
            gap={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid xs={12} sm={5}>
              <SelectIngredients setCurrentIngredient={setCurrentIngredient} />
            </Grid>

            <Grid xs={2} sm={2}>
              <Input
                type="number"
                defaultValue={1}
                {...register("quantity")}
                slotProps={{
                  input: {
                    min: 1,
                    step: 1,
                  },
                }}
              />
            </Grid>

            <Grid xs={2} md={3}>
              <span>{currentIngredient.unit_name}</span>
            </Grid>

            <Grid xs={1} md={1}>
              <Button
                type={"submit"}
                disabled={Object.keys(currentIngredient).length === 0}
              >
                <HiPlus />
              </Button>
            </Grid>
          </Grid>
        </form>
        {fridgeIngredients.length === 0 ? (
          "Your fridge is empty :("
        ) : (
          <Stack
            direction={"row"}
            useFlexGap
            flexWrap={"wrap"}
            gap={1}
            justifyContent={"center"}
          >
            {fridgeIngredients.map(
              ({ ingredient_name, quantity, icon_link, unit_name }) => (
                <FridgeIngredient
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
        )}
      </Stack>
    </Stack>
  );
};

export default Fridge;
