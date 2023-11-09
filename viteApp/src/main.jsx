import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Header from "../components/Header.jsx";
import { extendTheme } from "@mui/joy";
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
      <Header />
      <App />
    </CssVarsProvider>
  </React.StrictMode>,
);
