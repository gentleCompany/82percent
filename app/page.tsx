'use client'
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import VideoLoader from "@/app/components/MainVideoPlayer";
import { logoRows } from "@/app/img/logos";
import publicInstitutionThumbnail from "@/app/img/thumbnail/hose.png";
import fashionFilmThumbnail from "@/app/img/thumbnail/biba.png";
import dramaThumbnail from "@/app/img/thumbnail/maybe.png";
import inhouseStudioShot from "@/app/img/shot.png";

type VideoItem = {
  id: number;
  src: string;
  title: string;
  description: string;
  videoUrl: string;
  aspectRatio: string;
};

const showreelEmbedUrl =
  "https://player.vimeo.com/video/1179132874?autoplay=0&loop=1&muted=1&background=1&autopause=0&title=0&byline=0&portrait=0&badge=0&player_id=home-showreel&api=1";

const portfolioShowcaseSections = [
  {
    eyebrow: "Public impact / education film",
    category: "공공기관 / 대학",
    suffix: "영상",
    imageSrc: publicInstitutionThumbnail,
    imageAlt: "한국문화원 로고가 등장하는 공공기관 영상 스틸",
    videoSrc:
      "https://player.vimeo.com/video/1179126136?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
    videoTitle: "공공기관 / 대학 영상",
    paragraphs: [
      "공공기관과 대학이 전해야 하는 메시지를 더 명확하고 신뢰감 있게 전달할 수 있도록 영상 구조를 설계합니다.",
      "정책 홍보, 기관 소개, 캠퍼스 브랜딩, 교육 프로그램 아카이브까지 목적에 맞는 톤과 리듬으로 콘텐츠를 제작합니다."
    ]
  },
  {
    eyebrow: "Brand / commercial film",
    category: "패션필름 / 커머셜",
    suffix: "영상",
    imageSrc: fashionFilmThumbnail,
    imageAlt: "패션필름 스타일의 인물 스틸",
    imageClassName: "object-center scale-[1.42] md:scale-[1.5]",
    videoSrc:
      "https://player.vimeo.com/video/1179125446?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
    videoTitle: "패션필름 / 커머셜 영상",
    paragraphs: [
      "패션필름과 커머셜은 브랜드의 무드와 제품의 매력을 짧은 시간 안에 선명하게 각인시키는 작업입니다.",
      "룩북, 캠페인, 브랜드 필름, 제품 광고까지 감도와 판매 포인트가 함께 살아나는 화면을 만듭니다."
    ]
  },
  {
    eyebrow: "Narrative / digital series",
    category: "드라마 / 유튜브",
    suffix: "콘텐츠",
    imageSrc: dramaThumbnail,
    imageAlt: "드라마 분위기의 인물 스틸",
    videoSrc:
      "https://player.vimeo.com/video/1179126097?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
    videoTitle: "유튜브 드라마",
    paragraphs: [
      "드라마와 유튜브 콘텐츠는 이야기의 흐름, 캐릭터의 밀도, 시청 지속률까지 함께 고려해야 하는 영역입니다.",
      "브랜드 채널 운영형 포맷부터 서사 중심의 시리즈형 콘텐츠까지 목적에 맞는 서사 구조로 풀어냅니다."
    ]
  }
];

const partnerMessageCards = [
  {
    title: ["마케팅을 이해하는", "영상 제작사"],
    body: "브랜드 메시지와 성과 포인트를 함께 설계합니다.",
    hoverRotate: -2.5,
    tapRotate: -1.5
  },
  {
    title: ["다양한", "레퍼런스 보유"],
    body: "업종과 목적에 맞는 무드보드와 화면 언어를 빠르게 제안합니다.",
    hoverRotate: 1.8,
    tapRotate: 1
  },
  {
    title: ["젊은 감각으로", "트렌디하게"],
    body: "트렌디한 감각과 아이디어로 크리에이티브한 영상을 완성합니다.",
    hoverRotate: 3.2,
    tapRotate: 2
  }
];

const partnerSupportCards = [
  {
    title: ["기획안 먼저", "제작"],
    bodyLines: [
      "제작 전 기획안 전달",
      "맞춤형 영상 솔루션 제공",
      "담당 PM으로 빠른 의사소통"
    ],
    hoverRotate: -1.8,
    tapRotate: -1
  },
  {
    title: ["100% 인하우스", "스튜디오"],
    bodyLines: [
      "기획부터 촬영, 편집까지 직접 제작",
      "중간 프로세스 없이 간편한 제작",
      "중간 수수료 없이 합리적인 가격"
    ],
    hoverRotate: 1.5,
    tapRotate: 0.8
  },
  {
    title: ["후속 지원 및", "유지보수"],
    bodyLines: [
      "프로젝트 완료 후에도 수정 가능",
      "지속적인 커뮤니케이션과 운영 약속",
      "장기 파트너십 구축 목표"
    ],
    hoverRotate: 2.1,
    tapRotate: 1.2
  }
];

const persuasiveProductionCards: {
  title: string;
  value: string;
  suffix: string;
  summary: string;
  theme: "glow" | "sky" | "graph";
  bodyLines: string[];
}[] = [
  {
    title: "퀄리티 걱정없이",
    value: "기획안",
    suffix: "먼저",
    summary: "제작 전에 방향을 먼저 또렷하게 맞춥니다.",
    theme: "glow",
    bodyLines: [
      "제작 전 기획안 전달",
      "맞춤형 영상 솔루션 제공",
      "담당 PM으로 빠른 의사소통"
    ]
  },
  {
    title: "100% 인하우스 스튜디오",
    value: "100%",
    suffix: "인하우스",
    summary: "기획부터 촬영, 편집까지 한 흐름으로 제작합니다.",
    theme: "sky",
    bodyLines: [
      "기획부터 촬영, 편집까지 직접 제작",
      "중간 프로세스 없이 간편한 제작",
      "중간 수수료 없이 합리적인 가격"
    ]
  },
  {
    title: "후속 지원 및 유지보수",
    value: "수정",
    suffix: "지원",
    summary: "프로젝트 종료 후에도 연결을 이어갑니다.",
    theme: "graph",
    bodyLines: [
      "프로젝트 완료 후에도 수정 가능",
      "지속적인 커뮤니케이션과 운영 약속",
      "장기 파트너십 구축 목표"
    ]
  }
];

const homeContactDetails = [
  {
    label: "A",
    lines: [
      "188 Galmae Sunhwan-ro, Guri-si, Gyeonggi-do, Korea",
      "611. 6th Floor. Skansen Knowledge Industry Center."
    ]
  },
  {
    label: "E",
    lines: ["82percent.official@gmail.com"]
  },
  {
    label: "M",
    lines: ["010-9915-5855"]
  }
];

function ShowreelPlayPauseIcon({ isPlaying }: { isPlaying: boolean }) {
  return isPlaying ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M8 5.5v13l10-6.5-10-6.5Z" />
    </svg>
  );
}

function ShowreelRestartIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.9">
      <path d="M7 8H3V4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 8a8 8 0 1 1-1 7.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isShowreelMuted, setIsShowreelMuted] = useState(true);
  const [isShowreelPlaying, setIsShowreelPlaying] = useState(false);
  const [isBeforeShowreelSection, setIsBeforeShowreelSection] = useState(true);
  const archiveTitleRef = useRef(null);
  const archiveItemsRef = useRef(null);
  const showreelSectionRef = useRef<HTMLElement | null>(null);
  const showreelIframeRef = useRef<HTMLIFrameElement | null>(null);
  const hasStartedShowreelRef = useRef(false);
  const showreelLoopLockRef = useRef(false);
  const isArchiveTitleInView = useInView(archiveTitleRef, { once: true });
  const isArchiveItemsInView = useInView(archiveItemsRef, { once: true });

  const postShowreelCommand = (method: string, value?: string | number | boolean) => {
    const targetWindow = showreelIframeRef.current?.contentWindow;

    if (!targetWindow) {
      return;
    }

    targetWindow.postMessage(
      JSON.stringify({
        method,
        ...(value === undefined ? {} : { value }),
      }),
      "https://player.vimeo.com"
    );
  };

  const toggleShowreelSound = () => {
    const nextMuted = !isShowreelMuted;

    postShowreelCommand("setMuted", nextMuted);
    postShowreelCommand("setVolume", nextMuted ? 0 : 1);
    if (!nextMuted) {
      postShowreelCommand("play");
      hasStartedShowreelRef.current = true;
      setIsShowreelPlaying(true);
    }

    setIsShowreelMuted(nextMuted);
  };

  const toggleShowreelPlayback = () => {
    if (isShowreelPlaying) {
      postShowreelCommand("pause");
      setIsShowreelPlaying(false);
      return;
    }

    if (!hasStartedShowreelRef.current) {
      postShowreelCommand("setMuted", false);
      postShowreelCommand("setVolume", 1);
      setIsShowreelMuted(false);
      hasStartedShowreelRef.current = true;
    }

    postShowreelCommand("play");
    setIsShowreelPlaying(true);
  };

  const restartShowreel = () => {
    if (!hasStartedShowreelRef.current) {
      postShowreelCommand("setMuted", false);
      postShowreelCommand("setVolume", 1);
      setIsShowreelMuted(false);
      hasStartedShowreelRef.current = true;
    }

    showreelLoopLockRef.current = true;
    postShowreelCommand("setCurrentTime", 0);
    postShowreelCommand("play");
    setIsShowreelPlaying(true);
  };

  const renderShowreelControls = (containerClassName: string) => (
    <div className={containerClassName}>
      <button
        type="button"
        onClick={toggleShowreelPlayback}
        aria-label={isShowreelPlaying ? "쇼릴 일시정지" : "쇼릴 재생"}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/35 bg-black/55 text-white backdrop-blur-sm transition hover:bg-black/70"
      >
        <ShowreelPlayPauseIcon isPlaying={isShowreelPlaying} />
      </button>
      <button
        type="button"
        onClick={restartShowreel}
        aria-label="쇼릴 처음부터 다시 재생"
        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/35 bg-black/55 text-white backdrop-blur-sm transition hover:bg-black/70"
      >
        <ShowreelRestartIcon />
      </button>
      <button
        type="button"
        onClick={toggleShowreelSound}
        aria-pressed={!isShowreelMuted}
        className="rounded-full border border-white/35 bg-black/55 px-5 py-3 text-sm font-semibold tracking-[-0.02em] text-white backdrop-blur-sm transition hover:bg-black/70"
      >
        {isShowreelMuted ? "소리 켜기" : "소리 끄기"}
      </button>
    </div>
  );

  const archiveItems: VideoItem[] = [
    {
      id: 1,
      src: "/inseokkangPFthumbnails/1.jpg",
      title: "10 brands Paris fashion film",
      description: "",
      videoUrl: "https://player.vimeo.com/video/1035499391?h=c51f0d10ad&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      aspectRatio: "4:3"
    },
    {
      id: 2,
      src: "/inseokkangPFthumbnails/2.jpg",
      title: "Maison de Ines Paris fashion film",
      description: "",
      videoUrl: "https://player.vimeo.com/video/1035885060?h=8b79da5bda&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      aspectRatio: "16:9"
    },
    {
      id: 3,
      src: "/inseokkangPFthumbnails/3.jpg",
      title: "Barbara Paris fashion film",
      description: "",
      videoUrl: "https://player.vimeo.com/video/1035885474?h=8f39f17f0e&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      aspectRatio: "16:9"
    },
    {
      id: 4,
      src: "/inseokkangPFthumbnails/4.jpg",
      title: "Huit Paris fashion film",
      description: "",
      videoUrl: "https://player.vimeo.com/video/1035886274?h=84efa739b9&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      aspectRatio: "16:9"
    },
    {
      id: 5,
      src: "/inseokkangPFthumbnails/5.jpg",
      title: "Kim Solbi Paris exposition teaser",
      description: "Korean cultural center in Paris",
      videoUrl: "https://player.vimeo.com/video/1035886303?h=5ffd34b434&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      aspectRatio: "16:9"
    },
    {
      id: 6,
      src: "/inseokkangPFthumbnails/6.jpg",
      title: "Han Jihee Paris exposition teaser",
      description: "Korean cultural center in Paris",
      videoUrl: "https://player.vimeo.com/video/1035886358?h=107b412004&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      aspectRatio: "16:9"
    },
    {
      id: 7,
      src: "/inseokkangPFthumbnails/7.jpg",
      title: "Lee Chulsoo Paris exposition teaser",
      description: "Korean cultural center in Paris",
      videoUrl: "https://player.vimeo.com/video/1035886399?h=d11786fd79&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      aspectRatio: "16:9"
    },
    {
      id: 8,
      src: "/inseokkangPFthumbnails/8.jpg",
      title: "레트로 아카이브 YouTube",
      description: "",
      videoUrl: "https://player.vimeo.com/video/1035886446?h=249cc4eac9&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      aspectRatio: "16:9"
    },
    {
      id: 9,
      src: "/inseokkangPFthumbnails/9.jpg",
      title: "월광 미술관 YouTube",
      description: "",
      videoUrl: "https://player.vimeo.com/video/1035886714?h=d6e98322f5&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      aspectRatio: "16:9"
    },
    {
      id: 10,
      src: "/inseokkangPFthumbnails/10.jpg",
      title: "ffeff studio Paris fashion film",
      description: "",
      videoUrl: "https://player.vimeo.com/video/1035887058?h=767f61ba22&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      aspectRatio: "16:9"
    },
    {
      id: 11,
      src: "/inseokkangPFthumbnails/11.jpg",
      title: "Zajakala paris fashion film",
      description: "",
      videoUrl: "https://player.vimeo.com/video/1035887359?h=66540d39ac&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      aspectRatio: "16:9"
    },
    {
      id: 12,
      src: "/inseokkangPFthumbnails/12.jpg",
      title: "Kpop dance contest in Paris teaser",
      description: "Korean cultural center in Paris",
      videoUrl: "https://player.vimeo.com/video/1035887408?h=9743a1867c&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      aspectRatio: "16:9"
    }
  ];

  const calculateDimensions = (aspectRatio: string, maxWidth: number, maxHeight: number) => {
    const [width, height] = aspectRatio.split(':').map(Number);
    const ratio = width / height;

    let finalWidth = maxWidth;
    let finalHeight = maxWidth / ratio;

    if (finalHeight > maxHeight) {
      finalHeight = maxHeight;
      finalWidth = maxHeight * ratio;
    }

    return { width: finalWidth, height: finalHeight };
  };

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (selectedVideo) {
        const dims = calculateDimensions(
          selectedVideo.aspectRatio,
          window.innerWidth * 0.8,
          window.innerHeight * 0.8
        );
        setDimensions(dims);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [selectedVideo]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://player.vimeo.com") {
        return;
      }

      if (event.source !== showreelIframeRef.current?.contentWindow) {
        return;
      }

      let payload: unknown = event.data;

      if (typeof payload === "string") {
        try {
          payload = JSON.parse(payload);
        } catch {
          return;
        }
      }

      if (!payload || typeof payload !== "object") {
        return;
      }

      const eventName =
        "event" in payload && typeof payload.event === "string"
          ? payload.event
          : undefined;
      const eventData =
        "data" in payload && payload.data && typeof payload.data === "object"
          ? payload.data
          : undefined;

      if (eventName === "ready") {
        postShowreelCommand("addEventListener", "play");
        postShowreelCommand("addEventListener", "pause");
        postShowreelCommand("addEventListener", "timeupdate");
        postShowreelCommand("addEventListener", "ended");
        postShowreelCommand("setMuted", true);
        postShowreelCommand("setVolume", 0);

        setIsShowreelMuted(true);
        setIsShowreelPlaying(false);
      }

      if (eventName === "play") {
        setIsShowreelPlaying(true);
      }

      if (eventName === "pause") {
        setIsShowreelPlaying(false);
      }

      if (eventName === "timeupdate" && eventData) {
        const seconds =
          "seconds" in eventData && typeof eventData.seconds === "number"
            ? eventData.seconds
            : undefined;
        const duration =
          "duration" in eventData && typeof eventData.duration === "number"
            ? eventData.duration
            : undefined;

        if (seconds === undefined || duration === undefined) {
          return;
        }

        if (duration - seconds <= 0.75 && !showreelLoopLockRef.current) {
          showreelLoopLockRef.current = true;
          postShowreelCommand("setCurrentTime", 0);
          postShowreelCommand("play");
          setIsShowreelPlaying(true);
        }

        if (seconds < 1.5) {
          showreelLoopLockRef.current = false;
        }
      }

      if (eventName === "ended") {
        showreelLoopLockRef.current = true;
        postShowreelCommand("setCurrentTime", 0);
        postShowreelCommand("play");
        setIsShowreelPlaying(true);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    const updateShowreelControlMode = () => {
      const section = showreelSectionRef.current;

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const activationLine = window.innerHeight * 0.7;

      setIsBeforeShowreelSection(rect.top > activationLine);
    };

    updateShowreelControlMode();
    window.addEventListener("scroll", updateShowreelControlMode, { passive: true });
    window.addEventListener("resize", updateShowreelControlMode);

    return () => {
      window.removeEventListener("scroll", updateShowreelControlMode);
      window.removeEventListener("resize", updateShowreelControlMode);
    };
  }, []);

  return (
    <div className="mx-auto overflow-hidden">
      {renderShowreelControls(
        `fixed bottom-5 right-5 z-40 flex items-center gap-2 transition-all duration-500 md:bottom-6 md:right-6 ${
          isBeforeShowreelSection ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`
      )}

      <div className="relative h-screen ">
        {/* <iframe
          src="https://player.vimeo.com/video/1035446953?h=55124934f3&background=1&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479
"
          frameBorder="0"
          allow="autoplay; fullscreen; "
          className="absolute top-1/2 left-1/2 w-[177.77777778vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2"
          title="test1"
        ></iframe>
        
        */}
        <VideoLoader
          videoSrc="https://player.vimeo.com/video/1035446953?h=55124934f3&background=1&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
          poster="/82bg.png"
        />

        <div className="pointer-events-none absolute inset-0 z-[1] bg-black/18" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 1.2,
              ease: "easeOut",
              delay: 0.3
            }
          }}
          className="absolute inset-0 z-10 pointer-events-none flex items-center px-6 md:px-12"
        >
          <div className="relative w-full max-w-6xl text-left">
            <h1 className="text-[clamp(1.15rem,3.3vw,3.25rem)] font-black leading-[0.98] tracking-[-0.045em] text-white drop-shadow-[0_14px_42px_rgba(0,0,0,0.62)]">
              <span className="block">Beyond Production</span>
              <span className="mt-6 block md:mt-9">Business Results</span>
            </h1>
          </div>
        </motion.div>
      </div>

      <section className="overflow-hidden bg-[#ececea] px-0 py-[164px] text-black md:py-[196px]">
        <div className="px-8 md:px-12">
          <div className="mx-auto max-w-4xl px-8 py-12 text-center md:px-14 md:py-16">
            <p className="text-[clamp(1rem,1.85vw,1.8rem)] font-light leading-[1.35] tracking-[-0.05em] text-black/72">
              대기업부터 공공기관, 스타트업, 패션 브랜드까지.
            </p>
            <div aria-hidden="true" className="mx-auto my-7 h-12 w-px bg-black md:my-9 md:h-16" />
            <p className="text-[clamp(1.25rem,2.7vw,2.9rem)] leading-[1.28] tracking-[-0.06em] text-black/65">
              <span className="font-black text-black">성과로 이어지는 전략적인 콘텐츠</span>를 만듭니다.
            </p>
          </div>
        </div>

        <div className="mt-20 space-y-4 md:mt-28 md:space-y-6">
          {logoRows.map((logos, rowIndex) => (
            <div key={rowIndex} className="logo-marquee-row">
              <div className={`logo-marquee-track ${rowIndex === 1 ? "logo-marquee-right" : "logo-marquee-left"}`}>
                {[...logos, ...logos, ...logos, ...logos].map((logo, logoIndex) => (
                  <div
                    key={`${rowIndex}-${logoIndex}-${logo.alt}`}
                    className="logo-image-wrap"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      className="logo-image"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-black px-8 py-20 text-white md:px-12 md:py-28">
        <div className="mx-auto max-w-[88rem] space-y-16 md:space-y-24">
          {portfolioShowcaseSections.map((section, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={section.category}
                className={`grid items-center gap-10 pt-10 lg:gap-20 lg:pt-12 ${
                  isReversed
                    ? "lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]"
                    : "lg:grid-cols-[minmax(0,1.22fr)_minmax(0,0.78fr)]"
                }`}
              >
                <div className={isReversed ? "order-2 lg:order-2" : "order-2 lg:order-1"}>
                  <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.07),rgba(255,255,255,0.02)_42%,rgba(255,255,255,0.01)_100%)] aspect-[16/10] md:aspect-[16/9.4] lg:aspect-[16/9.2]">
                    {section.videoSrc ? (
                      <VideoLoader
                        videoSrc={section.videoSrc}
                        poster={section.imageSrc.src}
                        title={section.videoTitle}
                        className="h-full w-full"
                        scale={section.imageClassName ?? "scale-100"}
                      />
                    ) : (
                      <Image
                        src={section.imageSrc}
                        alt={section.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className={`object-cover ${section.imageClassName ?? ""}`}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-black/5" />
                  </div>
                </div>

                <div className={isReversed ? "order-1 lg:order-1" : "order-1 lg:order-2"}>
                  <p className="text-[0.9rem] font-black italic tracking-[-0.04em] text-white/46 md:text-[1.05rem]">
                    {section.eyebrow}
                  </p>
                  <h2 className="mt-5 text-[clamp(1.33rem,2.67vw,2.67rem)] font-black italic leading-[0.95] tracking-[-0.07em]">
                    <span className="text-white">{section.category}</span>{" "}
                    <span className="text-white/38">{section.suffix}</span>
                  </h2>
                  <div className="mt-7 space-y-5 text-base leading-[1.85] text-white/62 md:text-xl">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative bg-black px-8 pt-36 pb-24 text-white md:px-12 md:pt-48 md:pb-32">
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          className="pointer-events-none absolute -left-16 bottom-4 h-80 w-80 origin-center animate-[spin_60s_linear_infinite] md:-left-24 md:bottom-[-1.5rem] md:h-[34rem] md:w-[34rem]"
        >
          <circle
            cx="50"
            cy="50"
            r="49"
            fill="none"
            stroke="rgba(255,255,255,0.58)"
            strokeWidth="1.4"
            strokeDasharray="1.2 5.8"
            strokeLinecap="round"
          />
        </svg>
        <div className="pointer-events-none absolute -right-28 top-20 h-64 w-64 rounded-full border-[3px] border-white/42 animate-logo-breathe md:-right-28 md:top-[-1.5rem] md:h-[26rem] md:w-[26rem]" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <p className="text-[clamp(1.2rem,2vw,1.85rem)] font-light leading-[1.35] tracking-[-0.05em] text-white/72">
              느낌이 가는 영상으로, 마케팅은 똑똑하게.
            </p>
            <div aria-hidden="true" className="my-8 h-16 w-px bg-white/65 md:my-10 md:h-20" />
            <p className="text-[clamp(1.5rem,2.5vw,2.5rem)] leading-[1.4] tracking-[-0.06em] text-white/72">
              82PERCENT는
              <br />
              <span className="font-black text-white">영상 제작사이자, 마케팅 파트너</span>입니다.
            </p>
          </div>

          <div className="relative mt-60 grid gap-5 md:mt-80 md:grid-cols-3 md:gap-6">
            {partnerMessageCards.map((card) => (
              <motion.article
                key={card.title.join("")}
                initial={{ rotate: 0, y: 0, scale: 1 }}
                whileHover={{ y: -10, scale: 1.025, rotate: card.hoverRotate }}
                whileTap={{ scale: 0.99, rotate: card.tapRotate }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="relative min-h-[14rem] rounded-[2rem] bg-[#d9d9d9] px-7 py-8 text-black shadow-[0_18px_40px_rgba(0,0,0,0.28)] transition-[background-color,box-shadow] duration-300 ease-out hover:bg-[#f3f3f3] hover:shadow-[0_24px_54px_rgba(0,0,0,0.34)]"
              >
                <div className="absolute left-6 top-6 h-5 w-5 rounded-full bg-black" />
                <div className="flex h-full flex-col justify-between pt-6">
                  <h3 className="text-center text-[clamp(1.2rem,1.7vw,1.75rem)] font-black leading-[1.15] tracking-[-0.06em]">
                    {card.title.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                  <p className="mt-8 text-sm leading-[1.55] text-black/72 md:text-[0.95rem]">
                    {card.body}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="relative mt-6 grid gap-5 md:grid-cols-3 md:gap-6">
            {partnerSupportCards.map((card) => (
              <motion.article
                key={card.title.join("")}
                initial={{ rotate: 0, y: 0, scale: 1 }}
                whileHover={{ y: -10, scale: 1.025, rotate: card.hoverRotate }}
                whileTap={{ scale: 0.99, rotate: card.tapRotate }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="relative min-h-[15rem] rounded-[2rem] border border-white/14 bg-[#f1efe8] px-7 py-8 text-black shadow-[0_18px_40px_rgba(0,0,0,0.24)] transition-[background-color,box-shadow] duration-300 ease-out hover:bg-white hover:shadow-[0_24px_54px_rgba(0,0,0,0.3)]"
              >
                <div className="absolute left-6 top-6 h-5 w-5 rounded-full bg-black" />
                <div className="flex h-full flex-col justify-between pt-6">
                  <h3 className="text-center text-[clamp(1.2rem,1.7vw,1.75rem)] font-black leading-[1.15] tracking-[-0.06em]">
                    {card.title.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                  <div className="mt-10 space-y-0.5 text-sm leading-[1.55] text-black/72 md:text-[0.95rem]">
                    {card.bodyLines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="hidden bg-black pb-[calc(6rem+100px)] pt-[calc(6rem+100px)] text-white md:pb-[calc(7rem+100px)] md:pt-[calc(7rem+100px)]">
        <div className="mx-auto max-w-[112rem] overflow-x-auto px-5 pb-2 md:px-8">
          <div className="flex min-w-max gap-8">
            {persuasiveProductionCards.map((card) => (
              <article
                key={card.title}
                className={`relative w-[20rem] shrink-0 overflow-hidden rounded-[2rem] px-8 py-8 shadow-[0_24px_50px_rgba(0,0,0,0.18)] sm:w-[24rem] lg:w-[31rem] ${
                  card.theme === "glow"
                    ? "min-h-[37rem] bg-[#f3f1ec] px-9 py-9 text-black"
                    : card.theme === "sky"
                      ? "min-h-[37rem] bg-[#6e7f8e] px-9 py-9 text-white"
                      : "min-h-[37rem] bg-[linear-gradient(180deg,#5f7684_0%,#8b9da8_38%,#b4b4aa_100%)] px-9 py-9 text-white"
                }`}
              >
                {card.theme === "glow" && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-6 bottom-[-5rem] h-[18rem] rounded-full bg-[radial-gradient(circle,rgba(255,235,84,0.96)_0%,rgba(255,235,84,0.62)_34%,rgba(255,235,84,0)_76%)] blur-2xl"
                  />
                )}

                {card.theme === "sky" && (
                  <>
                    <Image
                      src={inhouseStudioShot}
                      alt="카메라 장비를 조작하는 인하우스 스튜디오 촬영 현장"
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(44,58,73,0.28)_0%,rgba(63,89,118,0.12)_28%,rgba(20,25,30,0.18)_58%,rgba(14,18,21,0.72)_100%)]" />
                  </>
                )}

                {card.theme === "graph" && (
                  <div aria-hidden="true" className="absolute inset-0">
                    <div className="absolute inset-x-0 bottom-0 h-[38%] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(239,234,220,0.22)_100%)]" />
                  </div>
                )}

                <div className="relative z-10 flex h-full flex-col">
                  <p className={`text-[1rem] font-bold tracking-[-0.03em] ${card.theme === "glow" ? "text-black/72" : "text-white/90"}`}>
                    {card.title}
                  </p>
                  <div className="mt-6">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <span className="text-[clamp(2.35rem,3.9vw,3.2rem)] font-black leading-none tracking-[-0.07em]">
                        {card.value}
                      </span>
                      <span className="text-[clamp(2.35rem,3.9vw,3.2rem)] font-black leading-none tracking-[-0.07em]">
                        {card.suffix}
                      </span>
                    </div>
                    <p className={`mt-3.5 max-w-[20rem] text-[0.92rem] font-medium leading-[1.45] tracking-[-0.02em] ${card.theme === "glow" ? "text-black/66" : "text-white/82"}`}>
                      {card.summary}
                    </p>
                  </div>

                  <div className={`mt-auto space-y-1.5 text-[0.9rem] font-semibold leading-[1.5] tracking-[-0.03em] ${card.theme === "glow" ? "text-black/78" : "text-white/94"}`}>
                    {card.bodyLines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={showreelSectionRef}
        className="relative bg-black px-5 py-8 md:px-10 md:py-12 lg:px-16 lg:py-16"
      >
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center">
          <div className="relative flex h-[58vh] w-full items-center justify-center overflow-hidden rounded-[2rem] bg-black shadow-[0_30px_80px_rgba(0,0,0,0.45)] md:h-[68vh] lg:h-[72vh]">
            <iframe
              ref={showreelIframeRef}
              src={showreelEmbedUrl}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              title="showreel"
              className="pointer-events-none h-full w-full"
            />
          </div>
          {renderShowreelControls(
            `mt-4 flex items-center gap-2 transition-all duration-500 md:mt-5 ${
              isBeforeShowreelSection ? "pointer-events-none translate-y-2 opacity-0" : "translate-y-0 opacity-100"
            }`
          )}
        </div>
      </section>

      <section className="relative overflow-hidden bg-black px-6 py-24 text-white md:px-10 md:py-32">
        <div className="relative mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-between gap-20">
          <div className="pt-4 text-center">
            <p className="text-[clamp(1.2rem,1.9vw,1.9rem)] font-medium tracking-[0.01em] text-white/82">
              여러분의 다음 이야기에 함께 하겠습니다.
            </p>
            <div className="relative mt-8 flex justify-center">
              <span className="pointer-events-none absolute left-1/2 top-[90%] -translate-x-1/2 -translate-y-1/2 text-[clamp(5rem,14vw,10rem)] font-thin tracking-[0.04em] text-[#4a4a4f]">
                CONTACT
              </span>
              <h2 className="relative z-10 text-[clamp(1.9rem,3.8vw,3.45rem)] font-black leading-[1.24] tracking-[0.01em] text-white">
                궁금하신 사항을 문의해주시면
                <br />
                빠르게 답변 드리겠습니다.
              </h2>
            </div>
          </div>

          <div className="w-full max-w-2xl space-y-6 text-left text-[clamp(1rem,1.4vw,1.55rem)] font-light leading-[1.5] tracking-[0.01em] text-white/78">
            {homeContactDetails.map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <span className="min-w-5 font-bold text-white">{item.label}</span>
                <div>
                  {item.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hidden">
        <div className="">
          <motion.h1
            ref={archiveTitleRef}
            style={{
              transform: isArchiveTitleInView ? "none" : "translateY(20px)",
              opacity: isArchiveTitleInView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
            }}
            className=" pl-6 font-black text-lg md:text-xl lg:text-3xl pb-10 pt-20"
          >
            PORTFOLIO
          </motion.h1>

          <div
            ref={archiveItemsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 "
          >
            {archiveItems.map((item, index) => (
              <motion.div
                key={item.id}
                style={{
                  transform: isArchiveItemsInView ? "none" : "translateY(50px)",
                  opacity: isArchiveItemsInView ? 1 : 0,
                  transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.5 + index * 0.1}s`
                }}
                className="relative"
              >
                <div
                  className="aspect-[16/9] relative mb-4 cursor-pointer"
                  onClick={() => setSelectedVideo(item)}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="px-2">
                  <h3 className="text-sm mb-4">{item.title}</h3>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative">
            <iframe
              src={selectedVideo.videoUrl}
              style={{
                width: `${dimensions.width}px`,
                height: `${dimensions.height}px`
              }}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
            <button
              className="absolute -top-7 right-0 text-white text-base md:-top-9  md:text-xl hover:opacity-75 transition-opacity"
              onClick={() => setSelectedVideo(null)}
            >
              닫기 ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
