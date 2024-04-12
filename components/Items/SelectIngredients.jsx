import React, { useEffect, useState } from "react";
import { Option, Select } from "@mui/joy";
import axios from "axios";

const SelectIngredients = ({ setCurrentIngredient }) => {
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/all-ingredients/").then(({ data }) => {
      setIngredients(data);
    });
  }, []);

  return (
    <Select
      placeholder="Ingredients"
      sx={{ minWidth: "12rem", maxWidth: "24rem" }}
      onChange={(_, newValue) => setCurrentIngredient(ingredients[newValue])}
    >
      {ingredients?.map(({ name }, index) => (
        <Option key={name} value={index}>
          {name}
        </Option>
      ))}
    </Select>
  );
};

export default SelectIngredients;
