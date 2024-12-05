import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "CONTACT US - 82PERCENT",
    description: "82PERCENT에 문의하기 위한 페이지입니다.",
    keywords: "82% ,82percent ,82퍼센트, 문의, 연락처, 이메일",
};


export default function ContactUsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 