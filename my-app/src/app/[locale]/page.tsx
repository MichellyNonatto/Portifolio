import PanelHome from "../../../public/panelBackground.jpg";
import PanelAvatar from "../../../public/avatarPanel.svg";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Panel } from "../components/panel/layout";
import { Box, Typography } from "@mui/material";
import About from "./(overview)/(about)/page";

export default function HomePage() {
  const t = useTranslations("Home");
  return (
    <>
      <Panel image={PanelHome.src}>
        <Box
          component="section"
          className="bg-[rgba(71,10,46,0.8)] text-white p-4 gap-4 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="uppercase text-center md:text-left max-w-80">
            <Typography
              variant="h2"
              className="font-semibold leading-tight text-xl md:text-3xl"
              component="h1"
            >
              {t("title")}
            </Typography>
            <Typography
              variant="subtitle1"
              className="font-medium text-base md:text-lg mt-2"
              style={{ color: "#FFDAD4" }}
              component="h3"
            >
              {t("subtitle")}
            </Typography>
          </div>
          <Image
            src={PanelAvatar}
            layout="responsive" 
            width={200}   
            height={200}     
            objectFit="contain"
            alt={t("alt")}
            className="mt-4 md:mt-0 max-w-[400px] md:max-w-[400px]"
          />
        </Box>
      </Panel>

      <About />
    </>
  );
}
