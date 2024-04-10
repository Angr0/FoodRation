import React from "react";
import { Divider, Stack } from "@mui/joy";
import TastesCategories from "./TastesCategories.jsx";

const Sidebar = ({
  style,
  dishTaste,
  setDishTaste,
  onTasteChange = () => {},
}) => {
  return (
    <Stack sx={{ ...style, maxWidth: "14rem" }} spacing={1}>
      <h2>Categories</h2>
      <TastesCategories
        style={{ display: "flex", flexWrap: "wrap" }}
        value={dishTaste}
        setValue={setDishTaste}
        onTasteChange={onTasteChange}
      />
      <Divider orientation="horizontal" />
    </Stack>
  );
};

export default Sidebar;
