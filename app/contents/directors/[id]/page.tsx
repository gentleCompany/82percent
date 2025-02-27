'use client'

import { useParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { directorsData } from '@/app/data/directors';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/app/data/directors';
import VideoLoader from '@/app/components/MainVideoPlayer';

export default function DirectorDetail() {
    const params = useParams();
    const [selectedVideo, setSelectedVideo] = useState<Project | null>(null);
    const archiveRef = useRef(null);
    const isArchiveInView = useInView(archiveRef, { once: true });
    const introduceRef = useRef(null);
    const isIntroduceInView = useInView(introduceRef, { once: true });
    const projectsRef = useRef(null);
    const isProjectsInView = useInView(projectsRef, { once: true });

    const director = directorsData[params.id as keyof typeof directorsData];

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

    if (!director) {
        return <div>디렉터를 찾을 수 없습니다.</div>;
    }

    return (
        <div className="mx-auto">
            {director.bg ? (
                <div className="relative h-screen overflow-hidden">
                    <VideoLoader
                        videoSrc={director.bg}
                        poster={director.bgThumbnail}
                        scale={director.id === 'changminkim' ? 'scale-[1.5]' : 'scale-[1]'}
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

            {/* 디렉터 얼굴과 타이틀/디스크립션을 한 행에 배치 */}
            <motion.div
                ref={introduceRef}
                style={{
                    transform: isIntroduceInView ? 'none' : 'translateY(20px)',
                    opacity: isIntroduceInView ? 1 : 0,
                    transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
                }}
                className={`flex flex-col md:flex-row items-center justify-center py-20 my-20 mx-10 ${director.name === 'KYUHWAN SIM' ? 'h-[600px] my-[200px]' : ''} md:my-0`}
            >
                {/* 디렉터 얼굴 이미지 */}
                {director.name == 'KYUHWAN SIM' ? (<div> <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
                    className=""
                >
               <div className="w-[300px]  h-[380px] relative">
                                <Image
                                    src={director.face}
                                    alt="director face"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        
                    
                </motion.div></div>) : (<div></div>)}
               

                {/* 타이틀 및 디스크립션 */}
                {director.name == 'KYUHWAN SIM' ? (<div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0, transition: { duration: 1, delay: 0.3 } }}
                        className="md:pl-10 text-center pt-5 md:pt-0  md:text-left"
                    >
                        <p className="text-xl md:text-2xl lg:text-3xl font-bold pb-2 ">
                            {director.title}
                        </p>
                        <p className="text-base pb-10 md:mb-8">
                            {director.description}
                        </p>
                        <p className="text-base">
                            <div className='pb-1'>LIVE CLIP 라이브 클립</div>
                            <div className='pb-1'>BRAND FILM 브랜드 필름</div>
                            <div className='pb-1'>YOUTUBE CONTENT 유튜브 콘텐츠</div>
                            <div className='pb-1'>WEB Entertainment 웹 예능</div>
                            <div className='pb-1'>INTER VIEW 인터뷰</div>
                            
                        </p>
                    </motion.div>
                    </div>) : (<div><motion.div
                    ref={introduceRef}
                    style={{
                        transform: isIntroduceInView ? 'none' : 'translateY(20px)',
                        opacity: isIntroduceInView ? 1 : 0,
                        transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
                    }}
                >
                    <div className="text-center py-20 my-20">
                        <motion.p
                            className="text-xl md:text-2xl lg:text-3xl pb-2 font-bold"
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
                            <p className="text-sm px-2">{director.description}</p>
                        </motion.div>
                    </div>
                </motion.div></div>)}
                
            </motion.div>

            <motion.div
                ref={archiveRef}
                style={{
                    transform: isArchiveInView ? 'none' : 'translateY(20px)',
                    opacity: isArchiveInView ? 1 : 0,
                    transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.7s',
                }}
            >
                <h1 className="pl-6 font-black text-lg md:text-xl lg:text-3xl pb-10">PORTFOLIO</h1>
            </motion.div>

            <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {director.projects.map((project, index) => (
                    <motion.div
                        key={index}
                        style={{
                            transform: isProjectsInView ? 'none' : 'translateY(50px)',
                            opacity: isProjectsInView ? 1 : 0,
                            transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.7 + index * 0.2}s`,
                        }}
                        className="cursor-pointer mb-6"
                        onClick={() => setSelectedVideo(project)}
                    >
                        <div className="aspect-video relative mb-4">
                            <Image
                                src={project.thumbnail}
                                alt={project.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h3 className="text-sm mb-4">{project.title}</h3>
                    </motion.div>
                ))}
            </div>

            {/* 비디오 모달 */}
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
                            className="absolute -top-7 right-0 text-white text-base md:-top-9 md:text-xl hover:opacity-75 transition-opacity"
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
