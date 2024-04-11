import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, List, ListItem, Stack } from "@mui/joy";
import SelectIngredients from "../Items/SelectIngredients.jsx";
import { FaTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

const Profile = () => {
  const username = useSelector((state) => state.user.username);
  const [currentIngredient, setCurrentIngredient] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/user-data/${username}`)
      .then(({ data }) => {
        setUserData(data);
      });
  }, [username]);

  return (
    <Stack direction={"row"} justifyContent="center" gap={4} mt={2} mb={4}>
      <Card>
        <Stack direction={"row"} gap={6}>
          <Stack>
            <p>Login: {userData?.login}</p>
            <p>Sex: {userData?.is_male ? "male" : "female"}</p>
          </Stack>
          <List>
            <Stack gap={1}>
              <SelectIngredients setCurrentIngredient={setCurrentIngredient} />
              Excluded ingredients:
              {userData?.excluded_ingredients?.map((ingredient) => (
                <ListItem key={ingredient}>
                  {ingredient} <FaTrashAlt />
                </ListItem>
              ))}
            </Stack>
          </List>
        </Stack>
      </Card>
    </Stack>
  );
};

export default Profile;
