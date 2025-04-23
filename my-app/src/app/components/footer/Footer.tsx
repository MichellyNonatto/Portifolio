import { Box, Typography } from "@mui/material";
import Navbar from "../navbar/Navbar";
import { useLocale } from "next-intl";

export const Footer = () => {
    const locale = useLocale();

    const formattedDate = new Intl.DateTimeFormat(locale, {
        month: "long",
        year: "numeric",
    }).format(new Date());

    return (
        <Box className="flex bg-purple-100 w-full px-4 py-2">
            <Typography variant="body2" className="w-1/2 text-center m-auto">
                Create by Michelly <strong>{formattedDate}</strong>.
            </Typography>
            <Box className="w-1/2">
                <Navbar className="bg-transparent" />
            </Box>
        </Box>
    );
};
