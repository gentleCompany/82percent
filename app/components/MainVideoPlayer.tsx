'use client';

import Image from "next/image";
import React, { useEffect, useId, useMemo, useRef, useState } from "react";

interface VideoLoaderProps {
    videoSrc: string;
    poster: string;
    title?: string;
    className?: string;
    scale?: string;
    fillMode?: "cover" | "contain";
    loadStrategy?: "immediate" | "in-view";
    posterPriority?: boolean;
}

const PLAYER_RETRY_TIMEOUT_MS = 5000;
const PLAYER_ROOT_MARGIN = "280px 0px";

const VideoLoader: React.FC<VideoLoaderProps> = ({
    videoSrc,
    poster,
    title = "Vimeo video",
    className = "",
    scale = "scale-100",
    fillMode = "cover",
    loadStrategy = "immediate",
    posterPriority = false,
}) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const retryTimerRef = useRef<number | null>(null);
    const hasPlaybackStartedRef = useRef(false);

    const [shouldMountIframe, setShouldMountIframe] = useState(loadStrategy === "immediate");
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [showRetryButton, setShowRetryButton] = useState(false);
    const [reloadCount, setReloadCount] = useState(0);

    const embedId = useId().replace(/:/g, "");

    useEffect(() => {
        hasPlaybackStartedRef.current = isVideoPlaying;
    }, [isVideoPlaying]);

    useEffect(() => {
        setShouldMountIframe(loadStrategy === "immediate");
        setIsVideoPlaying(false);
        setShowRetryButton(false);
        setReloadCount(0);
        hasPlaybackStartedRef.current = false;
    }, [loadStrategy, videoSrc]);

    useEffect(() => {
        if (loadStrategy !== "in-view" || shouldMountIframe) {
            return;
        }

        const node = containerRef.current;

        if (!node) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (!entries.some((entry) => entry.isIntersecting)) {
                    return;
                }

                setShouldMountIframe(true);
                observer.disconnect();
            },
            { rootMargin: PLAYER_ROOT_MARGIN }
        );

        observer.observe(node);

        return () => {
            observer.disconnect();
        };
    }, [loadStrategy, shouldMountIframe]);

    const iframeUrl = useMemo(() => {
        const nextUrl = new URL(videoSrc);
        nextUrl.searchParams.set("autoplay", "1");
        nextUrl.searchParams.set("loop", "1");
        nextUrl.searchParams.set("muted", "1");
        nextUrl.searchParams.set("background", "1");
        nextUrl.searchParams.set("autopause", "0");
        nextUrl.searchParams.set("title", "0");
        nextUrl.searchParams.set("byline", "0");
        nextUrl.searchParams.set("portrait", "0");
        nextUrl.searchParams.set("badge", "0");
        nextUrl.searchParams.set("playsinline", "1");
        nextUrl.searchParams.set("dnt", "1");
        nextUrl.searchParams.set("api", "1");
        nextUrl.searchParams.set("player_id", `video-loader-${embedId}`);
        return nextUrl.toString();
    }, [embedId, videoSrc]);

    useEffect(() => {
        if (!shouldMountIframe || !iframeRef.current) {
            return;
        }

        let isCancelled = false;
        let player: {
            on: (eventName: string, callback: (...args: unknown[]) => void) => void;
            off: (eventName: string, callback: (...args: unknown[]) => void) => void;
            ready: () => Promise<void>;
            play: () => Promise<unknown>;
            setLoop: (loop: boolean) => Promise<unknown>;
            setMuted: (muted: boolean) => Promise<unknown>;
            setVolume: (volume: number) => Promise<unknown>;
            destroy: () => Promise<unknown>;
        } | null = null;

        const clearRetryTimer = () => {
            if (retryTimerRef.current === null) {
                return;
            }

            window.clearTimeout(retryTimerRef.current);
            retryTimerRef.current = null;
        };

        const markVideoPlaying = () => {
            if (isCancelled) {
                return;
            }

            clearRetryTimer();
            hasPlaybackStartedRef.current = true;
            setIsVideoPlaying(true);
            setShowRetryButton(false);
        };

        const markVideoUnavailable = () => {
            if (isCancelled || hasPlaybackStartedRef.current) {
                return;
            }

            setIsVideoPlaying(false);
            setShowRetryButton(true);
        };

        const setupPlayer = async () => {
            try {
                const { default: VimeoPlayer } = await import("@vimeo/player");

                if (isCancelled || !iframeRef.current) {
                    return;
                }

                player = new VimeoPlayer(iframeRef.current);

                player.on("play", markVideoPlaying);
                player.on("playing", markVideoPlaying);
                player.on("error", markVideoUnavailable);

                retryTimerRef.current = window.setTimeout(() => {
                    markVideoUnavailable();
                }, PLAYER_RETRY_TIMEOUT_MS);

                await player.ready();

                if (isCancelled || !player) {
                    return;
                }

                await player.setLoop(true).catch(() => undefined);
                await player.setMuted(true).catch(() => undefined);
                await player.setVolume(0).catch(() => undefined);
                await player.play().catch(() => undefined);
            } catch {
                markVideoUnavailable();
            }
        };

        void setupPlayer();

        return () => {
            isCancelled = true;
            clearRetryTimer();

            if (!player) {
                return;
            }

            player.off("play", markVideoPlaying);
            player.off("playing", markVideoPlaying);
            player.off("error", markVideoUnavailable);
            void player.destroy().catch(() => undefined);
        };
    }, [iframeUrl, reloadCount, shouldMountIframe]);

    const iframeSizingClass =
        fillMode === "contain"
            ? "absolute inset-0 h-full w-full"
            : "absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.77777778vh] min-w-full -translate-x-1/2 -translate-y-1/2";

    const posterFitClass = fillMode === "contain" ? "object-contain" : "object-cover";

    return (
        <div ref={containerRef} className={`relative h-full w-full overflow-hidden bg-black ${className}`}>
            <div
                className={`absolute inset-0 z-10 transition-opacity duration-[1000ms] ${
                    isVideoPlaying ? "pointer-events-none opacity-0" : "opacity-100"
                }`}
            >
                <Image
                    src={poster}
                    alt=""
                    fill
                    priority={posterPriority}
                    sizes={fillMode === "contain" ? "(min-width: 1024px) 58vw, 100vw" : "100vw"}
                    className={`${posterFitClass} ${scale}`}
                />
                {showRetryButton ? (
                    <div className="absolute inset-x-0 bottom-6 flex justify-center px-4">
                        <button
                            type="button"
                            onClick={() => {
                                hasPlaybackStartedRef.current = false;
                                setShowRetryButton(false);
                                setIsVideoPlaying(false);
                                setShouldMountIframe(true);
                                setReloadCount((count) => count + 1);
                            }}
                            className="rounded-full border border-white/35 bg-black/70 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-black/85"
                        >
                            영상 다시 불러오기
                        </button>
                    </div>
                ) : null}
            </div>

            {shouldMountIframe ? (
                <iframe
                    key={`${iframeUrl}-${reloadCount}`}
                    ref={iframeRef}
                    src={iframeUrl}
                    frameBorder="0"
                    loading={loadStrategy === "in-view" ? "lazy" : "eager"}
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title={title}
                    className={`${iframeSizingClass} z-0 transition-opacity duration-[1000ms] ${
                        isVideoPlaying ? "opacity-100" : "opacity-0"
                    }`}
                />
            ) : null}
        </div>
    );
};

export default VideoLoader;
