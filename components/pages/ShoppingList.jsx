import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress, Stack } from "@mui/joy";
import IngredientsCard from "../items/IngredientsCard.jsx";
import { MdOutlineDone } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

const ShoppingList = () => {
  const username = useSelector((state) => state.user.username);
  const [loading, setLoading] = useState(false);
  const [shoppingList, setShoppingList] = useState([]);
  const navigate = useNavigate();

  const getIngredients = useCallback(() => {
    axios
      .get(`http://localhost:8000/shopping-list/${username}/`)
      .then(({ data }) => {
        setLoading(false);
        setShoppingList(data);
      })
      .catch((errors) => {
        console.log(errors);
      });
  }, [username]);

  useEffect(() => {
    if (!username) {
      navigate("/");
      return;
    }

    setLoading(true);
    getIngredients();
  }, [getIngredients, navigate, username]);

  const deleteIngredient = (name) => {
    console.log([name]);
    axios
      .delete(`http://localhost:8000/remove-shopping-element/${username}/`, {
        data: [name],
      })
      .then((r) => {
        console.log(r);

        getIngredients();
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  const clearShoppingList = () => {
    axios
      .delete(`http://localhost:8000/shopping-list/${username}/`)
      .then((r) => {
        console.log(r);
        getIngredients();
      });
  };

  const addIngredientToFridge = (name) => {
    axios
      .delete(`http://localhost:8000/tick-ingredient/${username}/`, {
        data: [name],
      })
      .then((r) => {
        console.log(r);
        getIngredients();
      });
  };

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
                buttons={
                  <>
                    <Button
                      color={"danger"}
                      variant={"plain"}
                      onClick={() => addIngredientToFridge(ingredient_name)}
                    >
                      <MdOutlineDone style={{ fontSize: "1.5rem" }} />
                    </Button>
                    <Button
                      onClick={() => deleteIngredient(ingredient_name)}
                      color={"danger"}
                      variant={"plain"}
                    >
                      <FaTrashAlt />
                    </Button>
                  </>
                }
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
