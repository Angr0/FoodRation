import React, { useState } from "react";
import { Box, Button, ListItem, Stack } from "@mui/joy";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "./Items/Logo.jsx";
import navigationTexts from "../helper/headerTexts.js";
import { Link } from "react-router-dom";
import ModalLogIn from "./modals/ModalLogIn.jsx";
import ModalSignUp from "./modals/ModalSignUp.jsx";
import MobileMenu from "./Items/MobileMenu.jsx";

const Header = ({ setUsername }) => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openLogInModal, setOpenLogInModal] = useState(false);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);

  return (
    <>
      <Box
        className="container"
        sx={{
          backgroundColor: "#F5F5F5",
          padding: { xs: ".5rem 0 .75rem .5rem", md: ".75rem 1.5rem" },
        }}
      >
        <Box className="content">
          <Logo />

          <Button
            variant="plain"
            color="neutral"
            onClick={() => setOpenMobileMenu(true)}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </Button>
          <Stack
            direction={"row-reverse"}
            gap={2}
            sx={{ display: { xs: "none", md: "flex" } }}
            alignItems={"center"}
          >
            <Link to={"/Adach"}>
              <ListItem>
                <Button variant={"outlined"} color="danger">
                  My account
                </Button>
              </ListItem>
            </Link>
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
                  <Button variant={"plain"} color="danger">
                    {text}
                  </Button>
                </ListItem>
              </Link>
            ))}
          </Stack>
          <MobileMenu
            openMobileMenu={openMobileMenu}
            setOpenMobileMenu={setOpenMobileMenu}
            setOpenLogInModal={setOpenLogInModal}
            setOpenSignUpModal={setOpenSignUpModal}
          />
        </Box>
      </Box>
      <ModalLogIn
        open={openLogInModal}
        setOpen={setOpenLogInModal}
        setUserName={setUsername}
      />
      <ModalSignUp open={openSignUpModal} setOpen={setOpenSignUpModal} />
    </>
  );
};

export default Header;
