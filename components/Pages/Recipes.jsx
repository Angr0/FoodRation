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
  const [dishTemperature, setDishTemperature] = useState([]);
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
  //TODO filtrowanie chyba trzeba na backend robic
  const onTasteChange = (categories) => {
    setDisplayedRecipes((oldRecipes) =>
      oldRecipes.filter(({ flavours }) => {
        if (categories === []) return oldRecipes;
        return flavours.includes(...categories);
        // console.log(flavours.includes(...categories));
        // console.log(flavours);
        // console.log(categories);
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

  const findRecipes = () => {
    // console.log(dishTemperature, dishTaste);
  };

  return (
    <Stack direction={"row"} justifyContent="center" gap={4} mt={2} mb={4}>
      <Sidebar
        style={{ display: { xs: "none", md: "block" } }}
        dishTaste={dishTaste}
        setDishTaste={setDishTaste}
        onTasteChange={onTasteChange}
      />

      <Stack
        alignItems={"center"}
        gap={2}
        width={{ md: "var(--max-width-main-content)" }}
      >
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
            onTasteChange={onTasteChange}
          />
          <Stack direction="row" justifyContent="center" gap={{ xs: 1, md: 4 }}>
            <TemperatureToggle
              value={dishTemperature}
              setValue={setDishTemperature}
              onTemperatureChange={onTemperatureChange}
            />
            <Button onClick={findRecipes}>Find&nbsp;recipe</Button>
          </Stack>
        </Stack>
        {displayedRecipes.map(
          ({
            name,
            is_warm,
            icon_link,
            categories,
            type,
            ingredients,
            flavours,
          }) => (
            <RecipeCard
              key={name}
              name={name}
              isWarm={is_warm}
              iconUrl={icon_link}
              categories={categories}
              typeName={type}
              ingredients={ingredients}
              flavours={flavours}
            />
          ),
        )}
      </Stack>
    </Stack>
  );
};

export default Recipes;
