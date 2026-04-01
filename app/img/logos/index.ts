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
};

const logos: LogoAsset[] = [
  { src: logo01, alt: "Partner logo 01" },
  { src: logo02, alt: "Partner logo 02" },
  { src: logo03, alt: "Partner logo 03" },
  { src: logo04, alt: "Partner logo 04" },
  { src: logo05, alt: "Partner logo 05" },
  { src: logo06, alt: "Partner logo 06" },
  { src: logo07, alt: "Partner logo 07" },
  { src: logo08, alt: "Partner logo 08" },
  { src: logo09, alt: "Partner logo 09" },
  { src: logo10, alt: "Partner logo 10" },
  { src: logo11, alt: "Partner logo 11" },
  { src: logo12, alt: "Partner logo 12" },
  { src: logo13, alt: "Partner logo 13" },
  { src: logo14, alt: "Partner logo 14" },
  { src: logo15, alt: "Partner logo 15" },
  { src: logo16, alt: "Partner logo 16" },
  { src: logo17, alt: "Partner logo 17" },
  { src: logo18, alt: "Partner logo 18" },
  { src: logo19, alt: "Partner logo 19" },
  { src: logo20, alt: "Partner logo 20" },
  { src: logo21, alt: "Partner logo 21" },
  { src: logo22, alt: "Partner logo 22" },
  { src: logo23, alt: "Partner logo 23" },
];

export const logoRows: LogoAsset[][] = [
  logos.slice(0, 8),
  logos.slice(8, 16),
  logos.slice(16),
];
