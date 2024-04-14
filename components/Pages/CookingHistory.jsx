import React, { useEffect, useState } from "react";
import { CircularProgress, Stack } from "@mui/joy";
import CookingHistoryCard from "../Items/CookingHistoryCard.jsx";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CookingHistory = () => {
  const username = useSelector((state) => state.user.username);
  const [loading, setLoading] = useState(false);
  const [cookingHistory, setCookingHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate("/");
      return;
    }

    setLoading(true);

    axios
      .get(`http://localhost:8000/cooking-history/${username}/`)
      .then(({ data }) => {
        setLoading(false);
        setCookingHistory(data);
      })
      .catch((errors) => {
        console.log(errors);
      });
  }, [navigate, username]);

  return (
    <Stack alignItems="center" justifyContent="center" gap={2} mt={2} mb={2}>
      {cookingHistory?.length === 0 ? (
        "You haven't done any recipes yet! Get to work"
      ) : loading ? (
        <CircularProgress color="danger" />
      ) : (
        cookingHistory.map(({ name, portions, date, icon_link }) => (
          <CookingHistoryCard
            key={`${name}-${date}`}
            name={name}
            iconUrl={icon_link}
            portions={portions}
            date={date}
          />
        ))
      )}
    </Stack>
  );
};

export default CookingHistory;
