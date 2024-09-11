"use client";

import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, usePathname } from "@/i18n/routing";
import { IconButton } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";

const LanguageToggle = () => {
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="delete"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "primary.main" }}
      >
        <TranslateIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Link href={pathname} locale="en" className="text-black">
          <MenuItem onClick={handleClose}>English</MenuItem>
        </Link>
        <Link href={pathname} locale="pt" className="text-black">
          <MenuItem onClick={handleClose}>Português (Brasil)</MenuItem>
        </Link>
      </Menu>
    </div>
  );
};

export default LanguageToggle;
