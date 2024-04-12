import React from "react";
import { Card, Stack } from "@mui/joy";
import { Link } from "react-router-dom";

const FastAccessBox = ({
  icon,
  title,
  text,
  color = "neutral",
  variant = "soft",
  big = false,
}) => {
  const defaultSize = "18rem";
  const bigSize = "100%";
  const size = big ? bigSize : defaultSize;

  return (
    <Link to={"/public_recipes"}>
      <Card
        color={color}
        variant={variant}
        sx={{
          maxWidth: { xs: defaultSize, sm: size },
          boxShadow: "0px 0px 24px -6px rgba(66, 68, 90, 1)",
        }}
      >
        <Stack direction="column" alignItems="center" spacing={1}>
          <span>{icon}</span>
          <span style={{ fontWeight: "bold", fontSize: "1.5em" }}>{title}</span>
          <div style={{ textAlign: "center" }}>{text}</div>
        </Stack>
      </Card>
    </Link>
  );
};

export default FastAccessBox;
