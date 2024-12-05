import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "ABOUT US - 82PERCENT",
    description: "82PERCENT에 대한 정보입니다.",
    keywords: "82퍼센트, 82PERCENT, 프로덕션, 영상촬영, 광고촬영",
};


export default function AboutUsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 