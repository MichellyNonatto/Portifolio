"use client";

import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import LanguageToggle from "../languageToggle/layout";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useState } from "react";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

const Navbar = () => {
  const isMobile = useMediaQuery("(max-width:780px)");
  const t = useTranslations("Navbar");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleHamburguerClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const NAVBAR = {
    [t("home")]: "/",
    [t("about")]: "/#about",
    [t("projects")]: "/projects",
    [t("skills")]: "/skills",
    [t("contact")]: "#contact",
  };

  return (
    <Box
      className="flex items-center text-center sticky top-0 z-1100 w-full"
      component="nav"
      sx={{
        bgcolor: "background.default",
        justifyContent: "space-between",
        padding: "1rem 2rem",
      }}
    >
      {isMobile ? (
        <>
          <IconButton
            aria-expanded={open ? "true" : undefined}
            onClick={handleHamburguerClick}
            color="primary"
          >
            <MenuOpenIcon sx={{ fontSize: "2rem" }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            {Object.entries(NAVBAR).map(([key, path]) => (
              <MenuItem key={key}>
                <Link href={path} passHref>
                  <Typography variant="body1" color="primary">
                    {key}
                  </Typography>
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </>
      ) : (
        <List className="flex">
          {Object.entries(NAVBAR).map(([key, path]) => (
            <ListItem key={key} disablePadding>
              <ListItemButton sx={{ borderRadius: "10px" }}>
                <Link href={path}>
                  <ListItemText primary={key} className="w-max" />
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
      <LanguageToggle />
    </Box>
  );
};

export default Navbar;
