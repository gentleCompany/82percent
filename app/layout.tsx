import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TopNav from "./components/TopNav";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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

