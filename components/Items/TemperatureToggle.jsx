import React, { useState } from "react";
import { Button, ToggleButtonGroup } from "@mui/joy";

const TemperatureToggle = ({ value, setValue }) => {
  return (
    <ToggleButtonGroup
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      color="primary"
    >
      <Button value={"hot"}>Hot</Button>
      <Button value={"cold"}>Cold</Button>
    </ToggleButtonGroup>
  );
};

export default TemperatureToggle;
