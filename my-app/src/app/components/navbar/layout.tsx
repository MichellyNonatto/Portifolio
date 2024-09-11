import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import LanguageToggle from "../languageToggle/layout";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const Navbar = () => {
  const t = useTranslations("Navbar");

  const NAVBAR = {
    [t("home")]: "/",
    [t("about")]: "/#about",
    [t("projects")]: "/projects",
    [t("skills")]: "/skills",
    [t("contact")]: "#contact",
  };


  return (
    <Box
      className="flex items-center justify-between text-center p-2 sticky top-0 z-1100 w-full"
      component="nav"
      sx={{ bgcolor: "background.default" }}
    >
      <List className="flex">
        {Object.entries(NAVBAR).map(([key, path]) => (
          <ListItem key={key} disablePadding>
            <ListItemButton sx={{ borderRadius: "10px" }}>
              <Link href={path}>
                <ListItemText primary={key} className="w-max"/>
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <LanguageToggle />
    </Box>
  );
};

export default Navbar;
