import React from "react";
import { Stack } from "@mui/joy";
import recipes from "../../helper/recipes_mock.js";
import RecipeCard from "../Items/RecipeCard.jsx";

const Recipes = () => {
  return (
    <Stack alignItems={"center"} gap={2} mt={4}>
      {recipes.map(
        ({ name, is_warm, icon_link, categories, type_name, ingredients }) => (
          <RecipeCard
            key={name}
            name={name}
            isWarm={is_warm}
            iconUrl={icon_link}
            categories={categories}
            typeName={type_name}
            ingredients={ingredients}
          />
        ),
      )}
    </Stack>
  );
};

export default Recipes;
