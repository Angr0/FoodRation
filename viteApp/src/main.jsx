import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../styles/index.css";
import Header from "../components/Header/Header.jsx";
import { Box, extendTheme, Stack } from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";
import customTheme from "../helper/customTheme.js";

const theme = extendTheme(customTheme);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssVarsProvider
      defaultMode="light"
      theme={theme}
      modeStorageKey="demo_light-mode-by-default"
      disableNestedContext
    >
      <Stack alignItems="center" sx={{ width: "100vw" }}>
        <Header />
        <Box sx={{ width: "100%", maxWidth: "1250px" }}>
          <App />
        </Box>
      </Stack>
    </CssVarsProvider>
  </React.StrictMode>,
);
