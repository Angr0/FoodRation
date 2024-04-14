import React, { useState } from "react";
import { CircularProgress, Stack } from "@mui/joy";
import CookingHistoryCard from "../Items/CookingHistoryCard.jsx";

const CookingHistory = ({ loading }) => {
  const [cookingHistory, setCookingHistory] = useState([
    {
      name: "Chlodnik",
      portions: "3",
      date: "19.04.2020",
    },
    {
      name: "Rattatouile",
      portions: "1",
      date: "14.05.2020",
    },
  ]);
  if (loading) return <CircularProgress color="danger" />;
  if (cookingHistory?.length === 0) return "There is no cooking history :(";
  return (
    <Stack alignItems="center" justifyContent="center">
      {cookingHistory.map(({ name, portions, date, icon_url }) => (
        <CookingHistoryCard
          key={name}
          name={name}
          iconUrl={icon_url}
          portions={portions}
          date={date}
        />
      ))}
    </Stack>
  );
};

export default CookingHistory;
