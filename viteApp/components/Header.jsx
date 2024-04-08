import React, { useState } from "react";
import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Drawer,
  List,
  ListItem,
  ModalClose,
  Stack,
} from "@mui/joy";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "./Items/Logo.jsx";
import navigationTexts from "../helper/headerTexts.js";
import { Link } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);

  const getVariant = (text) => {
    switch (text) {
      case "Log in":
        return "outlined";
      case "Sign up":
        return "soft";
      default:
        return "plain";
    }
  };

  const closeModal = () => setOpen(false);

  return (
    <Box
      className="container"
      sx={{
        backgroundColor: "#F5F5F5",
        padding: { xs: "6px 0 6px 12px", md: "12px" },
      }}
    >
      <Box className="content">
        <Logo />

        <Button
          variant="plain"
          color="neutral"
          onClick={() => setOpen(true)}
          sx={{ display: { md: "none" } }}
        >
          <MenuIcon />
        </Button>
        <Stack
          direction={"row-reverse"}
          gap={2}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          {navigationTexts.map(({ text, link }) => (
            <Link to={link} key={text}>
              <ListItem>
                <Button
                  sx={{ borderWidth: text === "Log in" ? ".25rem" : "" }}
                  variant={getVariant(text)}
                  color="danger"
                >
                  {text}
                </Button>
              </ListItem>
            </Link>
          ))}
        </Stack>
        <Drawer open={open} anchor="top" onClose={() => setOpen(false)}>
          <ModalClose />

          <DialogTitle>
            <Logo />
          </DialogTitle>

          <DialogContent>
            <List>
              <Stack>
                {navigationTexts.map(({ text, link }) => (
                  <Link to={link} key={text}>
                    <ListItem key={text}>
                      <Button
                        onClick={closeModal}
                        color="neutral"
                        variant={
                          text === "Log in"
                            ? "outlined"
                            : text === "Sign up"
                            ? "solid"
                            : "plain"
                        }
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
      </Box>
    </Box>
  );
};

export default Header;
