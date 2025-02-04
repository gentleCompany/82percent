import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "CONTACT US - 82PERCENT, 82퍼센트",
    description: "82퍼센트에 문의하세요. 파리의 감성과 독창적인 아이디어로 뛰어난 영상 콘텐츠를 제작해 브랜드의 가치를 극대화합니다.",
    keywords: "82% ,82percent ,82퍼센트, 문의, 연락처, 이메일, 영상촬영, 광고촬영, 영상제작, 광고제작, 룩북, 파리, 브랜드, 마케팅",
};


export default function ContactUsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 