import React, { useEffect, useState } from "react";
import { Autocomplete, AutocompleteOption } from "@mui/joy";
import axios from "axios";
import { matchSorter } from "match-sorter";

const SelectIngredients = ({ setCurrentIngredient, setNumberValue }) => {
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/all-ingredients/").then(({ data }) => {
      setIngredients(data);
    });
  }, []);

  const filterOptions = (options, { inputValue }) =>
    matchSorter(options, inputValue, { keys: ["name"] });

  return (
    <Autocomplete
      variant="outlined"
      color="success"
      placeholder={"Ingredients"}
      autoHighlight
      options={ingredients}
      getOptionLabel={(option) => option.name}
      onChange={(event, newValue) => {
        setCurrentIngredient(newValue || {});
        setNumberValue("quantity", 1);
      }}
      renderOption={(props, option) => (
        <AutocompleteOption color={"primary"} {...props}>
          <img
            src={option.icon_link}
            alt={option.name}
            style={{ width: "2.5rem" }}
          />
          {option.name}
        </AutocompleteOption>
      )}
      sx={{
        width: "100%",
        maxWidth: "var(--max-width-mobile-content)",
      }}
      filterOptions={filterOptions}
    />
  );
};

export default SelectIngredients;
