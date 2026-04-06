import type { StaticImageData } from "next/image";

import logo01 from "./logo-01.png";
import logo02 from "./logo-02.png";
import logo03 from "./logo-03.png";
import logo04 from "./logo-04.png";
import logo05 from "./logo-05.png";
import logo06 from "./logo-06.png";
import logo07 from "./logo-07.png";
import logo08 from "./logo-08.png";
import logo09 from "./logo-09.png";
import logo10 from "./logo-10.png";
import logo11 from "./logo-11.png";
import logo12 from "./logo-12.png";
import logo13 from "./logo-13.png";
import logo14 from "./logo-14.png";
import logo15 from "./logo-15.png";
import logo16 from "./logo-16.png";
import logo17 from "./logo-17.png";
import logo18 from "./logo-18.png";
import logo19 from "./logo-19.png";
import logo20 from "./logo-20.png";
import logo21 from "./logo-21.png";
import logo22 from "./logo-22.png";
import logo23 from "./logo-23.png";

type LogoAsset = {
  alt: string;
  src: StaticImageData;
  imageClassName?: string;
};

const logos: LogoAsset[] = [
  { src: logo01, alt: "Partner logo 01" , imageClassName: "!max-h-[1.3rem] md:!max-h-[1.8rem]" },
  { src: logo02, alt: "Partner logo 02" , imageClassName: "!max-h-[1.6rem] md:!max-h-[2.3rem]" },
  { src: logo03, alt: "Partner logo 03" , imageClassName: "!max-h-[1.6rem] md:!max-h-[2.2rem]" },
  { src: logo04, alt: "Partner logo 04" , imageClassName: "!max-h-[1.9rem] md:!max-h-[2.5rem]" },
  { src: logo05, alt: "Partner logo 05" , imageClassName: "!max-h-[1.9rem] md:!max-h-[2.5rem]" },
  { src: logo06, alt: "Partner logo 06" , imageClassName: "!max-h-[1.9rem] md:!max-h-[2.5rem]" },
  { src: logo07, alt: "Partner logo 07", imageClassName: "!max-h-[1.3rem] md:!max-h-[1.9rem]" },
  { src: logo08, alt: "Partner logo 08" , imageClassName: "!max-h-[1.6rem] md:!max-h-[2.3rem]" },
  { src: logo09, alt: "Partner logo 09" , imageClassName: "!max-h-[1.4rem] md:!max-h-[1.9rem]" },
  { src: logo10, alt: "Partner logo 10", imageClassName: "!max-h-[0.9rem] md:!max-h-[1.1rem]" },
  { src: logo11, alt: "Partner logo 11", imageClassName: "!max-h-[1rem] md:!max-h-[1.2rem]" },
  { src: logo12, alt: "Partner logo 12", imageClassName: "!max-h-[1.4rem] md:!max-h-[1.72rem]" },
  { src: logo13, alt: "Partner logo 13", imageClassName: "!max-h-[1.4rem] md:!max-h-[1.8rem]" },
  { src: logo14, alt: "Partner logo 14", imageClassName: "!max-h-[1.3rem] md:!max-h-[1.72rem]" },
  { src: logo15, alt: "Partner logo 15", imageClassName: "!max-h-[1.3rem] md:!max-h-[1.72rem]" },
  { src: logo16, alt: "Partner logo 16", imageClassName: "!max-h-[0.8rem] md:!max-h-[1.1rem]" },
  { src: logo17, alt: "Partner logo 17", imageClassName: "!max-h-[1rem] md:!max-h-[1.5rem]" },
  { src: logo18, alt: "Partner logo 18", imageClassName: "!max-h-[0.8rem] md:!max-h-[1.2rem]" },
  { src: logo19, alt: "Partner logo 19" , imageClassName: "!max-h-[1.4rem] md:!max-h-[2.1rem]" },
  { src: logo20, alt: "Partner logo 20" , imageClassName: "!max-h-[1.33rem] md:!max-h-[1.8rem]" },
  { src: logo21, alt: "Partner logo 21", imageClassName: "!max-h-[1.12rem] md:!max-h-[1.5rem]" },
  { src: logo22, alt: "Partner logo 22", imageClassName: "!max-h-[1.3rem] md:!max-h-[1.8rem]" },
  { src: logo23, alt: "Partner logo 23" , imageClassName: "!max-h-[1.3rem] md:!max-h-[2rem]" },
];

export const logoRows: LogoAsset[][] = [
  logos.slice(0, 8),
  logos.slice(8, 16),
  logos.slice(16),
];
