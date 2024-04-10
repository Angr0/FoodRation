import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, List, ListItem, Stack } from "@mui/joy";
import SelectIngredients from "../Items/SelectIngredients.jsx";
import { FaTrashAlt } from "react-icons/fa";

const Profile = () => {
  const [currentIngredient, setCurrentIngredient] = useState();
  const { userNameUrl } = useParams();
  const [userData, setUserData] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/user-data/${userNameUrl}`)
      .then(({ data }) => {
        setUserData(data);
      });
  }, [userNameUrl]);

  return (
    <Stack direction={"row"} justifyContent="center" gap={4} mt={2} mb={4}>
      <Card>
        <Stack direction={"row"} gap={6}>
          <Stack>
            <p>Login: {userData?.login}</p>
            <p>Password: {userData?.password}</p>
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
