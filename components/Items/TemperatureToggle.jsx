import React from "react";
import { Button, ToggleButtonGroup } from "@mui/joy";

const TemperatureToggle = ({
  style = {},
  value,
  setValue,
  setAllCategories,
}) => {
  return (
    <ToggleButtonGroup
      color="danger"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        setAllCategories((oldValue) => ({
          ...oldValue,
          temperature: newValue,
        }));
      }}
      sx={{
        ...style,
      }}
    >
      <Button value={"hot"}>Hot</Button>
      <Button value={"cold"}>Cold</Button>
    </ToggleButtonGroup>
  );
};

export default TemperatureToggle;
