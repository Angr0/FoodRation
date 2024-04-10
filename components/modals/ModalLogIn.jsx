import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
} from "@mui/joy";
import axios from "axios";
import { useForm } from "react-hook-form";

const ModalLogIn = ({ open, setOpen, setUserName }) => {
  const { register, handleSubmit } = useForm();

  const logIn = (data) => {
    console.log(data);
    axios.get("http://localhost:8000/login/", data).then((r) => {
      console.log(r);
    });
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <form onSubmit={handleSubmit(logIn)}>
        <ModalDialog>
          <ModalClose />
          <FormControl>
            <FormLabel>Login</FormLabel>
            <Input required {...register("login")} />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input required type={"password"} {...register("password")} />
          </FormControl>
          <Button type={"submit"}>Log in</Button>
        </ModalDialog>
      </form>
    </Modal>
  );
};

export default ModalLogIn;
