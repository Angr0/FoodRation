import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Box, List, ListItem, Stack, Button, Input } from "@mui/joy";
import axios from "axios";
import { Alert, CardContent, CardMedia, Snackbar } from "@mui/material";
import { FaMugHot, FaRegSnowflake, FaStar } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import ComaWithoutLast from "./ComaWithoutLast.jsx";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import decimalToFraction from "../../helper/decimalToFraction.js";

const Recipe = () => {
  const username = useSelector((state) => state.user.username);
  const { register, handleSubmit, watch } = useForm();
  const { recipeUrl } = useParams();
  const [recipe, setRecipe] = useState({});
  const [fridge, setFridge] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const {
    name,
    is_warm,
    author_login,
    categories,
    icon_link,
    ingredients,
    steps,
    type_name,
  } = recipe;

  useEffect(() => {
    axios.get(`http://localhost:8000/recipe/${recipeUrl}`).then(({ data }) => {
      setRecipe(data);
      console.log(data);
    });

    if (username)
      axios
        .get(`http://localhost:8000/fridge/${username}/`)
        .then(({ data }) => {
          setFridge(data);
        })
        .catch((errors) => {
          console.log(errors);
        });
  }, [recipeUrl, username]);

  const likeRecipe = () => {
    console.log(name);
    // axios
    //   .post(`http://localhost:8000/favourite-recipes/${username}/`, {
    //     name: "spaghetti",
    //   })
    //   .then((r) => {
    //     console.log(r);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const getReversedQuantities = (portions) => {
    const result = [];

    ingredients.forEach((ingredient) => {
      const fridgeItem = fridge.find(
        (fridgeItem) => ingredient?.ingredient === fridgeItem?.ingredient_name,
      );

      if (fridgeItem)
        result.push({
          name: ingredient.ingredient,
          quantity: -Math.min(
            fridgeItem?.quantity,
            ingredient.quantity * (parseInt(portions) || 1),
          ),
        });
    });

    return result;
  };

  const openSnackbar = () => {
    setSnackbarOpen(true);
  };

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const cookedMeal = ({ portions }) => {
    axios
      .put(
        `http://localhost:8000/fridge/${username}/`,
        getReversedQuantities(portions),
      )
      .then((r) => {
        console.log(r);
        openSnackbar();
      })
      .catch((errors) => {
        console.log(errors);
      });

    axios
      .post("http://localhost:8000/cooking-history/", {
        user_login: username,
        recipe_name: name,
        portions: portions || 1,
        date: new Date(),
      })
      .then((r) => {
        console.log(r);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  return (
    <Stack alignItems={"center"} mt={2} mb={2}>
      <Card
        sx={{
          maxWidth: "var(--max-width-main-content)",
          width: "100%",
          position: "relative",
        }}
      >
        <Box sx={{ position: "absolute", top: "1rem", left: "1rem" }}>
          <Link to={"/public_recipes"}>
            <FaX p={2} />
          </Link>
        </Box>
        {username && (
          <Box
            sx={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              cursor: "pointer",
            }}
          >
            <FaStar p={2} onClick={likeRecipe} />
          </Box>
        )}
        <CardContent>
          <Stack gap={2}>
            <Stack
              direction={"row"}
              alignSelf={"center"}
              gap={2}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <b>{name?.toUpperCase()}</b>
              {is_warm ? <FaMugHot /> : <FaRegSnowflake />}
            </Stack>
            <CardMedia
              component="img"
              image={icon_link}
              alt={name}
              height={200}
              sx={{ objectFit: "contain" }}
            />
            <Box>
              {type_name}
              {", "}
              {categories?.map((category, index) => (
                <span key={category}>
                  {category}
                  <ComaWithoutLast
                    index={index}
                    length={category.length}
                  />{" "}
                </span>
              ))}
            </Box>
            <List>
              Ingredients:
              {ingredients?.map(({ ingredient, quantity, unit }) => (
                <ListItem key={ingredient}>
                  {decimalToFraction(quantity * (watch("portions") || 1))} [
                  {unit}]
                </ListItem>
              ))}
            </List>
            <List>
              Steps:
              {steps?.map(({ number, description }) => (
                <ListItem key={number}>
                  {number}. {description}
                </ListItem>
              ))}
            </List>
          </Stack>

          <Stack
            direction={{ xs: "column-reverse", sm: "row" }}
            justifyContent={"space-between"}
          >
            <footer>author: {author_login}</footer>
            <Stack direction={"row"} gap={1}>
              <Input
                type={"number"}
                {...register("portions")}
                slotProps={{ input: { min: 1 } }}
                required
                defaultValue={1}
                sx={{ maxWidth: "6rem" }}
              />
              <Button color={"danger"} onClick={handleSubmit(cookedMeal)}>
                Cooked!
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Snackbar
        color={"primary"}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={closeSnackbar}
      >
        <Alert
          onClose={closeSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Let me cook! 🫡
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Recipe;
