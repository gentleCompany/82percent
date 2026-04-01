'use client';

import React, { useEffect, useRef, useState } from "react";

interface VideoLoaderProps {
    videoSrc: string;
    poster: string;
    title?: string;
    className?: string;
    scale?: string;
}

const VideoLoader: React.FC<VideoLoaderProps> = ({
    videoSrc,
    poster,
    title = "Vimeo video",
    className = "",
    scale = "scale-100",
}) => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const iframeUrl = new URL(videoSrc);
    iframeUrl.searchParams.set("autoplay", "1");
    iframeUrl.searchParams.set("loop", "1");
    iframeUrl.searchParams.set("muted", "1");
    iframeUrl.searchParams.set("background", "1");
    iframeUrl.searchParams.set("autopause", "0");
    iframeUrl.searchParams.set("title", "0");
    iframeUrl.searchParams.set("byline", "0");
    iframeUrl.searchParams.set("portrait", "0");
    iframeUrl.searchParams.set("badge", "0");

    useEffect(() => {
        setIsVideoPlaying(false);
    }, [videoSrc]);

    return (
        <div className={`relative w-full h-full overflow-hidden bg-black ${className}`}>
            <div
                className={`absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-[1000ms] z-10 ${isVideoPlaying ? "opacity-0" : "opacity-100"
                    } ${scale}`}
                style={{
                    backgroundImage: `url(${poster})`,
                }}
            />

            <iframe
                key={iframeUrl.toString()}
                ref={iframeRef}
                src={iframeUrl.toString()}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                title={title}
                onLoad={() => {
                    setIsVideoPlaying(true);
                }}
                className={`absolute inset-0 h-full w-full z-0 transition-opacity duration-[1000ms] ${isVideoPlaying ? "opacity-100" : "opacity-0"
                    }`}
            />
        </div>
    );
};

export default VideoLoader;
