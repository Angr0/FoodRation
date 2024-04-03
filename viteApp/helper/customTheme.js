const customTheme = {
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: "#e2bd89",
          100: "#dcaf71",
          200: "#d6a259",
          300: "#d09541",
          400: "#ca872a",
          500: "#c47a12",
          600: "#b06e10",
          700: "#9d620e",
          800: "#89550d",
          900: "#76490b",
        },
        neutral: {
          50: "#fbf7f2",
          100: "#faf5ef",
          200: "#f9f3ec",
          300: "#f8f1e9",
          400: "#f7f0e7",
          500: "#f6eee4",
          600: "#ddd6cd",
          700: "#c5beb6",
          800: "#aca7a0",
          900: "#948f89",
        },
        danger: {
          50: "#808a94",
          100: "#66737f",
          200: "#4d5b69",
          300: "#334454",
          400: "#1a2c3e",
          500: "#001529",
          600: "#001121",
          700: "#000f1d",
          800: "#000d19",
          900: "#000b15",
        },
        success: {
          50: "#fafafa",
          100: "#f9f9f9",
          200: "#f8f8f8",
          300: "#f7f7f7",
          400: "#f6f6f6",
          500: "#f5f5f5",
          600: "#dddddd",
          700: "#c4c4c4",
          800: "#acacac",
          900: "#939393",
        },
      },
    },
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: {
          // borderWidth: "0.25rem",
        },
      },
    },
  },
};

export default customTheme;
