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
  const filters = useSelector((state) => state.user.filters);
  const [allCategories, setAllCategories] = useState({
    temperature: [],
    flavour: [],
    category: [],
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const filterRecipes = useCallback(() => {
    setDisplayedRecipes(
      recipes.filter(
        (recipe) =>
          allCategories.category.every((item) =>
            recipe.categories.includes(item),
          ) &&
          allCategories.flavour.every((item) =>
            recipe.flavours.includes(item),
          ) &&
          (allCategories.temperature.length === 0
            ? true
            : allCategories.temperature.some((temperature) => {
                if (allCategories.temperature.length === 0) return true;
                const warmDish = recipe?.is_warm ? "hot" : "cold";
                return temperature === warmDish;
              })),
      ),
    );
  }, [allCategories, recipes]);

  useEffect(() => {
    if (!username && link !== "http://localhost:8000/recipes/") {
      navigate("/");
      return;
    }

    setDishCategory(filters.category);
    setDishFlavour(filters.flavour);
    setAllCategories({
      temperature: [],
      flavour: filters.flavour,
      category: filters.category,
    });

    setLoading(true);
    axios.get(link).then(({ data }) => {
      setRecipes(data);
      setLoading(false);
    });
  }, [filters.category, filters.flavour, link, navigate, username]);

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
