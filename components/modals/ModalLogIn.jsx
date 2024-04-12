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
import { redirect } from "react-router-dom";
import { setUsername } from "../../redux/userSlice.js";
import { useDispatch } from "react-redux";

const ModalLogIn = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { login: "Adach", password: "gruby" },
  });

  const logIn = (logInData) => {
    axios
      .post("http://localhost:8000/login/", logInData)
      .then(({ data }) => {
        if (data["password matches"]) {
          setOpen(false);
          dispatch(setUsername(logInData.login));
          reset();
          return redirect("/public_recipes");
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(logInData);
        reset();
      });
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <form onSubmit={handleSubmit(logIn)}>
        <ModalDialog>
          <ModalClose />
          <FormControl>
            <FormLabel>Login</FormLabel>
            <Input color="danger" required {...register("login")} />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              color="danger"
              required
              type={"password"}
              {...register("password")}
            />
          </FormControl>
          <Button type={"submit"}>Log in</Button>
        </ModalDialog>
      </form>
    </Modal>
  );
};

export default ModalLogIn;
