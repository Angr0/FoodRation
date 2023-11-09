import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Header from "../components/Header.jsx";
import { extendTheme } from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: "#fffdfa",
          100: "#fff3e0",
          200: "#ffe7c2",
          300: "#ffd08a",
          400: "#ffba52",
          500: "#ffa31a",
          600: "#e08700",
          700: "#a86500",
          800: "#704300",
          900: "#382200",
        },
        background: {
          surface: "#F6EEE4",
        },
        text: {
          icon: "#C47A12",
        },
      },
    },
    dark: {
      palette: {
        primary: {},
        background: {},
        text: {},
      },
    },
  },
});

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
