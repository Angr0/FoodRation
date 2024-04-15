import React, { useCallback, useEffect, useState } from "react";
import { Button, Grid, Input, Stack } from "@mui/joy";
import IngredientsCard from "../items/IngredientsCard.jsx";
import { HiPlus } from "react-icons/hi";
import axios from "axios";
import SelectIngredients from "../items/SelectIngredients.jsx";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Fridge = () => {
  const username = useSelector((state) => state.user.username);
  const [fridgeIngredients, setFridgeIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState({});
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const setIngredients = useCallback(() => {
    axios
      .get(`http://localhost:8000/fridge/${username}/`)
      .then(({ data }) => {
        setFridgeIngredients(
          data.filter((fridgeIngredient) => fridgeIngredient?.quantity > 0),
        );
      })
      .catch((errors) => {
        console.log(errors);
      });
  }, [username]);

  useEffect(() => {
    if (!username) {
      navigate("/");
      return;
    }

    setIngredients();
  }, [navigate, setIngredients, username]);

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

        setIngredients();
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  const deleteIngredient = (name) => {
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

  const clearFridge = () => {
    axios
      .delete(`http://localhost:8000/clear-fridge/${username}/`)
      .then((r) => {
        console.log(r);

        setIngredients();
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
            <Grid
              xs={10}
              sm={5}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <SelectIngredients setCurrentIngredient={setCurrentIngredient} />
            </Grid>

            <Grid xs={3} sm={2}>
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

            <Grid xs={4} sm={3}>
              <span>{currentIngredient.unit_name}</span>
            </Grid>

            <Grid xs={2} sm={1}>
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
          "Not empty again!"
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
                <IngredientsCard
                  key={ingredient_name}
                  name={ingredient_name}
                  quantity={quantity}
                  iconUrl={icon_link}
                  unit_name={unit_name}
                  deleteIngredient={deleteIngredient}
                />
              ),
            )}
          </Stack>
        )}
        {fridgeIngredients?.length !== 0 && (
          <Button color={"danger"} onClick={clearFridge}>
            Clear whole fridge
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default Fridge;
