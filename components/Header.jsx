import React, { useState } from "react";
import { Box, Button, ListItem, Stack } from "@mui/joy";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "./Items/Logo.jsx";
import navigationTexts from "../helper/headerTexts.js";
import { Link } from "react-router-dom";
import ModalLogIn from "./modals/ModalLogIn.jsx";
import ModalSignUp from "./modals/ModalSignUp.jsx";
import MobileMenu from "./Items/MobileMenu.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setUsername } from "../redux/userSlice.js";

const Header = ({
  openLogInModal,
  setOpenLogInModal,
  openSignUpModal,
  setOpenSignUpModal,
}) => {
  const dispatch = useDispatch();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const username = useSelector((state) => state.user.username);

  const logOut = () => {
    dispatch(setUsername(""));
  };

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
            gap={{ xs: 0.5, lg: 2 }}
            sx={{ display: { xs: "none", md: "flex" } }}
            alignItems={"center"}
          >
            {!!username ? (
              <>
                <Link to={`/`}>
                  <ListItem>
                    <Button color={"danger"} onClick={logOut}>
                      Log out
                    </Button>
                  </ListItem>
                </Link>
                <Link to={`/${username}`}>
                  <ListItem>
                    <Button variant={"outlined"} color={"danger"}>
                      My account
                    </Button>
                  </ListItem>
                </Link>
              </>
            ) : (
              <>
                <ListItem>
                  <Button
                    variant={"outlined"}
                    color="neutral"
                    onClick={() => {
                      setOpenLogInModal(true);
                    }}
                  >
                    Log in
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    color="danger"
                    onClick={() => {
                      setOpenSignUpModal(true);
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
                        <Button variant={"plain"} color="neutral">
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
                    <Button variant={"plain"} color="neutral">
                      {text}
                    </Button>
                  </ListItem>
                </Link>
              );
            })}
          </Stack>
          <MobileMenu
            openMobileMenu={openMobileMenu}
            setOpenMobileMenu={setOpenMobileMenu}
            setOpenLogInModal={setOpenLogInModal}
            setOpenSignUpModal={setOpenSignUpModal}
            logOut={logOut}
          />
        </Box>
      </Box>
      <ModalLogIn open={openLogInModal} setOpen={setOpenLogInModal} />
      <ModalSignUp open={openSignUpModal} setOpen={setOpenSignUpModal} />
    </>
  );
};

export default Header;
