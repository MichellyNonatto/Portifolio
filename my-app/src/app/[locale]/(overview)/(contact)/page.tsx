import { FormsPresentation } from "@/app/components/forms/layout";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Email from "@public/emailSend.svg";
import { useTranslations } from "next-intl";
import { Footer } from "@/app/components/footer/layout";

export default function Contact() {
  const translation = useTranslations("Contact");

  return (
    <Box className="flex flex-col gap-8" component="section" id="contact">
      <div className="flex flex-col md:flex-row m-8 justify-between gap-8">
        <div className="w-full md:w-1/2">
          <FormsPresentation />
        </div>
        <div className="w-1/2 hidden md:flex flex-col gap-8 items-center justify-center border-l-4 border-l-purple-800 pr-4">
          <Typography
            variant="h4"
            sx={{
              textTransform: "uppercase",
              fontWeight: "500",
              color: "primary.main",
            }}
          >
            {translation("title")}
          </Typography>
          <Image
            src={Email}
            layout="intrinsic"
            alt={translation("alt")}
            className="w-auto h-auto"
          />
        </div>
      </div>
      <Footer />
    </Box>
  );
}