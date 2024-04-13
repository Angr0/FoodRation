import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, ToggleButtonGroup } from "@mui/joy";

const Categories = ({ style = {}, value, setValue, setAllCategories }) => {
  const [flavours, setFlavours] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/categories/").then(({ data }) => {
      setFlavours(data);
    });
  }, []);

  return (
    <ToggleButtonGroup
      spacing={1}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        setAllCategories((oldValue) => ({ ...oldValue, category: newValue }));
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

export default Categories;
