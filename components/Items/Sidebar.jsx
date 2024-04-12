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
  onTemperatureChange,
  onFlavourChange,
}) => {
  return (
    <Stack sx={{ ...style, maxWidth: "14rem" }} spacing={1}>
      <h2>Temperatures</h2>
      <TemperatureToggle
        value={dishTemperature}
        setValue={setDishTemperature}
        onTemperatureChange={onTemperatureChange}
      />

      <h2>Categories</h2>
      <Categories value={dishCategory} setValue={setDishCategory} />

      <h2>Flavours</h2>
      <Flavours
        style={{ display: "flex", flexWrap: "wrap" }}
        value={dishFlavour}
        setValue={setDishFlavour}
        onFlavourChange={onFlavourChange}
      />
      <Button
        color={"danger"}
        onClick={() => {
          console.log(dishTemperature, dishFlavour, dishCategory);
        }}
      >
        Find&nbsp;recipe
      </Button>
    </Stack>
  );
};

export default Sidebar;
