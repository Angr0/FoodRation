import React from "react";
import {
  Button,
  DialogContent,
  DialogTitle,
  Drawer,
  List,
  ListItem,
  ModalClose,
  Stack,
} from "@mui/joy";
import Logo from "./Logo.jsx";
import navigationTexts from "../../helper/headerTexts.js";
import { Link } from "react-router-dom";

const MobileMenu = ({
  openMobileMenu,
  setOpenMobileMenu,
  setOpenLogInModal,
  setOpenSignUpModal,
}) => {
  const closeModal = () => setOpenMobileMenu(false);

  return (
    <Drawer
      open={openMobileMenu}
      size={"lg"}
      anchor="top"
      onClose={() => setOpenMobileMenu(false)}
    >
      <ModalClose />

      <DialogTitle onClick={closeModal}>
        <Logo />
      </DialogTitle>

      <DialogContent>
        <List>
          <Stack alignItems={"center"}>
            <ListItem>
              <Button
                variant={"outlined"}
                color="danger"
                onClick={() => {
                  setOpenLogInModal(true);
                }}
              >
                Log in
              </Button>
            </ListItem>
            <ListItem>
              <Button
                variant={"soft"}
                color="danger"
                onClick={() => {
                  setOpenSignUpModal(true);
                }}
              >
                Sign up
              </Button>
            </ListItem>
            {navigationTexts.map(({ text, link }) => (
              <Link to={link} key={text}>
                <ListItem>
                  <Button
                    onClick={closeModal}
                    color="neutral"
                    variant={"plain"}
                    size="lg"
                    sx={{ width: "100%" }}
                  >
                    {text}
                  </Button>
                </ListItem>
              </Link>
            ))}
          </Stack>
        </List>
      </DialogContent>
    </Drawer>
  );
};

export default MobileMenu;
