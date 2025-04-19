import React from "react";
import { Typography } from "@mui/material";

interface LanguageBadgeProps {
    language: string;
    color: string;
}

export const LanguageBadge: React.FC<LanguageBadgeProps> = ({ language, color }) => (
    <div className="flex items-center gap-1">
        <span
            style={{
                backgroundColor: color,
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                display: "inline-block",
            }}
        ></span>
        <Typography variant="body2" color="text.secondary" className="text-xs">
            {language}
        </Typography>
    </div>
);