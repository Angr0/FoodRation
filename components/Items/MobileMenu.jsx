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
import { useSelector } from "react-redux";

const MobileMenu = ({
  openMobileMenu,
  setOpenMobileMenu,
  setOpenLogInModal,
  setOpenSignUpModal,
  logOut,
}) => {
  const closeModal = () => setOpenMobileMenu(false);
  const username = useSelector((state) => state.user.username);

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
            {!!username ? (
              <>
                <Link to={`/`}>
                  <ListItem>
                    <Button
                      onClick={() => {
                        logOut();
                        closeModal();
                      }}
                    >
                      Log out
                    </Button>
                  </ListItem>
                </Link>
                <Link to={`/${username}`}>
                  <ListItem>
                    <Button variant={"outlined"} onClick={closeModal}>
                      My account
                    </Button>
                  </ListItem>
                </Link>
              </>
            ) : (
              <>
                <ListItem>
                  <Button
                    color={"neutral"}
                    variant={"outlined"}
                    onClick={() => {
                      setOpenLogInModal(true);
                      closeModal();
                    }}
                  >
                    Log in
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    color="danger"
                    variant="solid"
                    onClick={() => {
                      setOpenSignUpModal(true);
                      closeModal();
                    }}
                  >
                    Sign up
                  </Button>
                </ListItem>
              </>
            )}

            {navigationTexts.map(({ text, link, needsToBeLoggedIn }) => {
              if (needsToBeLoggedIn) {
                if (!!username)
                  return (
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
                  );
                return;
              }
              return (
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
              );
            })}
          </Stack>
        </List>
      </DialogContent>
    </Drawer>
  );
};

export default MobileMenu;
