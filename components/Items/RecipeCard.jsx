import React from "react";
import { Stack } from "@mui/joy";
import { Card, CardContent, CardMedia, Box } from "@mui/material";
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
  flavours,
}) => {
  return (
    <Link
      to={`/recipe/${name}`}
      style={{
        maxWidth: "var(--max-width-main-content)",
        width: "100%",
        maxHeight: 160,
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
          }}
          src={iconUrl}
          title={name}
        />
        <CardContent>
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <b style={{ maxHeight: "48px", overflow: "hidden" }}>
              {name?.toUpperCase()}
            </b>

            <Box
              sx={{
                fontSize: "1rem",
                display: { xs: "none", sm: "block" },
              }}
            >
              {isWarm ? <FaMugHot /> : <FaRegSnowflake />}
            </Box>
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={0.5}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {typeName};{" "}
            {categories.map((category, index) => (
              <span key={category}>
                {category}
                <ComaWithoutLast
                  index={index}
                  length={categories.length}
                  endDecorator={"; "}
                />
              </span>
            ))}
            {flavours.map((flavour, index) => (
              <span key={flavour}>
                {flavour}
                <ComaWithoutLast
                  index={index}
                  length={flavours.length}
                  endDecorator={";"}
                />
              </span>
            ))}
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={1}
            color={"gray"}
            sx={{
              display: { xs: "none", md: "block" },
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              height: "24px",
              maxWidth: "var(--max-width-main-content-without-padding)",
            }}
          >
            <b>Ingredients: </b>
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
