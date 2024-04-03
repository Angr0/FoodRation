import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../styles/index.css";
import Header from "../components/Header/Header.jsx";
import { Box, extendTheme, Stack, THEME_ID } from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";
import customTheme from "../helper/customTheme.js";
import { Experimental_CssVarsProvider } from "@mui/material";

const theme = extendTheme(customTheme);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Experimental_CssVarsProvider>
      <CssVarsProvider
        defaultMode="light"
        theme={{ [THEME_ID]: theme }}
        modeStorageKey="demo_light-mode-by-default"
        disableNestedContext
      >
        <Stack alignItems="center" sx={{ width: "100vw" }}>
          <Header />
          <Box
            sx={{
              width: "100%",
              maxWidth: "1250px",
              padding: { xs: "0 .5rem" },
            }}
          >
            <App />
          </Box>
        </Stack>
      </CssVarsProvider>
    </Experimental_CssVarsProvider>{" "}
  </React.StrictMode>,
);
