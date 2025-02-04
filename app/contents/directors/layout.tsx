import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "DIRECTORS - 82PERCENT, 82퍼센트",
    description: "82퍼센트의 감독님들을 소개합니다",
    keywords: "82%, 82percent, 82퍼센트, 감독, 영상촬영, 광고촬영",
};

export default function DirectorsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 