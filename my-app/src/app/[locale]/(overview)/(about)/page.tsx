import { CardPrimary } from "@/app/components/cardPrimary/layout";
import { Box } from "@mui/material";
import { useTranslations } from "next-intl";
import Avatar from "../../../../../public/avatarAbout.jpg";

export default function About() {
  const translation = useTranslations("About");

  return (
    <Box
      className="flex m-8 justify-evenly flex-wrap gap-28"
      component="section"
      id="about"
    >
      <CardPrimary
        title={translation("0.title")}
        subtitle={translation("0.subtitle")}
        image={{
          src: Avatar,
          alt: translation("0.alt"),
        }}
      >
        <a href="https://github.com/MichellyNonatto">{translation("0.username")}</a>
        {translation("0.body")}
      </CardPrimary>

      <CardPrimary title={translation("1.title")} subtitle={translation("1.subtitle")}>
        {translation("1.username")}
        {translation("1.body")}
      </CardPrimary>

      <CardPrimary title={translation("2.title")} subtitle="">
        {translation("2.body")}
      </CardPrimary>

      <CardPrimary title={translation("3.title")} subtitle="">
        <ul className="flex flex-col gap-4">
          <li className="flex flex-col gap-1">
            <b>{translation("3.items.0.title")}</b>
            <span> {translation("3.items.0.subtitle")} </span>
            {translation("3.items.0.body")}
          </li>
          <li className="flex flex-col gap-1">
            <b>{translation("3.items.1.title")}</b>
            <span>{translation("3.items.1.subtitle")} </span>
            {translation("3.items.1.body")}
          </li>
        </ul>
      </CardPrimary>
    </Box>
  );
}
