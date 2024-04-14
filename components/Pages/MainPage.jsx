import React, { useState } from "react";
import SpeedIcon from "@mui/icons-material/Speed.js";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter.js";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Autocomplete,
  AutocompleteOption,
  CircularProgress,
  Stack,
} from "@mui/joy";
import FastAccessBox from "../Items/FastAccessBox.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { matchSorter } from "match-sorter";
import { useSelector } from "react-redux";

const MainPage = ({ setOpenLogInModal }) => {
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
      icon: <FavoriteBorderIcon sx={{ fontSize: "5rem" }} />,
      title: "Favourites",
      text: "Treat yourself to tantalizing flavors with our limited-time offer!",
      big: true,
    },
  ];

  const username = useSelector((state) => state.user.username);
  const [autoCompleteOptions, setAutocompleteOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  function getRecipesToSearch() {
    setLoading(true);
    axios.get("http://localhost:8000/search-data/").then(({ data }) => {
      setAutocompleteOptions(data);
      setLoading(false);
    });
  }

  const filterOptions = (options, { inputValue }) =>
    matchSorter(options, inputValue, { keys: ["name", "ingredients"] });

  return (
    <Stack direction="row" justifyContent="center" gap={4} mt={2} mb={4}>
      <Stack
        alignItems="center"
        spacing={2}
        sx={{
          width: { xs: "100%", md: "var(--max-width-main-content)" },
        }}
      >
        <Autocomplete
          freeSolo
          variant="outlined"
          color="primary"
          placeholder={"Find your recipe"}
          options={autoCompleteOptions}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <Link to={`/recipe/${option.name}`} key={option.name}>
              <AutocompleteOption color={"primary"} {...props}>
                {option.name}
              </AutocompleteOption>
            </Link>
          )}
          sx={{
            width: "100%",
            maxWidth: "var(--max-width-mobile-content)",
          }}
          onOpen={getRecipesToSearch}
          filterOptions={filterOptions}
          loading={loading}
          endDecorator={loading ? <CircularProgress size="sm" /> : null}
        />
        <Stack direction={{ xs: "column" }} spacing={{ xs: 2, md: 3 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, md: 3 }}
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
            onClick={() => {
              if (!username) setOpenLogInModal(true);
            }}
            color={"primary"}
            variant={"solid"}
            link={username && "/favourites"}
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
