import React, { useState } from "react";
import SpeedIcon from "@mui/icons-material/Speed.js";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter.js";
import CelebrationIcon from "@mui/icons-material/Celebration.js";
import { Autocomplete, AutocompleteOption, Button, Stack } from "@mui/joy";
import Sidebar from "../Items/Sidebar.jsx";
import TastesCategories from "../Items/TastesCategories.jsx";
import TemperatureToggle from "../Items/TemperatureToggle.jsx";
import FastAccessBox from "../Items/FastAccessBox.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { matchSorter } from "match-sorter";

const MainPage = () => {
  const content = [
    {
      icon: <SpeedIcon sx={{ fontSize: "5rem" }} />,
      title: "Fast Recipe",
      text: "I don't have much time, so I need a dish that can be quickly prepared and cooked.",
      big: false,
    },
    {
      icon: <FitnessCenterIcon sx={{ fontSize: "5rem" }} />,
      title: "Fit dish",
      text: "I'm looking for a recipe that is healthy, has good macros, and is rich in vitamins.",
      big: false,
    },
    {
      icon: <CelebrationIcon sx={{ fontSize: "5rem" }} />,
      title: "Party set",
      text: "Make your party unforgettable with our creative and delicious party sets.",
      big: true,
    },
  ];

  const [dishTemperature, setDishTemperature] = useState(["hot"]);
  const [dishTaste, setDishTaste] = useState([]);
  const [autoCompleteOptions, setAutocompleteOptions] = useState([]);

  function getRecipesToSearch() {
    axios.get("http://localhost:8000/search-data/").then(({ data }) => {
      console.log(data);
      setAutocompleteOptions(data);
    });
  }

  const filterOptions = (options, { inputValue }) =>
    matchSorter(options, inputValue, { keys: ["name", "ingredients"] });

  return (
    <Stack direction="row" justifyContent="center" gap={4} mt={2} mb={4}>
      <Sidebar
        style={{ display: { xs: "none", md: "block" } }}
        dishTaste={dishTaste}
        setDishTaste={setDishTaste}
      />
      <Stack
        alignItems="center"
        spacing={{ xs: 1, sm: 4 }}
        sx={{
          width: { xs: "100%", md: "var(--max-width-main-content)" },
        }}
      >
        <Stack
          sx={{ width: "100%" }}
          alignItems="center"
          spacing={{ xs: 1, md: 4 }}
          direction={{ xs: "column", md: "row" }}
        >
          <Autocomplete
            variant="outlined"
            color="primary"
            placeholder={"Recipes..."}
            options={autoCompleteOptions}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Link to={`/recipe/${option.name}`} key={option.name}>
                <AutocompleteOption {...props}>
                  {option.name}
                </AutocompleteOption>
              </Link>
            )}
            sx={{ width: { md: "100%" } }}
            onOpen={getRecipesToSearch}
            filterOptions={filterOptions}
          />

          <TastesCategories
            style={{
              display: { sx: "block", md: "none" },
              overflowX: "scroll",
              maxWidth: "100%",
            }}
            value={dishTaste}
            setValue={setDishTaste}
          />
          <Stack direction="row" justifyContent="center" gap={{ xs: 1, md: 4 }}>
            <TemperatureToggle
              value={dishTemperature}
              setValue={setDishTemperature}
            />
            <Link to={"/public_recipes"}>
              <Button color="danger">Find&nbsp;recipe</Button>
            </Link>
          </Stack>
        </Stack>
        <Stack direction={{ xs: "column" }} spacing={{ xs: 1, sm: 4 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 4 }}
          >
            {content
              .slice(0, content.length - 1)
              ?.map(({ icon, title, text, big }, index) => (
                <FastAccessBox
                  key={index}
                  icon={icon}
                  title={title}
                  text={text}
                  big={big}
                />
              ))}
          </Stack>
          <FastAccessBox
            color={"primary"}
            variant={"solid"}
            icon={content[content.length - 1].icon}
            title={content[content.length - 1].title}
            text={content[content.length - 1].text}
            big={content[content.length - 1].big}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MainPage;
