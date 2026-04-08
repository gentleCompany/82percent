'use client'

import { useState, useRef, useEffect, useId, useMemo } from 'react';
import { motion, useInView } from "motion/react";
import Image from 'next/image';
import VideoLoader from '@/app/components/MainVideoPlayer';
import { Director, Project } from '@/app/data/directors';

type DirectorDetailClientProps = {
    director: Director;
};

const MODAL_PLAYER_RETRY_TIMEOUT_MS = 5000;

const buildProjectEmbedUrl = (videoUrl: string, playerId: string) => {
    const iframeUrl = new URL(videoUrl);
    iframeUrl.searchParams.set('autopause', '0');
    iframeUrl.searchParams.set('title', '0');
    iframeUrl.searchParams.set('byline', '0');
    iframeUrl.searchParams.set('portrait', '0');
    iframeUrl.searchParams.set('badge', '0');
    iframeUrl.searchParams.set('dnt', '1');
    iframeUrl.searchParams.set('autoplay', '1');
    iframeUrl.searchParams.set('muted', '0');
    iframeUrl.searchParams.set('playsinline', '1');
    iframeUrl.searchParams.set('api', '1');
    iframeUrl.searchParams.set('player_id', playerId);
    return iframeUrl.toString();
};

function DirectorProjectModal({
    project,
    thumbnailSrc,
    dimensions,
    onClose,
}: {
    project: Project;
    thumbnailSrc: string;
    dimensions: { width: number; height: number };
    onClose: () => void;
}) {
    const iframeRef = useRef<HTMLIFrameElement | null>(null);
    const retryTimerRef = useRef<number | null>(null);
    const hasPlayerLoadedRef = useRef(false);
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [showRetryButton, setShowRetryButton] = useState(false);
    const [reloadCount, setReloadCount] = useState(0);
    const playerId = useId().replace(/:/g, '');

    const iframeUrl = useMemo(() => {
        return buildProjectEmbedUrl(project.videoUrl ?? '', `director-project-${playerId}`);
    }, [playerId, project.videoUrl]);

    useEffect(() => {
        let isCancelled = false;
        let player: {
            on: (eventName: string, callback: (...args: unknown[]) => void) => void;
            off: (eventName: string, callback: (...args: unknown[]) => void) => void;
            ready: () => Promise<void>;
            play: () => Promise<unknown>;
            destroy: () => Promise<unknown>;
        } | null = null;

        const clearRetryTimer = () => {
            if (retryTimerRef.current === null) {
                return;
            }

            window.clearTimeout(retryTimerRef.current);
            retryTimerRef.current = null;
        };

        const markPlayerReady = () => {
            if (isCancelled) {
                return;
            }

            clearRetryTimer();
            hasPlayerLoadedRef.current = true;
            setIsPlayerReady(true);
            setShowRetryButton(false);
        };

        const markPlayerUnavailable = () => {
            if (isCancelled || hasPlayerLoadedRef.current) {
                return;
            }

            setIsPlayerReady(false);
            setShowRetryButton(true);
        };

        const setupPlayer = async () => {
            try {
                const { default: VimeoPlayer } = await import('@vimeo/player');

                if (isCancelled || !iframeRef.current) {
                    return;
                }

                player = new VimeoPlayer(iframeRef.current);

                player.on('loaded', markPlayerReady);
                player.on('play', markPlayerReady);
                player.on('playing', markPlayerReady);
                player.on('error', markPlayerUnavailable);

                retryTimerRef.current = window.setTimeout(() => {
                    markPlayerUnavailable();
                }, MODAL_PLAYER_RETRY_TIMEOUT_MS);

                await player.ready();

                if (isCancelled || !player) {
                    return;
                }

                await player.play().catch(() => undefined);
            } catch {
                markPlayerUnavailable();
            }
        };

        hasPlayerLoadedRef.current = false;
        setIsPlayerReady(false);
        setShowRetryButton(false);
        void setupPlayer();

        return () => {
            isCancelled = true;
            clearRetryTimer();

            if (!player) {
                return;
            }

            player.off('loaded', markPlayerReady);
            player.off('play', markPlayerReady);
            player.off('playing', markPlayerReady);
            player.off('error', markPlayerUnavailable);
            void player.destroy().catch(() => undefined);
        };
    }, [iframeUrl, reloadCount]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 px-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
        >
            <div className="relative" onClick={(event) => event.stopPropagation()}>
                <div
                    className="relative overflow-hidden bg-black"
                    style={{
                        width: `${dimensions.width}px`,
                        height: `${dimensions.height}px`
                    }}
                >
                    <div
                        className={`absolute inset-0 z-10 transition-opacity duration-500 ${
                            isPlayerReady ? 'pointer-events-none opacity-0' : 'opacity-100'
                        }`}
                    >
                        {thumbnailSrc ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={thumbnailSrc}
                                alt={project.title}
                                className="h-full w-full object-cover"
                                loading="eager"
                            />
                        ) : (
                            <div className="flex h-full w-full items-end bg-neutral-900 p-6">
                                <div className="text-base font-semibold leading-snug text-white">
                                    {project.title}
                                </div>
                            </div>
                        )}
                        {showRetryButton ? (
                            <div className="absolute inset-x-0 bottom-6 flex justify-center px-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        hasPlayerLoadedRef.current = false;
                                        setIsPlayerReady(false);
                                        setShowRetryButton(false);
                                        setReloadCount((count) => count + 1);
                                    }}
                                    className="rounded-full border border-white/35 bg-black/70 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-black/85"
                                >
                                    영상 다시 불러오기
                                </button>
                            </div>
                        ) : null}
                    </div>

                    <iframe
                        key={`${iframeUrl}-${reloadCount}`}
                        ref={iframeRef}
                        src={iframeUrl}
                        style={{
                            width: `${dimensions.width}px`,
                            height: `${dimensions.height}px`
                        }}
                        frameBorder="0"
                        loading="eager"
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        title={project.title}
                        className={`transition-opacity duration-500 ${isPlayerReady ? 'opacity-100' : 'opacity-0'}`}
                    />
                </div>
                <button
                    className="absolute -top-7 right-0 text-base text-white transition-opacity hover:opacity-75 md:-top-9 md:text-xl"
                    onClick={onClose}
                >
                    닫기 ✕
                </button>
            </div>
        </div>
    );
}

export default function DirectorDetailClient({ director }: DirectorDetailClientProps) {
    const [selectedVideo, setSelectedVideo] = useState<Project | null>(null);
    const [vimeoThumbnails, setVimeoThumbnails] = useState<Record<number, string>>({});
    const archiveRef = useRef(null);
    const isArchiveInView = useInView(archiveRef, { once: true });
    const introduceRef = useRef(null);
    const isIntroduceInView = useInView(introduceRef, { once: true });
    const projectsRef = useRef(null);
    const isProjectsInView = useInView(projectsRef, { once: true });
    const hasFaceImage = Boolean(director.face);

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

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

    const getProjectThumbnailSrc = (project: Project) => {
        return project.thumbnail || vimeoThumbnails[project.id] || '';
    };

    useEffect(() => {
        const updateDimensions = () => {
            if (selectedVideo) {
                const dims = calculateDimensions(
                    selectedVideo.aspectRatio || '16:9',
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
        if (director.id !== 'hwangmugyeol') {
            setVimeoThumbnails({});
            return;
        }

        let isCancelled = false;

        const projectsNeedingThumbnails = director.projects.filter(
            (project) => !project.thumbnail && project.videoUrl
        );

        if (!projectsNeedingThumbnails.length) {
            setVimeoThumbnails({});
            return;
        }

        void Promise.all(
            projectsNeedingThumbnails.map(async (project) => {
                try {
                    const response = await fetch(
                        `/api/vimeo-thumbnail?videoUrl=${encodeURIComponent(project.videoUrl ?? '')}`
                    );

                    if (!response.ok) {
                        return null;
                    }

                    const data = await response.json();

                    return data.thumbnailUrl ? [project.id, data.thumbnailUrl] as const : null;
                } catch (error) {
                    console.error(`Failed to load thumbnail for project ${project.id}:`, error);
                    return null;
                }
            })
        ).then((results) => {
            if (isCancelled) {
                return;
            }

            const thumbnailEntries = results.filter(
                (entry): entry is readonly [number, string] => Boolean(entry)
            );

            setVimeoThumbnails(Object.fromEntries(thumbnailEntries));
        }).catch((error) => {
            console.error('Failed to load Vimeo thumbnails:', error);
        });

        return () => {
            isCancelled = true;
        };
    }, [director]);

    return (
        <div className="mx-auto">
            {director.bg ? (
                <div className="relative h-screen overflow-hidden">
                    <VideoLoader
                        videoSrc={director.bg}
                        poster={director.bgThumbnail}
                        scale={director.id === 'changminkim' ? 'scale-[1.5]' : 'scale-[1]'}
                        posterPriority
                    />
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            transition: { duration: 1.2, ease: 'easeOut', delay: 0.3 },
                        }}
                        className="absolute top-1/2 transform -translate-y-1/2 z-10"
                    >
                        <div className="pl-4 font-black text-lg md:text-xl lg:text-3xl">
                            {director.name}
                        </div>
                    </motion.div>
                </div>
            ) : (
                <div className="h-[50vh] flex items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: { duration: 1 },
                        }}
                    >
                        <div className="pl-6 font-black text-lg md:text-xl lg:text-3xl ">
                            {director.name}
                        </div>
                    </motion.div>
                </div>
            )}

            <motion.div
                ref={introduceRef}
                style={{
                    transform: isIntroduceInView ? 'none' : 'translateY(20px)',
                    opacity: isIntroduceInView ? 1 : 0,
                    transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
                }}
                className={`flex flex-col md:flex-row items-center justify-center my-20 mx-10 ${hasFaceImage ? 'h-[600px] my-[200px]' : ''} md:my-0`}
            >
                {hasFaceImage ? (
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
                        >
                            <div className="relative h-[380px] w-[310px]">
                                <Image
                                    src={director.face}
                                    alt="director face"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                ) : null}

                {hasFaceImage ? (
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0, transition: { duration: 1, delay: 0.3 } }}
                            className="pt-5 text-center md:pl-10 md:pt-0 md:text-left"
                        >
                            <p className="pb-2 pt-1 text-2xl font-bold md:pt-0 md:text-2xl lg:text-3xl">
                                {director.title}
                            </p>
                            <p className="pb-10 text-sm opacity-[0.7] md:mb-8 md:text-lg lg:text-xl">
                                {director.description}
                            </p>
                            <div className="text-base font-semibold text-[#EEEEEE]">
                                <div className="pb-[3px]">Live Clip</div>
                                <div className="pb-[3px]">Brand Film</div>
                                <div className="pb-[3px]">Youtube Content</div>
                                <div className="pb-[3px]">Web Entertainment</div>
                                <div className="pb-[3px]">Inteview</div>
                            </div>
                        </motion.div>
                    </div>
                ) : (
                    <div>
                        <motion.div
                            style={{
                                transform: isIntroduceInView ? 'none' : 'translateY(20px)',
                                opacity: isIntroduceInView ? 1 : 0,
                                transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
                            }}
                        >
                            <div className="my-20 py-20 text-center">
                                <motion.p
                                    className="pb-2 text-xl font-bold md:text-2xl lg:text-3xl"
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        transition: { duration: 1, delay: 0.3 },
                                    }}
                                >
                                    {director.title}
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{
                                        opacity: isIntroduceInView ? 1 : 0,
                                        y: isIntroduceInView ? 0 : 15,
                                        transition: { duration: 1, delay: 0.5 },
                                    }}
                                >
                                    <p className="px-2 text-sm">{director.description}</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </motion.div>

            <motion.div
                ref={archiveRef}
                style={{
                    transform: isArchiveInView ? 'none' : 'translateY(20px)',
                    opacity: isArchiveInView ? 1 : 0,
                    transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.7s',
                }}
            >
                <h1 className="pb-10 pl-6 text-lg font-black md:text-xl lg:text-3xl">PORTFOLIO</h1>
            </motion.div>

            <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {director.projects.map((project, index) => {
                    const isVideoReady = Boolean(project.videoUrl);
                    const thumbnailSrc = getProjectThumbnailSrc(project);
                    const isRemoteThumbnail = thumbnailSrc.startsWith('http');

                    return (
                        <motion.div
                            key={index}
                            style={{
                                transform: isProjectsInView ? 'none' : 'translateY(50px)',
                                opacity: isProjectsInView ? 1 : 0,
                                transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.7 + index * 0.2}s`,
                            }}
                            className={`mb-6 ${isVideoReady ? 'cursor-pointer' : 'cursor-default opacity-70'}`}
                            onClick={() => {
                                if (isVideoReady) {
                                    setSelectedVideo(project);
                                }
                            }}
                        >
                            <div className="relative mb-4 aspect-video">
                                {thumbnailSrc ? (
                                    isRemoteThumbnail ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={thumbnailSrc}
                                            alt={project.title}
                                            className="h-full w-full object-cover"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <Image
                                            src={thumbnailSrc}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                        />
                                    )
                                ) : (
                                    <div className="flex h-full w-full items-end bg-neutral-900 p-4">
                                        <div className="text-sm font-medium leading-snug text-white">
                                            {project.title}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <h3 className="mb-4 pl-[5px] text-sm">{project.title}</h3>
                            {!isVideoReady ? (
                                <p className="text-xs text-white/60">영상 준비 중</p>
                            ) : null}
                        </motion.div>
                    );
                })}
            </div>

            {selectedVideo?.videoUrl && (
                <DirectorProjectModal
                    project={selectedVideo}
                    thumbnailSrc={getProjectThumbnailSrc(selectedVideo)}
                    dimensions={dimensions}
                    onClose={() => setSelectedVideo(null)}
                />
            )}
        </div>
    );
}
