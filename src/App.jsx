import { Box, Stack } from "@mui/joy";
import { Route, Routes } from "react-router-dom";
import MainPage from "../components/Pages/MainPage.jsx";
import Header from "../components/Header.jsx";
import React, { useState } from "react";
import Recipe from "../components/Items/Recipe.jsx";
import Fridge from "../components/Pages/Fridge.jsx";
import Profile from "../components/Pages/Profile.jsx";
import { store } from "../redux/store.js";
import { saveState } from "./localStorage.js";
import Calculator from "../components/Pages/Calculator.jsx";
import RecipesWithCategories from "../components/Pages/RecipesWithCategories.jsx";
import { useSelector } from "react-redux";
import CookingHistory from "../components/Pages/CookingHistory.jsx";
import ErrorPage from "../components/Pages/ErrorPage.jsx";

function App() {
  const username = useSelector((state) => state.user.username);
  const [openLogInModal, setOpenLogInModal] = useState(false);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);

  store.subscribe(() => {
    saveState({
      username: store.getState().user.username,
    });
  });

  return (
    <Stack alignItems="center" sx={{ width: "100vw" }}>
      <Header
        openLogInModal={openLogInModal}
        setOpenLogInModal={setOpenLogInModal}
        openSignUpModal={openSignUpModal}
        setOpenSignUpModal={setOpenSignUpModal}
      />

      <Box
        sx={{
          width: "100%",
          maxWidth: "1250px",
          padding: { xs: "0 .5rem" },
        }}
      >
        <Routes>
          <Route
            index
            element={<MainPage setOpenLogInModal={setOpenLogInModal} />}
          />

          <Route
            path="menu"
            element={
              <RecipesWithCategories
                link={`http://localhost:8000/filtered-recipes/${username}/`}
              />
            }
          />
          <Route
            path="favourites"
            element={
              <RecipesWithCategories
                link={`http://localhost:8000/favourite-recipes/${username}/`}
              />
            }
          />
          <Route
            path="public_recipes"
            element={
              <RecipesWithCategories link={"http://localhost:8000/recipes/"} />
            }
          />
          <Route
            path="recipe/:recipeUrl"
            element={<Recipe />}
            loader={({ params }) => {
              params.recipeUrl;
            }}
          />

          <Route path="calculator" element={<Calculator />} />
          <Route path="cooking_history" element={<CookingHistory />} />
          <Route path="fridge" element={<Fridge />} />

          <Route path=":userNameUrl" element={<Profile />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Box>
    </Stack>
  );
}

export default App;
