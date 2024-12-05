import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TopNav from "./components/TopNav";



const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});


export const metadata: Metadata = {
  title: "82PERCENT",
  description: "82PERCENT",
  icons: {
    icon: "/82LogoBlack.png",
  },
  keywords:
    "82퍼센트, 82PERCENT, 82%, 82PERCENT 프로덕션, 프로덕션 파리, 영상촬영, 광고촬영, 영상제작, 광고제작, 룩북 ",
  // verification: {
  //   google: "TwtmCjbukflLL-LXH4tZB9YA6OSl4lcHxuWGlexQxFk",
  //   other: {
  //     "naver-site-verification": "1e7c68922bdc16c449660f5dfe99ce75da46ccbf",
  //   },
  // },
  openGraph: {
    title: "82PERCENT",
    description: "82PERCENT",
    url: "https://wwww.82percent.kr",
    type: "website",
    // images: {
    //   url: "https://www.guri-kica.com/assets/og-image.png",
    //   alt: "구리지식산업센터연합회로고",
    // },
  },
  twitter: {
    card: "summary_large_image",
    title: "82PERCENT",
    description: "82PERCENT",
    // images: ["https://www.guri-kica.com/assets/og-image.png"],
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
      <body
        className={`w-full relative overflow-x-hidden ${pretendard.variable} font-pretendard antialiased bg-black text-white text-2xl`}
      >
        <TopNav />

        <main className=" break-keep">

          {children}
        </main>
      </body>
    </html>
  );
}


