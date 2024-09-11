import React from "react";
import Box from "@mui/material/Box";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

interface PanelProps {
  image: string;
  children?: React.ReactNode;
}

export const Panel: React.FC<PanelProps> = ({ image, children }) => {
  return (
    <Box
      className="w-full h-auto p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
      component="section"
    >
      <Box className="flex w-full h-full justify-center items-center">
        {children}
        <ul className="flex flex-col gap-4 p-4 justify-center h-full text-white">
          <li>
            <a
              href="mailto:michellynoanto15@gmail.com?subject=Contact%20via%20Professional%20Portfolio"
              target="_blank"
            >
              <EmailIcon />
            </a>
          </li>
          <li>
            <a href="#">
              <LinkedInIcon />
            </a>
          </li>
          <li>
            <a href="https://github.com/MichellyNonatto">
              <GitHubIcon />
            </a>
          </li>
        </ul>
      </Box>
    </Box>
  );
};
