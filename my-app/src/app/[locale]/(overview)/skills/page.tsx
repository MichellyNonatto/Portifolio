"use client";
import { Panel } from "@/app/components/panel/Panel";
import { Gauge } from '@mui/x-charts/Gauge';
import { Box, Button, List, Typography } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { CardViewComponent } from "@/app/components/cardViewComponent/CardViewComponent";

import { formatDistanceToNow } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";
import { useState } from "react";

export default function Skills() {
    const translation = useTranslations("Skills");
    const translationPagination = useTranslations("Projects.pagination");
    const locale = useLocale();

    const dictGraphcCard = {
        [translation("graphic.0")]: 65,
        [translation("graphic.1")]: 85,
        [translation("graphic.2")]: 70,
        [translation("graphic.3")]: 65,
        [translation("graphic.4")]: 80,
    };

    interface LearningBodyItem {
        title: string;
        subtitle: string;
    }

    interface LearningItem {
        date: string;
        title: string;
        icon: string;
        body: LearningBodyItem[];
    }

    const rawLearningData: unknown = translation.raw("learning");

    const learningData = Array.isArray(rawLearningData)
        ? rawLearningData
            .filter((item): item is LearningItem =>
                typeof item.date === "string" &&
                typeof item.title === "string" &&
                typeof item.icon === "string" &&
                Array.isArray(item.body) &&
                item.body.every(
                    (bodyItem: LearningBodyItem) =>
                        typeof bodyItem.title === "string" &&
                        typeof bodyItem.subtitle === "string"
                )
            )
            .sort(
                (firstItem, secondItem) =>
                    new Date(secondItem.date).getTime() - new Date(firstItem.date).getTime()
            )
        : [];
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(learningData.length / itemsPerPage);
    const paginatedData = learningData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <Box className="flex flex-col gap-8" component="section" id="skills">
            <Panel image="/panelSkills.jpg" listContact={false}>
                <ul className="w-full p-8 flex flex-col gap-5">
                    {["Hard-Skills", "Soft-Skills", "My Skills", "Soft-Skills", "Hard-Skills"].map((skill, index) => (
                        <li
                            key={index}
                            className={`font-bold text-7xl ${skill === "My Skills" ? "text-purple-900" : "text-purple-400 opacity-70"
                                }`}
                        >
                            {skill}
                        </li>
                    ))}
                </ul>
            </Panel>

            <List className="flex justify-center items-center p-8">
                {dictGraphcCard &&
                    Object.entries(dictGraphcCard).map(([data, value], index) => (
                        <div key={index} className="flex flex-col items-center">
                            <Gauge
                                value={value}
                                startAngle={360}
                                endAngle={0}
                                innerRadius="70%"
                                outerRadius="100%"
                                cornerRadius="50%"
                                className="text-2xl text-semibold"
                            />
                            <Typography
                                variant="h5"
                                className="text-center text-lg mt-4 uppercase font-semibold text-purple-800"
                            >
                                {data}
                            </Typography>
                        </div>
                    ))}
            </List>

            <div className="m-8 flex justify-evenly flex-wrap gap-28">
            {paginatedData.map((learningItem, index) => (
                    <CardViewComponent
                        key={index}
                        header={{
                            title: {
                                text: learningItem.title,
                                size: 24,
                            },
                            subtitle: {
                                text: `${formatDistanceToNow(new Date(learningItem.date), {
                                    addSuffix: true,
                                    locale: locale === "en" ? enUS : ptBR,
                                })}`,
                            },
                            imageLink: learningItem.icon,
                        }}
                    >
                        <ul className="mt-4">
                            {learningItem.body.map((bodyItem, bodyIndex) => (
                                <li key={bodyIndex} className="text-base p-2">
                                    <p className="font-bold">{bodyItem.title}</p>
                                    <p className="text-sm opacity-50 font-medium">{bodyItem.subtitle}</p>
                                </li>
                            ))}
                        </ul>
                    </CardViewComponent>
                ))}
            </div>
            <div className="flex justify-center gap-4 mt-4">
                <Button
                    variant="contained"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    {translationPagination("prev")}
                </Button>
                <Typography variant="body1" className="flex items-center">
                    {translationPagination("page")} {currentPage} {translationPagination("of")} {totalPages}
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    {translationPagination("next")}
                </Button>
            </div>
        </Box>
    );
}