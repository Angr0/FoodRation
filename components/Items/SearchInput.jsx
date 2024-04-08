import React from "react";
import { Input } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = ({ onChange = (e) => {} }) => {
  return (
    <Input
      variant="soft"
      sx={{ width: { md: "100%" } }}
      startDecorator={<SearchIcon />}
      onChange={onChange}
    />
  );
};

export default SearchInput;
