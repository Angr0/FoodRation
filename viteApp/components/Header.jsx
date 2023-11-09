import React, { useState } from "react";
import style from "../styles/Header.module.scss";
import {
  Button,
  DialogContent,
  DialogTitle,
  Drawer,
  List,
  ListItem,
  ModalClose,
} from "@mui/joy";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigationTexts = [
    {
      text: "Log in",
      link: "",
    },
    {
      text: "Sing up",
      link: "",
    },
    {
      text: "My fridge",
      link: "",
    },
    {
      text: "Cooking history",
      link: "",
    },
    {
      text: "Shopping list",
      link: "",
    },
    {
      text: "Calculator",
      link: "",
    },
  ];
  return (
    <div className={style.container}>
      <img src="logo.png" alt="Logo" />

      <Button variant="plain" color="neutral" onClick={() => setOpen(true)}>
        <MenuIcon />
      </Button>
      <Drawer open={open} anchor="top" onClose={() => setOpen(false)}>
        <ModalClose />

        <DialogTitle>
          <img src="logo.png" alt="Logo" />
        </DialogTitle>
        <DialogContent>
          <List>
            {navigationTexts.map(({ text }) => (
              <ListItem key={text}>
                <Button>{text}</Button>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Drawer>
    </div>
  );
};

export default Header;
