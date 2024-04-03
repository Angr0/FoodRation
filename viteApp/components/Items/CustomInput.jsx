import React from "react";
import { Input } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";

const CustomInput = () => {
  return (
    <Input
      variant="soft"
      sx={{ width: { md: "100%" } }}
      startDecorator={<SearchIcon />}
    />
  );
};

export default CustomInput;
