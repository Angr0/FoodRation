import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Stack } from "@mui/joy";

const Recipe = () => {
  const { recipe } = useParams();

  useEffect(() => {}, []);

  return (
    <Stack alignItems={"center"} mt={2} mb={2}>
      <Card
        sx={{
          maxWidth: "var(--max-width-main-content)",
          width: "100%",
          maxHeight: 140,
        }}
      >
        {recipe?.toUpperCase()}
      </Card>
    </Stack>
  );
};

export default Recipe;
