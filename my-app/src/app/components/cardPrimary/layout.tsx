"use client";

import * as React from "react";
import Image, { StaticImageData } from "next/image";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { purple } from "@mui/material/colors";

interface CardPrimaryProps {
  image?: {
    src: StaticImageData;
    alt: string;
  };
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export const CardPrimary: React.FC<CardPrimaryProps> = ({
  image,
  title,
  subtitle,
  children,
}) => {
  return (
    <Paper
      elevation={2}
      className="p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-justify " 
      sx={{ bgcolor: purple[50], borderRadius: "1rem", color: "black", maxWidth: '31.5rem' }}
    >
      <Box component="div" className={image ? "" : "col-span-2"}>
        <Typography
          variant="h4"
          sx={{
            textTransform: "uppercase",
            fontWeight: "500",
            color: "primary.main",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "500",
          }}
        >
          {subtitle}
        </Typography>
        <div>
          <Typography variant="body2" fontSize="small" className="flex flex-col gap-2" component='div'>
            {children}
          </Typography>
        </div>
      </Box>
      
      {image && (
        <div className="flex items-center justify-center">
          <Image
            src={image.src}
            layout="intrinsic" // Considere se outro layout é mais apropriado
            alt={image.alt}
            className="w-full h-auto"
          />
        </div>
      )}
    </Paper>
  );
};
