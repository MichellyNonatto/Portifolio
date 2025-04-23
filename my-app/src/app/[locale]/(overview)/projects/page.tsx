"use client";

import { useState } from "react";
import { Box, Skeleton, Typography, Button } from "@mui/material";
import { Panel } from "@/app/components/panel/Panel";
import { useGitHubAPI } from "@/app/components/hooks/useGitHubAPI";
import { CardViewComponent } from "@/app/components/cardViewComponent/CardViewComponent";
import { LanguageBadge } from "@/app/components/cardViewComponent/components/LanguageBadge";
import langColors from "@/app/lib/github-lang-colors";
import { formatDistanceToNow } from "date-fns";
import { enUS, ptBR } from "date-fns/locale";
import { useTranslations, useLocale } from "next-intl";
import { ForkRight, Link } from "@mui/icons-material";
import { Repository } from "@/services/request";

const getLanguageColor = (language: string): string => {
    return langColors[language] || "#FFA500";
};

export default function Projects() {
    const { repositories, error, loading } = useGitHubAPI();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedRepositories = repositories.slice(startIndex, endIndex);

    const translation = useTranslations("Projects");
    const locale = useLocale();

    return (
        <Box className="flex flex-col gap-8" component="section" id="projects">
            <Panel image="/panelProjects.jpg" listContact={false}>
                <div className="h-96" />
            </Panel>
            {loading ? (
                <Box className="flex m-8 justify-evenly flex-wrap gap-28">
                    {Array.from({ length: itemsPerPage }).map((_, index) => (
                        <div key={index}>
                            <Skeleton variant="text" className="w-80 rounded-md" height={32} />
                            <Skeleton variant="rectangular" className="w-80 h-80 rounded-md" width={320} height={250} />
                        </div>
                    ))}
                </Box>
            ) : error ? (
                <p className="text-red-600 font-semibold">{error}</p>
            ) : (
                <div>
                    <div className="flex m-8 justify-evenly flex-wrap gap-28">
                        {paginatedRepositories.map((data: Repository) => (
                            <div className="w-80 h-80" key={data.id}>
                                <CardViewComponent
                                    color="purple100"
                                    header={{
                                        title: { text: data.name, size: 24 },
                                        subtitle: { text: data.license?.name ?? translation("notLicense"), top: 16 },
                                        listIconsURL: {
                                            ...(data.html_url && { [data.html_url]: <Link className="text-2xl" /> }),
                                            Forks: (
                                                <div className="flex items-center gap-1">
                                                    <ForkRight fontSize="small" color="action" />
                                                    <span>{data.forks || "0"}</span>
                                                </div>
                                            ),
                                        },
                                    }}
                                    footer={{
                                        left: (
                                            <div className="flex flex-wrap gap-2">
                                                {data.language ? (
                                                    <LanguageBadge
                                                        language={data.language}
                                                        color={getLanguageColor(data.language)}
                                                    />
                                                ) : (
                                                    <p>N/A</p>
                                                )}
                                            </div>
                                        ),
                                        right: `${translation("update")} ${formatDistanceToNow(new Date(data.updated_at), {
                                            addSuffix: true,
                                            locale: locale === "en" ? enUS : ptBR,
                                        })}`,
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{
                                            display: "-webkit-box",
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            WebkitLineClamp: 3,
                                        }}
                                    >
                                        {data.description || translation("notDescription")}
                                    </Typography>
                                </CardViewComponent>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                        <Button
                            variant="contained"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            {translation("pagination.prev")}
                        </Button>
                        <Typography variant="body1" className="flex items-center">
                            Página {currentPage} de {Math.ceil(repositories.length / itemsPerPage)}
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setCurrentPage((prev) =>
                                    Math.min(prev + 1, Math.ceil(repositories.length / itemsPerPage))
                                );
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            disabled={currentPage === Math.ceil(repositories.length / itemsPerPage)}
                        >
                            {translation("pagination.next")}
                        </Button>
                    </div>
                </div>
            )}
        </Box>
    );
}