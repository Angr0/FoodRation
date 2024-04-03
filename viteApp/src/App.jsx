import style from "../styles/App.module.scss";
import CustomInput from "../components/Items/CustomInput.jsx";
import { Button, Stack } from "@mui/joy";
import TastesCategories from "../components/Items/Taste categories/TastesCategories.jsx";
import FastAccessBox from "../components/Items/FastAccessBox.jsx";
import SpeedIcon from "@mui/icons-material/Speed";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CelebrationIcon from "@mui/icons-material/Celebration";
import TemperatureToggle from "../components/Items/TemperatureToggle.jsx";
import Sidebar from "../components/Items/Sidebar.jsx";

function App() {
  const content = [
    {
      icon: <SpeedIcon sx={{ fontSize: "5rem" }} />,
      title: "Fast Recipe",
      text: "I don't have much time, so I need a dish that can be quickly prepared and cooked.",
    },
    {
      icon: <FitnessCenterIcon sx={{ fontSize: "5rem" }} />,
      title: "Fit dish",
      text: "I'm looking for a recipe that is healthy, has good macros, and is rich in vitamins.",
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
        className={style.container}
        direction="column"
        alignItems="center"
        spacing={{ xs: 1, sm: 4 }}
        sx={{ width: { xs: "100%", md: "auto" } }}
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
}

export default App;
