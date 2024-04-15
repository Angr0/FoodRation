import React, { useEffect, useState } from "react";
import { Button, CircularProgress, ToggleButtonGroup } from "@mui/joy";
import axios from "axios";

const Flavours = ({ style = {}, value, setValue, setAllCategories }) => {
  const [flavours, setFlavours] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:8000/flavours/").then(({ data }) => {
      setFlavours(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <CircularProgress color={"danger"} />;
  return (
    <ToggleButtonGroup
      spacing={1}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        setAllCategories((oldValue) => ({ ...oldValue, flavour: newValue }));
      }}
      color="danger"
      sx={{
        ...style,
      }}
    >
      {flavours?.map((taste) => (
        <Button key={taste} value={taste} sx={{ padding: "0 1rem" }}>
          {taste}
        </Button>
      ))}
    </ToggleButtonGroup>
  );
};

export default Flavours;
