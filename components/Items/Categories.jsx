import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, CircularProgress, ToggleButtonGroup } from "@mui/joy";

const Categories = ({ style = {}, value, setValue, setAllCategories }) => {
  const [flavours, setFlavours] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:8000/categories/").then(({ data }) => {
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
        setAllCategories((oldValue) => ({ ...oldValue, category: newValue }));
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

export default Categories;
