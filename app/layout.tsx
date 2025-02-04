import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TopNav from "./components/TopNav";
import Head from 'next/head';



const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});


export const metadata: Metadata = {
  title: "82PERCENT, 82퍼센트",
  description: "광고영상, 룩북, 해외촬영 프리미엄 프로덕션. 파리 감성을 바탕으로 한 창의적인 영상 제작으로, 브랜드의 스토리를 예술적 감각과 전문성으로 재탄생시킵니다.",
  icons: {
    icon: "/82LogoBlack.png",
  },
  keywords:
    "82퍼센트, 82PERCENT, 82%, 82PERCENT 프로덕션, 프로덕션 파리, 영상촬영, 광고촬영, 영상제작, 광고제작, 룩북 ",
  verification: {
    google: "EWsYle2I8UdlOChULQ6zw162x32tw3nYz1tRfLkxeao",
    other: {
      "naver-site-verification": "e6f4c11cc8c2004a38fe32dfe0c4d96fa51d27d7",
    },
  },
  openGraph: {
    siteName: "82퍼센트",
    title: "82PERCENT",
    description: "광고영상, 룩북, 해외촬영 프리미엄 프로덕션. 파리 감성을 바탕으로 한 창의적인 영상 제작으로, 브랜드의 스토리를 예술적 감각과 전문성으로 재탄생시킵니다.",
    url: "https://wwww.82percent.kr",
    type: "website",
    images: {
      url: "https://www.82percent.kr/kakaoOgDELA.png",
      alt: "82PERCENT",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "82PERCENT",
    description: "광고영상, 룩북, 해외촬영 프리미엄 프로덕션. 파리 감성을 바탕으로 한 창의적인 영상 제작으로, 브랜드의 스토리를 예술적 감각과 전문성으로 재탄생시킵니다.",
    images: ["https://www.82percent.kr/kakaoOgDELA.png"],
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta

          httpEquiv="Content-Security-Policy"
          content="
            default-src 'self';
            script-src 'self' https://f.vimeocdn.com https://player.vimeo.com 'unsafe-inline';
            style-src 'self' 'unsafe-inline';
            img-src 'self' https://i.vimeocdn.com;
            connect-src 'self' https://f.vimeocdn.com;
            frame-src https://player.vimeo.com;
            font-src 'self';
          "
        />
      </Head>
      <body
        className={`w-full relative overflow-x-hidden ${pretendard.variable} font-pretendard antialiased bg-black text-white text-2xl`}
      >
        <TopNav />

        <main className=" break-keep">

          {children}
        </main>
        <footer className="text-center mt-10 p-5 bg-black text-xs">
          <p>&copy; 2024 82PERCENT. All Rights Reserved.</p>
        </footer>
      </body>
    </html>
  );
}


