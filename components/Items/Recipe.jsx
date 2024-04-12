import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Box, List, ListItem, Stack, Divider } from "@mui/joy";
import axios from "axios";
import { CardContent, CardMedia } from "@mui/material";
import { FaMugHot, FaRegSnowflake, FaStar } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import ComaWithoutLast from "./ComaWithoutLast.jsx";

const Recipe = () => {
  const { recipeUrl } = useParams();
  const [recipe, setRecipe] = useState({});
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
    });
  }, [recipeUrl]);

  const likeRecipe = (e) => {
    axios
      .post("http://localhost:8000/favourite-recipes/Adach/", {
        name: "jajko",
      })
      .then((r) => {
        console.log(r);
      })
      .catch((err) => {
        console.log(err);
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
        <Box sx={{ position: "absolute", top: "1rem", right: "1rem" }}>
          <FaStar p={2} onClick={likeRecipe} />
        </Box>
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
                  {ingredient} x {quantity} [{unit}]
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
          <Divider />
          <footer>author: {author_login}</footer>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Recipe;
