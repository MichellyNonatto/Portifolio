"use client";

import React from "react";
import { Paper, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import Image from "next/image";
import { Footer } from "./components/footer";

interface CardViewComponentProps {
    header: {
        title: {
            text: string;
            size?: number;
        };
        subtitle?: {
            text: string;
            auxiliaryText?: string;
            top?: number;
        };
        listIconsURL?: Record<string, React.ReactNode>;
        imageLink?: string;
    };
    children: React.ReactNode;
    footer?: {
        left: React.ReactNode;
        right?: string;
    };
    color?: "purple50" | "purple100" | "paper";
}

export const CardViewComponent: React.FC<CardViewComponentProps> = ({
    header,
    children,
    footer,
    color = "paper",
}) => {
    const backgroundColor =
        color === "purple50"
            ? purple[50]
            : color === "purple100"
                ? purple[100]
                : "background.paper";

    return (
        <Paper
            elevation={5}
            className="p-12 min-w-80 max-w-96 rounded-lg shadow-current"
            sx={{
                bgcolor: backgroundColor,
                borderRadius: "1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <div id="header" className="flex gap-2 items-center">
                {header.imageLink && (
                    <div style={{ maxWidth: "3rem", maxHeight: "3rem" }}>
                        <Image
                            width={64}
                            height={64}
                            src={header.imageLink}
                            alt={header.title.text || "Image"}
                            style={{ width: "4rem", height: "auto" }}
                        />
                    </div>
                )}
                <div className="w-full">
                    <div className="flex items-center gap-4 justify-between">

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: "500",
                                fontSize: `${header.title.size || 32}px`,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                flex: 1,
                                maxWidth:"100%",
                                width:"100%"
                                
                            }}
                        >
                            {header.title.text}
                        </Typography>

                        {header.listIconsURL && (
                            <div className="flex items-center gap-2">
                                {Object.entries(header.listIconsURL).map(([url, icon]) => (
                                    <a
                                        key={url}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: `${header.title.size || 32}px`,
                                            height: `${header.title.size || 32}px`,
                                        }}
                                    >
                                        {icon}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                    {header.subtitle && (
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            sx={{ 
                                marginTop: `${header.subtitle.top || 16}px` 
                            }}
                        >
                            {header.subtitle.text}
                        </Typography>
                    )}
                </div>
            </div>
            <div id="description">{children}</div>
            {footer && <Footer left={footer.left} right={footer.right} />}
        </Paper>
    );
};