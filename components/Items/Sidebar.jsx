import React from "react";
import { Button, Stack } from "@mui/joy";
import Flavours from "./Flavours.jsx";
import Categories from "./Categories.jsx";
import TemperatureToggle from "./TemperatureToggle.jsx";

const Sidebar = ({
  style,
  dishFlavour,
  setDishFlavour,
  dishCategory,
  setDishCategory,
  dishTemperature,
  setDishTemperature,
  setAllCategories,
  reset,
}) => {
  return (
    <Stack sx={{ ...style, maxWidth: "14rem" }} spacing={1}>
      <h2>Temperatures</h2>
      <TemperatureToggle
        value={dishTemperature}
        setValue={setDishTemperature}
        setAllCategories={setAllCategories}
      />

      <h2>Categories</h2>
      <Categories
        value={dishCategory}
        setValue={setDishCategory}
        setAllCategories={setAllCategories}
      />

      <h2>Flavours</h2>
      <Flavours
        style={{ display: "flex", flexWrap: "wrap" }}
        value={dishFlavour}
        setValue={setDishFlavour}
        setAllCategories={setAllCategories}
      />
      <Button onClick={reset}>Clear</Button>
    </Stack>
  );
};

export default Sidebar;
