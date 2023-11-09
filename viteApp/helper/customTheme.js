const customTheme = {
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
  components: {
    JoyButton: {
      styleOverrides: {
        root: {
          borderWidth: "0.25rem",
        },
      },
    },
  },
};

export default customTheme;
