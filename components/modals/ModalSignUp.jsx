import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/joy";
import { useForm } from "react-hook-form";
import axios from "axios";
import { setUsername } from "../../redux/userSlice.js";
import { useDispatch } from "react-redux";

const ModalSignUp = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [samePasswords, setSamePasswords] = useState(true);
  const { register, handleSubmit, reset } = useForm();

  const signUp = ({
    login,
    password,
    sex,
    height,
    weight,
    age,
    repeat_password,
  }) => {
    setSamePasswords(password === repeat_password);
    if (password !== repeat_password) {
      return;
    }

    const data = {
      login: login,
      password: password,
      is_male: sex === "male",
      height: parseInt(height),
      weight: parseInt(weight),
      age: parseInt(age),
    };
    axios
      .post("http://localhost:8000/users/", data)
      .then((r) => {
        reset();
        setOpen(false);
        console.log(r);
        dispatch(setUsername(login));
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog
        sx={{ maxHeight: "95%", overflowY: "scroll" }}
        color={"neutral"}
        variant={"solid"}
      >
        <form onSubmit={handleSubmit(signUp)}>
          <Stack gap={2}>
            <FormControl>
              <FormLabel>Login</FormLabel>
              <Input color="danger" variant="soft" {...register("login", { required: true })} />
            </FormControl>
            <FormControl>
              <FormLabel sx={{ color: !samePasswords ? "red" : "" }}>
                Password
              </FormLabel>
              <Input
                color="danger"
                variant="soft"
                type={"password"}
                {...register("password", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel sx={{ color: !samePasswords ? "red" : "" }}>
                Repeat password
              </FormLabel>
              <Input
                color="danger"
                variant="soft"
                type={"password"}
                {...register("repeat_password", { required: true })}
              />
            </FormControl>
            {!samePasswords && <span>Not the same passwords</span>}
            <FormControl>
              <FormLabel>Sex</FormLabel>
              <RadioGroup defaultValue={"male"}>
                <Radio
                  value={"male"}
                  label={"Male"}
                  {...register("sex", { required: true })}
                />
                <Radio
                  value={"female"}
                  label={"Female"}
                  {...register("sex", { required: true })}
                />
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Height</FormLabel>
              <Input
                color="danger"
                variant="soft"
                type="number"
                defaultValue={1}
                slotProps={{
                  input: {
                    min: 1,
                    max: 250,
                    step: 1,
                  },
                }}
                {...register("height", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Weight</FormLabel>
              <Input
                color="danger"
                variant="soft"
                type="number"
                defaultValue={1}
                slotProps={{
                  input: {
                    min: 1,
                    max: 500,
                    step: 1,
                  },
                }}
                {...register("weight", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Age</FormLabel>
              <Input
                color="danger"
                variant="soft"
                type="number"
                defaultValue={1}
                slotProps={{
                  input: {
                    min: 1,
                    max: 150,
                    step: 1,
                  },
                }}
                {...register("age", { required: true })}
              />
            </FormControl>
            <Button type={"submit"}>Sign up</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default ModalSignUp;
