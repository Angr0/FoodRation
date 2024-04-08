import React from "react";
import SpeedIcon from "@mui/icons-material/Speed.js";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter.js";
import CelebrationIcon from "@mui/icons-material/Celebration.js";
import { Button, Stack } from "@mui/joy";
import Sidebar from "../Items/Sidebar.jsx";
import CustomInput from "../Items/CustomInput.jsx";
import TastesCategories from "../Items/TastesCategories.jsx";
import TemperatureToggle from "../Items/TemperatureToggle.jsx";
import FastAccessBox from "../Items/FastAccessBox.jsx";

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

  return (
    <Stack direction="row" justifyContent="center" gap={4}>
      <Sidebar style={{ display: { xs: "none", md: "block" } }} />

      <Stack
        direction="column"
        alignItems="center"
        spacing={{ xs: 1, sm: 4 }}
        sx={{ width: { xs: "100%", md: "auto" }, margin: "1rem 0" }}
      >
        <Stack
          sx={{ width: "100%" }}
          alignItems="center"
          spacing={{ xs: 1, md: 4 }}
          direction={{ xs: "column", md: "row" }}
        >
          <CustomInput />
          <TastesCategories
            style={{
              display: { sx: "block", md: "none" },
              overflowX: "scroll",
              maxWidth: "100%",
            }}
          />
          <Stack direction="row" justifyContent="center" gap={{ xs: 1, md: 4 }}>
            <TemperatureToggle />
            <Button>Find&nbsp;recipe</Button>
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
