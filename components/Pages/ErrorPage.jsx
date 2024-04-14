import React from "react";
import { Stack } from "@mui/joy";

const ErrorPage = () => {
  return (
    <Stack
      alignSelf={"center"}
      alignItems="center"
      justifyContent="center"
      sx={{ height: "80vh" }}
      mt={2}
    >
      <img
        src="/public/404LetMeCook.png"
        alt="404 Page not found."
        style={{ width: "100%", maxWidth: "var(--max-width-main-content)" }}
      />
    </Stack>
  );
};

export default ErrorPage;
