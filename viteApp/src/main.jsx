import React from "react";
import ReactDOM from "react-dom/client";
import "../styles/index.css";
import { extendTheme, THEME_ID } from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";
import customTheme from "../helper/customTheme.js";
import { Experimental_CssVarsProvider } from "@mui/material";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import Header from "../components/Header.jsx";
import App from "./App.jsx";

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
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CssVarsProvider>
    </Experimental_CssVarsProvider>
  </React.StrictMode>,
);
