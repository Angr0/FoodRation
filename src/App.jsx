import { Box, Stack } from "@mui/joy";
import { Route, Routes } from "react-router-dom";
import MainPage from "../components/Pages/MainPage.jsx";
import Header from "../components/Header.jsx";
import React from "react";
import Recipes from "../components/Pages/Recipes.jsx";
import Recipe from "../components/Items/Recipe.jsx";
import Fridge from "../components/Pages/Fridge.jsx";

function App() {
  return (
    <Stack alignItems="center" sx={{ width: "100vw" }}>
      <Header />
      <Box
        sx={{
          width: "100%",
          maxWidth: "1250px",
          padding: { xs: "0 .5rem" },
        }}
      >
        <Routes>
          <Route index element={<MainPage />} />

          <Route path="recipes" element={<Recipes />} />
          <Route
            path="recipe/:recipe"
            element={<Recipe />}
            loader={({ params }) => {
              params.recipe;
            }}
          />

          <Route path="calculator" element={<div>calculator</div>} />
          <Route path="shopping_list" element={<div>shopping_list</div>} />
          <Route path="cooking_history" element={<div>cooking_history</div>} />
          <Route path="fridge" element={<Fridge />} />
          <Route path="*" element={<div>error page</div>} />
        </Routes>
      </Box>
    </Stack>
  );
}

export default App;
