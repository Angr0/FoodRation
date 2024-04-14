import React from "react";
import { Card, Grid, Stack } from "@mui/joy";
import { CardMedia } from "@mui/material";

const CookingHistoryCard = ({ iconUrl, name, portions, date }) => {
  const dateToFormat = new Date(date);

  function formatNumber(num) {
    if (num <= 9) {
      return String(num).padStart(2, "0");
    } else {
      return String(num);
    }
  }

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        width: { sm: "var(--max-width-main-content)" },
      }}
    >
      <Grid
        container
        sx={{ width: "100%" }}
        width={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={{ xs: 1, sm: 0 }}
      >
        <Grid xs={12} sm={3}>
          <Stack alignItems={"center"} justifyContent={"center"}>
            <CardMedia
              component="img"
              sx={{
                height: 80,
                width: 80,
              }}
              src={iconUrl}
              title={name}
            />
          </Stack>
        </Grid>
        <Grid xs={12} sm={3}>
          <Stack alignItems={"center"} justifyContent={"center"}>
            {name?.toUpperCase()}
          </Stack>
        </Grid>
        <Grid xs={12} sm={3}>
          <Stack alignItems={"center"} justifyContent={"center"}>
            Portions: {portions}
          </Stack>
        </Grid>
        <Grid xs={12} sm={3}>
          <Stack alignItems={"center"} justifyContent={"center"}>
            Date: {dateToFormat.getFullYear()}-
            {formatNumber(dateToFormat.getMonth())}-
            {formatNumber(dateToFormat.getDate())} /{" "}
            {formatNumber(dateToFormat.getHours())}:
            {formatNumber(dateToFormat.getMinutes())}
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CookingHistoryCard;
