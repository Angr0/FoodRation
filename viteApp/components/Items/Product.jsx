import React from "react";
import { Card } from "@mui/joy";
import { Rating } from "@mui/material";

const Product = ({ name, categories, rating, imgPath }) => {
  const [value, setValue] = React.useState(2);

  return (
    <Card>
      <img src={imgPath} alt={name} />
      {name}
      {categories.map((category) => category)}
      {rating}
      <Rating defaultValue={value} />
    </Card>
  );
};

export default Product;
