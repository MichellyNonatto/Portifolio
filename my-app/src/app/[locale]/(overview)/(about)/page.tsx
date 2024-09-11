import { CardPrimary } from "@/app/components/cardPrimary/layout";
import { Box } from "@mui/material";
import { useTranslations } from "next-intl";
import Avatar from "../../../../../public/avatarAbout.jpg";

export default function About() {
  const t = useTranslations("About");

  return (
    <Box
      className="flex m-8 justify-evenly flex-wrap gap-28"
      component="section"
    >
      <CardPrimary
        title={t("0.title")}
        subtitle={t("0.subtitle")}
        image={{
          src: Avatar,
          alt: t("0.alt"),
        }}
      >
        <a href="https://github.com/MichellyNonatto">{t("0.username")}</a>
        {t("0.body")}
      </CardPrimary>

      <CardPrimary title={t("1.title")} subtitle={t("1.subtitle")}>
        {t("1.username")}
        {t("1.body")}
      </CardPrimary>

      <CardPrimary title={t("2.title")} subtitle="">
        {t("2.body")}
      </CardPrimary>

      <CardPrimary title={t("3.title")} subtitle="">
        <ul className="flex flex-col gap-4">
          <li className="flex flex-col gap-1">
            <b>{t("3.items.0.title")}</b>
            <span> {t("3.items.0.subtitle")} </span>
            {t("3.items.0.body")}
          </li>
          <li className="flex flex-col gap-1">
            <b>{t("3.items.1.title")}</b>
            <span>{t("3.items.1.subtitle")} </span>
            {t("3.items.1.body")}
          </li>
        </ul>
      </CardPrimary>
    </Box>
  );
}
