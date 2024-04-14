import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  List,
  ListItem,
  Stack,
  Button,
  Input,
  FormLabel,
  FormControl,
  Divider,
  Option,
  Select,
} from "@mui/joy";
import { FaTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import BioChangeInput from "../Items/BioChangeInput.jsx";
import { useForm } from "react-hook-form";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const username = useSelector((state) => state.user.username);
  const { register, setValue, handleSubmit } = useForm();
  const [userData, setUserData] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [excludedIngredients, setExcludedIngredients] = useState();
  const navigate = useNavigate();

  const openSnackbar = () => {
    setSnackbarOpen(true);
  };

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const getExcludedIngredients = () => {
    axios
      .get(`http://localhost:8000/without-excluded/${username}/`)
      .then(({ data }) => {
        setExcludedIngredients(data);
      })
      .catch((errors) => {
        console.log(errors);
      });

    getUserData();
  };

  const getUserData = () => {
    axios
      .get(`http://localhost:8000/user-data/${username}/`)
      .then(({ data }) => {
        setUserData(data);
      });
  };

  useEffect(() => {
    if (!username) {
      navigate("/");
      return;
    }

    getExcludedIngredients();
    getUserData();

    axios
      .get(`http://localhost:8000/bio-calc/${username}/`)
      .then(({ data: { weight, height, age } }) => {
        setValue("height", height);
        setValue("weight", weight);
        setValue("age", age);
      });
  }, [username, setValue, navigate]);

  const saveBio = ({ age, height, weight }) => {
    axios
      .put(`http://localhost:8000/bio-calc/${username}/`, {
        weight: weight,
        age: age,
        height: height,
      })
      .then((r) => {
        console.log(r);

        axios
          .get(`http://localhost:8000/bio-calc/${username}/`)
          .then(({ data: { weight, height, age } }) => {
            setValue("height", height);
            setValue("weight", weight);
            setValue("age", age);
            openSnackbar();
          });
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  const changePassword = ({ password, newPassword }) => {
    if (password === newPassword) {
      setErrorMessage("");
      axios
        .put(`http://localhost:8000/change-password/${username}/`, {
          password: password,
        })
        .then((r) => {
          console.log(r);
          setValue("password", "");
          setValue("newPassword", "");
          openSnackbar();
        })
        .catch((errors) => {
          console.log(errors);
        });
    } else setErrorMessage("Password must match!");
  };

  const addExcludedIngredient = (name) => {
    console.log(name);

    axios
      .put(`http://localhost:8000/user-data/${username}/`, { name: name })
      .then((r) => {
        console.log(r);

        getExcludedIngredients();
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  const removeExcludedIngredient = (name) => {
    console.log(name);

    axios
      .delete(`http://localhost:8000/user-data/${username}/`, {
        data: { name: name },
      })
      .then((r) => {
        console.log(r);

        getExcludedIngredients();
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  return (
    <Stack direction={"row"} justifyContent="center" gap={4} mt={2} mb={4}>
      <Card color={"neutral"} variant={"solid"}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent={"center"}
          gap={{ xs: 2, md: 6 }}
          width={"100%"}
        >
          <Stack gap={1}>
            <p>Login: {userData?.login}</p>
            <p>Sex: {userData?.is_male ? "male" : "female"}</p>
          </Stack>
          <Divider color={"primary"} />
          <form onSubmit={handleSubmit(saveBio)}>
            <Stack justifyContent={"space-between"} gap={1}>
              <BioChangeInput label={"Height"} register={register} />
              <BioChangeInput label={"Weight"} register={register} />
              <BioChangeInput label={"Age"} register={register} />
              <Button color={"danger"} type={"submit"}>
                Save
              </Button>
            </Stack>
          </form>
          <Divider />
          <form onSubmit={handleSubmit(changePassword)}>
            <Stack gap={1}>
              <FormControl>
                <FormLabel>New password</FormLabel>
                <Input required type={"password"} {...register("password")} />
              </FormControl>
              <FormControl>
                <FormLabel>Repeat new password</FormLabel>
                <Input
                  required
                  type={"password"}
                  {...register("newPassword")}
                />
              </FormControl>
              <Button color={"danger"} type={"submit"}>
                Save
              </Button>
              <span style={{ color: "lightcoral" }}>{errorMessage}</span>
            </Stack>
          </form>
        </Stack>
        <List>
          <Stack gap={1} alignItems={"center"}>
            Excluded ingredients:
            <Select
              color={"danger"}
              placeholder="Ingredients"
              sx={{ minWidth: "12rem", maxWidth: "24rem" }}
            >
              {excludedIngredients?.map((name, index) => (
                <Option
                  key={name}
                  value={index}
                  onClick={() => {
                    addExcludedIngredient(name);
                  }}
                >
                  {name}
                </Option>
              ))}
            </Select>
            {userData?.excluded_ingredients.length === 0
              ? "You eat everything!"
              : userData?.excluded_ingredients?.map((ingredient) => (
                  <ListItem key={ingredient}>
                    {ingredient}{" "}
                    <FaTrashAlt
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        removeExcludedIngredient(ingredient);
                      }}
                    />
                  </ListItem>
                ))}
          </Stack>
        </List>
      </Card>

      <Snackbar
        color={"primary"}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={closeSnackbar}
      >
        <Alert
          onClose={closeSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Saved successfully!
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Profile;
