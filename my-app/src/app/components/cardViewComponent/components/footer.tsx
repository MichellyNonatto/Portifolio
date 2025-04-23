import React from "react";
import { Typography } from "@mui/material";

interface FooterProps {
    left: React.ReactNode;
    right?: string;
}

export const Footer: React.FC<FooterProps> = ({ left, right }) => (
    <div className="flex justify-between mt-8">
        <Typography variant="subtitle1" color="text.secondary" className="text-xs">
            {left}
        </Typography>
        {right && (
            <Typography variant="subtitle1" color="text.secondary" className="text-xs">
                {right}
            </Typography>
        )}
    </div>
);