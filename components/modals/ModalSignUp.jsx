import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  Radio,
  RadioGroup,
} from "@mui/joy";

const ModalSignUp = ({ open, setOpen }) => {
  const onSubmit = () => {};

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog>
        <FormControl>
          <FormLabel>Login</FormLabel>
          <Input required />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input required type={"password"} />
        </FormControl>
        <FormControl>
          <FormLabel>Repeat password</FormLabel>
          <Input required type={"password"} />
        </FormControl>
        <FormControl>
          <FormLabel>Sex</FormLabel>
          <RadioGroup defaultValue={"male"}>
            <Radio value={"male"} label={"Male"} />
            <Radio value={"female"} label={"Female"} />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Height</FormLabel>
          <Input
            type="number"
            defaultValue={1}
            slotProps={{
              input: {
                min: 1,
                step: 1,
              },
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Weight</FormLabel>
          <Input
            type="number"
            defaultValue={1}
            slotProps={{
              input: {
                min: 1,
                step: 1,
              },
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Age</FormLabel>
          <Input
            type="number"
            defaultValue={1}
            slotProps={{
              input: {
                min: 1,
                step: 1,
              },
            }}
          />
        </FormControl>

        <Button type={"submit"} onClick={onSubmit}>
          Sign up
        </Button>
      </ModalDialog>
    </Modal>
  );
};

export default ModalSignUp;
