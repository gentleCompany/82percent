import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "DIRECTORS - 82PERCENT",
    description: "82PERCENT의 감독들에 대한 정보입니다.",
    keywords: "82%, 82percent, 82퍼센트, 감독, 영상촬영, 광고촬영",
};

export default function DirectorsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 