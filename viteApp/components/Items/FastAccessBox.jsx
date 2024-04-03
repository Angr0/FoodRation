import React from "react";
import { Card, Stack } from "@mui/joy";

const FastAccessBox = ({ icon, title, text, big = false }) => {
  const defaultSize = "18rem";
  const bigSize = "100%";
  const size = big ? bigSize : defaultSize;

  return (
    <Card
      color="danger"
      variant="soft"
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
  );
};

export default FastAccessBox;
