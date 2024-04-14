import React from "react";
import { Card, Grid, Stack } from "@mui/joy";
import { CardContent, CardMedia } from "@mui/material";

const CookingHistoryCard = ({ iconUrl, name, portions, date }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        marginTop: 2,
        width: { sm: "var(--max-width-main-content)" },
      }}
    >
      <CardContent sx={{ width: "100%" }}>
        <Grid container sx={{ width: "100%" }} rowSpacing={1} width={"100%"}>
          <Grid xs={12} sm={3} justifyContent={"center"} alignItems={"center"}>
            <CardMedia
              component="img"
              sx={{
                height: { xs: 50, md: 80 },
                width: { xs: 50, md: 80 },
                backgroundColor: "lightgreen",
              }}
              src={iconUrl}
              title={name}
            />
          </Grid>
          <Grid xs={6} sm={3}>
            {name?.toUpperCase()}
          </Grid>
          <Grid xs={6} sm={3}>
            Portions: {portions}
          </Grid>
          <Grid xs={12} sm={3}>
            Cooking Date: {date}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CookingHistoryCard;
