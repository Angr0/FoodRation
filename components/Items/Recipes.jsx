import React from "react";
import RecipeCard from "./RecipeCard.jsx";

const Recipes = ({ recipes = [] }) => {
  if (recipes?.length === 0) return "There is no recipes :(";
  return (
    <>
      {recipes.map(
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
    </>
  );
};

export default Recipes;
