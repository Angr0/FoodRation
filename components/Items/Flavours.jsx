import React, { useEffect, useState } from "react";
import { Button, ToggleButtonGroup } from "@mui/joy";
import axios from "axios";

const Flavours = ({
  style = {},
  value,
  setValue,
  onFlavourChange = () => {},
}) => {
  const [flavours, setFlavours] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/flavours/").then(({ data }) => {
      setFlavours(data);
    });
  }, []);

  return (
    <ToggleButtonGroup
      spacing={1}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        onFlavourChange(newValue);
      }}
      color="danger"
      sx={{
        ...style,
      }}
    >
      {flavours?.map((taste) => (
        <Button key={taste} value={taste} sx={{ padding: "0 1rem" }}>
          {taste}
        </Button>
      ))}
    </ToggleButtonGroup>
  );
};

export default Flavours;
