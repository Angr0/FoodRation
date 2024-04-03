import { Box, Stack } from "@mui/joy";
import { Route, Routes } from "react-router-dom";
import MainPage from "../components/Pages/MainPage.jsx";
import Header from "../components/Header.jsx";
import React from "react";

function App() {
  return (
    <Stack alignItems="center" sx={{ width: "100vw" }}>
      <Header />
      <Box
        sx={{
          width: "100%",
          maxWidth: "1250px",
          padding: { xs: "0 .5rem" },
        }}
      >
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="/calculator" element={<div>calculator</div>} />
          <Route path="/shopping_list" element={<div>shopping_list</div>} />
          <Route path="/cooking_history" element={<div>cooking_history</div>} />
          <Route path="/fridge" element={<div>fridge1</div>} />
          <Route path="*" element={<div>error page</div>} />
        </Routes>
      </Box>
    </Stack>
  );
}

export default App;
