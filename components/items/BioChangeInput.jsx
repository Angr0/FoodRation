import React from "react";
import { FormControl, Input, Stack } from "@mui/joy";

const BioChangeInput = ({ label, register }) => {
  return (
    <FormControl>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={2}
      >
        <p>{label}:</p>
        <Input
          type={"number"}
          sx={{ maxWidth: "5rem" }}
          slotProps={{ input: { min: 1 } }}
          {...register(label?.toLowerCase())}
        />
      </Stack>
    </FormControl>
  );
};

export default BioChangeInput;
