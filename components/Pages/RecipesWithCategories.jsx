import React, { useEffect, useState } from "react";
import { Stack } from "@mui/joy";
import Flavours from "../Items/Flavours.jsx";
import Sidebar from "../Items/Sidebar.jsx";
import axios from "axios";
import Recipes from "../Items/Recipes.jsx";
import Categories from "../Items/Categories.jsx";

const RecipesWithCategories = ({ link = "http://localhost:8000/recipes/" }) => {
  const [recipes, setRecipes] = useState([]);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [dishTemperature, setDishTemperature] = useState([]);
  const [dishFlavour, setDishFlavour] = useState([]);
  const [dishCategory, setDishCategory] = useState([]);

  useEffect(() => {
    axios.get(link).then(({ data }) => {
      setRecipes(data);
      setDisplayedRecipes(data);
    });
  }, [link]);

  const filterRecipes = (e) => {
    const value = e?.target?.value;

    if (value === "") setDisplayedRecipes(recipes);
    else {
      setDisplayedRecipes(
        recipes.filter(({ name }) =>
          name.toLowerCase().includes(value.toLowerCase()),
        ),
      );
    }
  };
  //TODO filtrowanie chyba trzeba na backend robic
  const onFlavourChange = (flavour) => {
    setDisplayedRecipes((oldRecipes) =>
      oldRecipes.filter(({ flavours }) => {
        if (flavour === []) return oldRecipes;
        return flavours.includes(...flavour);
        // console.log(flavours.includes(...flavour));
        // console.log(flavours);
        // console.log(flavour);
      }),
    );
  };

  const onTemperatureChange = (toggleButtonValue) => {
    if (toggleButtonValue.length === 2) setDisplayedRecipes(recipes);
    else if (toggleButtonValue.includes("hot"))
      setDisplayedRecipes((oldRecipes) =>
        oldRecipes.filter(({ is_warm }) => is_warm),
      );
    else if (toggleButtonValue.includes("cold"))
      setDisplayedRecipes((oldRecipes) =>
        oldRecipes.filter(({ is_warm }) => !is_warm),
      );
    else setDisplayedRecipes(recipes);
  };
  return (
    <Stack direction={"row"} justifyContent="center" gap={4} mt={2} mb={4}>
      <Sidebar
        style={{ display: { xs: "none", md: "block" } }}
        dishFlavour={dishFlavour}
        setDishFlavour={setDishFlavour}
        dishCategory={dishCategory}
        setDishCategory={setDishCategory}
        dishTemperature={dishTemperature}
        setDishTemperature={setDishTemperature}
        onTemperatureChange={onTemperatureChange}
        onFlavourChange={onFlavourChange}
      />

      <Stack
        alignItems={"center"}
        gap={2}
        width={{ xs: "100%", md: "var(--max-width-main-content)" }}
      >
        <Stack
          sx={{ width: "100%" }}
          alignItems="center"
          spacing={{ xs: 1, md: 4 }}
          direction={{ xs: "column", md: "row" }}
        >
          <Categories
            value={dishCategory}
            setValue={setDishCategory}
            style={{
              display: { sx: "flex", md: "none" },
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          />
          <Flavours
            value={dishFlavour}
            setValue={setDishFlavour}
            style={{
              display: { sx: "flex", md: "none" },
              flexWrap: "wrap",
              justifyContent: "center",
            }}
            onFlavourChange={onFlavourChange}
          />
          <Stack
            direction="row"
            justifyContent="center"
            gap={{ xs: 1, md: 4 }}
          ></Stack>
        </Stack>

        <Recipes recipes={displayedRecipes} />
      </Stack>
    </Stack>
  );
};

export default RecipesWithCategories;
