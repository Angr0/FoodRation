import React from "react";
import { Button, Stack } from "@mui/joy";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { FaMugHot, FaRegSnowflake } from "react-icons/fa";

const RecipeCard = ({
  name,
  isWarm,
  iconUrl,
  categories,
  typeName,
  ingredients,
}) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        maxWidth: 800,
        width: "100%",
      }}
    >
      <CardMedia
        component="img"
        sx={{ height: 140, width: 140, backgroundColor: "lightgreen" }}
        image={iconUrl}
        title={name}
      />
      <CardContent>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <b>{name?.toUpperCase()}</b>
          {isWarm ? <FaMugHot /> : <FaRegSnowflake />}
        </Stack>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          {typeName},
          {categories.map((category) => (
            <span key={category}>{category}</span>
          ))}
        </Stack>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          {ingredients.map(({ ingredient }) => (
            <span key={ingredient}>{ingredient}</span>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
