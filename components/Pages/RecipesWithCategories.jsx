import React, { useCallback, useEffect, useState } from "react";
import { Button, Stack } from "@mui/joy";
import Flavours from "../Items/Flavours.jsx";
import Sidebar from "../Items/Sidebar.jsx";
import axios from "axios";
import Recipes from "../Items/Recipes.jsx";
import Categories from "../Items/Categories.jsx";
import TemperatureToggle from "../Items/TemperatureToggle.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RecipesWithCategories = ({ link = "http://localhost:8000/recipes/" }) => {
  const username = useSelector((state) => state.user.username);
  const [recipes, setRecipes] = useState([]);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [dishTemperature, setDishTemperature] = useState([]);
  const [dishFlavour, setDishFlavour] = useState([]);
  const [dishCategory, setDishCategory] = useState([]);
  const [allCategories, setAllCategories] = useState({
    temperature: [],
    flavour: [],
    category: [],
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!username && link !== "http://localhost:8000/recipes/") {
      navigate("/");
      return;
    }

    setLoading(true);
    axios.get(link).then(({ data }) => {
      setRecipes(data);
      setLoading(false);
    });
  }, [link, navigate, username]);

  const filterRecipes = useCallback(() => {
    setDisplayedRecipes(
      recipes.filter(
        (recipe) =>
          (allCategories.temperature.length === 0
            ? true
            : allCategories.temperature.some((temperature) => {
                if (allCategories.temperature.length === 0) return true;
                const warmDish = recipe?.is_warm ? "hot" : "cold";
                return temperature === warmDish;
              })) &&
          recipe.flavours.some((flavour) => {
            if (allCategories.flavour.length === 0) return true;
            return allCategories.flavour.includes(flavour);
          }) &&
          recipe.categories.some((category) => {
            if (allCategories.category.length === 0) return true;
            return allCategories.category.includes(category);
          }),
      ),
    );
  }, [allCategories, recipes]);

  useEffect(() => {
    filterRecipes();
  }, [allCategories, filterRecipes, recipes]);

  const reset = () => {
    setDishFlavour([]);
    setDishTemperature([]);
    setDishCategory([]);
    setAllCategories({
      temperature: [],
      flavour: [],
      category: [],
    });
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
        setAllCategories={setAllCategories}
        reset={reset}
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
          display={{ sx: "flex", md: "none" }}
        >
          <TemperatureToggle
            value={dishTemperature}
            setValue={setDishTemperature}
            setAllCategories={setAllCategories}
            style={{
              display: { sx: "flex", md: "none" },
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          />
          <Categories
            value={dishCategory}
            setValue={setDishCategory}
            setAllCategories={setAllCategories}
            style={{
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          />
          <Flavours
            value={dishFlavour}
            setValue={setDishFlavour}
            setAllCategories={setAllCategories}
            style={{
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          />
          <Button onClick={reset} color={"danger"}>
            Clear
          </Button>
        </Stack>

        <Recipes recipes={displayedRecipes} loading={loading} />
      </Stack>
    </Stack>
  );
};

export default RecipesWithCategories;
