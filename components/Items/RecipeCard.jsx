import React from "react";
import { Stack } from "@mui/joy";
import { Card, CardContent, CardMedia } from "@mui/material";
import { FaMugHot, FaRegSnowflake } from "react-icons/fa";
import { Link } from "react-router-dom";
import ComaWithoutLast from "./ComaWithoutLast.jsx";

const RecipeCard = ({
  name,
  isWarm,
  iconUrl,
  categories,
  typeName,
  ingredients,
}) => {
  return (
    <Link
      to={`/recipe/${name}`}
      style={{
        maxWidth: "var(--max-width-main-content)",
        width: "100%",
        maxHeight: 140,
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            height: { xs: 100, md: 140 },
            width: { xs: 100, md: 140 },
            backgroundColor: "lightgreen",
          }}
          image={iconUrl}
          title={name}
        />
        <CardContent>
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <b>{name?.toUpperCase()}</b>
            <span style={{ fontSize: "1rem" }}>
              {isWarm ? <FaMugHot /> : <FaRegSnowflake />}
            </span>
          </Stack>
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            {typeName},
            {categories.map((category, index) => (
              <span key={category}>
                {category}
                <ComaWithoutLast index={index} length={categories.length} />
              </span>
            ))}
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={1}
            color={"gray"}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            Ingredients:{" "}
            {ingredients.map((ingredient, index) => (
              <span key={ingredient}>
                {ingredient}
                <ComaWithoutLast index={index} length={ingredients.length} />
              </span>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecipeCard;
