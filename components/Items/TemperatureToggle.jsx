import React from "react";
import { Button, ToggleButtonGroup } from "@mui/joy";

const TemperatureToggle = ({
  value,
  setValue,
  onTemperatureChange = () => {},
}) => {
  return (
    <ToggleButtonGroup
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        onTemperatureChange(newValue);
      }}
      color="primary"
    >
      <Button value={"hot"}>Hot</Button>
      <Button value={"cold"}>Cold</Button>
    </ToggleButtonGroup>
  );
};

export default TemperatureToggle;
