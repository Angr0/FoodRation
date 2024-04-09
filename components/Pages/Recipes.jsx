import React, { useEffect, useState } from "react";
import { Button, Stack } from "@mui/joy";
import RecipeCard from "../Items/RecipeCard.jsx";
import SearchInput from "../Items/SearchInput.jsx";
import TastesCategories from "../Items/TastesCategories.jsx";
import Sidebar from "../Items/Sidebar.jsx";
import TemperatureToggle from "../Items/TemperatureToggle.jsx";
import axios from "axios";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [dishTemperature, setDishTemperature] = useState(["hot"]);
  const [dishTaste, setDishTaste] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/recipes/").then(({ data }) => {
      setRecipes(data);
      setDisplayedRecipes(data);
    });
  }, []);

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

  const findRecipes = () => {
    console.log(dishTemperature, dishTaste);
  };

  return (
    <Stack direction={"row"} justifyContent="center" gap={4} mt={2} mb={4}>
      <Sidebar
        style={{ display: { xs: "none", md: "block" } }}
        dishTaste={dishTaste}
        setDishTaste={setDishTaste}
      />

      <Stack alignItems={"center"} gap={2}>
        <Stack
          sx={{ width: "100%" }}
          alignItems="center"
          spacing={{ xs: 1, md: 4 }}
          direction={{ xs: "column", md: "row" }}
        >
          <SearchInput onChange={filterRecipes} />

          <TastesCategories
            value={dishTaste}
            setValue={setDishTaste}
            style={{
              display: { sx: "flex", md: "none" },
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          />
          <Stack direction="row" justifyContent="center" gap={{ xs: 1, md: 4 }}>
            <TemperatureToggle
              value={dishTemperature}
              setValue={setDishTemperature}
            />
            <Button onClick={findRecipes}>Find&nbsp;recipe</Button>
          </Stack>
        </Stack>
        {displayedRecipes.map(
          ({ name, is_warm, icon_link, categories, type, ingredients }) => (
            <RecipeCard
              key={name}
              name={name}
              isWarm={is_warm}
              iconUrl={icon_link}
              categories={categories}
              typeName={type}
              ingredients={ingredients}
            />
          ),
        )}
      </Stack>
    </Stack>
  );
};

export default Recipes;
