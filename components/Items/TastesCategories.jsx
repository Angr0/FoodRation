import React, { useEffect, useState } from "react";
import { Button, ToggleButtonGroup } from "@mui/joy";
import axios from "axios";

const TastesCategories = ({ style = {}, value, setValue }) => {
  const [tasteCategories, setTasteCategories] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/flavours/").then(({ data }) => {
      setTasteCategories(data);
    });
  }, []);

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
      {tasteCategories?.map((taste) => (
        <Button key={taste} value={taste} sx={{ padding: "0 1rem" }}>
          {taste}
        </Button>
      ))}
    </ToggleButtonGroup>
  );
};

export default TastesCategories;
