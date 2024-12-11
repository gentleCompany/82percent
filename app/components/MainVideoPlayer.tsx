import Player from "@vimeo/player";
import React, { useEffect, useRef, useState } from "react";

interface VideoLoaderProps {
    videoSrc: string; // Vimeo video URL
    poster: string; // Background image URL
    className?: string; // Additional styling classes
    scale?: string; // Scale adjustment
}

const VideoLoader: React.FC<VideoLoaderProps> = ({
    videoSrc,
    poster,
    className = "",
    scale = "scale-100",
}) => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isVideoReady, setIsVideoReady] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (!iframeRef.current) return;

        const player = new Player(iframeRef.current);

        // 비디오 로드 완료 시 호출
        player.on("loaded", () => {
            console.log(isVideoReady);
            setIsVideoReady(true);
        });

        // 비디오 재생 시작 시 호출
        player.on("play", () => {
            setIsVideoPlaying(true);
        });

        return () => {
            player.off("loaded");
            player.off("play");
        };
    }, []);




    return (
        <div className={`relative w-full h-full overflow-hidden ${className}`}>
            {/* Background Image */}
            <div
                className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-[1000ms] z-10 ${isVideoPlaying ? "opacity-0" : "opacity-100"
                    } ${scale}`}
                style={{
                    backgroundImage: `url(${poster})`,
                }}
            ></div>

            {/* Vimeo iframe */}
            <iframe
                ref={iframeRef}
                src={`${videoSrc}?autoplay=1&loop=1&muted=1&background=1`}
                frameBorder="0"
                allow="autoplay; fullscreen"
                className={`absolute top-1/2 left-1/2 w-[177.77777778vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2 object-cover z-0 ${isVideoPlaying ? "opacity-100" : "opacity-0"
                    } ${scale}`}
            ></iframe>
        </div>
    );
};

export default VideoLoader;