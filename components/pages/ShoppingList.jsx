import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress, Stack } from "@mui/joy";
import IngredientsCard from "../items/IngredientsCard.jsx";
import { MdOutlineDone } from "react-icons/md";

const ShoppingList = () => {
  const username = useSelector((state) => state.user.username);
  const [loading, setLoading] = useState(false);
  const [shoppingList, setShoppingList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate("/");
      return;
    }

    setLoading(true);

    axios
      .get(`http://localhost:8000/shopping-list/${username}/`)
      .then(({ data }) => {
        console.log(data);
        setLoading(false);
        setShoppingList(data);
      })
      .catch((errors) => {
        console.log(errors);
      });
  }, [navigate, username]);

  const deleteIngredient = () => {};

  const clearShoppingList = () => {};

  return (
    <Stack alignItems="center" justifyContent="center" gap={2} mt={2} mb={4}>
      {loading ? (
        <CircularProgress color="danger" />
      ) : shoppingList?.length === 0 ? (
        "Nothing to buy!"
      ) : (
        <Stack
          direction={"row"}
          useFlexGap
          flexWrap={"wrap"}
          gap={1}
          justifyContent={"center"}
          mt={2}
          sx={{ width: "100%", maxWidth: "var(--max-width-main-content)" }}
          alignItems={"center"}
        >
          {shoppingList.map(
            ({ ingredient_name, quantity, unit_name, icon_link }) => (
              <IngredientsCard
                key={ingredient_name}
                name={ingredient_name}
                quantity={quantity}
                iconUrl={icon_link}
                unit_name={unit_name}
                deleteIngredient={deleteIngredient}
                deleteIcon={<MdOutlineDone style={{ fontSize: "1.5rem" }} />}
              />
            ),
          )}
        </Stack>
      )}
      {shoppingList?.length !== 0 && (
        <Button color={"danger"} onClick={clearShoppingList}>
          Add everything to fridge
        </Button>
      )}
    </Stack>
  );
};

export default ShoppingList;
