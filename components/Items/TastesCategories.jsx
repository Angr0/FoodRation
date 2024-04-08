import React, { useState } from "react";
import { Button, ToggleButtonGroup } from "@mui/joy";
import tastesCategories from "../../helper/tasteCategories.js";

const TastesCategories = ({ style = {}, value, setValue }) => {
  return (
    <ToggleButtonGroup
      spacing={1}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      color="danger"
      sx={{
        ...style,
      }}
    >
      {tastesCategories?.map((taste) => (
        <Button key={taste} value={taste} sx={{ padding: "0 1rem" }}>
          {taste}
        </Button>
      ))}
    </ToggleButtonGroup>
  );
};

export default TastesCategories;
