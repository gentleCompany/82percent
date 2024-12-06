'use client'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { directorsData } from '@/app/data/directors'
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function DirectorDetail() {
    const params = useParams();
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const archiveRef = useRef(null);
    const isArchiveInView = useInView(archiveRef, { once: true });
    const introduceRef = useRef(null);
    const isIntroduceInView = useInView(introduceRef, { once: true });
    const projectsRef = useRef(null);
    const isProjectsInView = useInView(projectsRef, { once: true });

    const director = directorsData[params.id as keyof typeof directorsData];

    if (!director) {
        return <div>디렉터를 찾을 수 없습니다.</div>
    }

    return (
        <div className="mx-auto ">
            {director.bg ? (
                <div className="relative h-screen overflow-hidden">
                    <iframe
                        src={director.bg}
                        frameBorder="0"
                        allow="autoplay; fullscreen"
                        className="absolute top-1/2 left-1/2 w-[177.77777778vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2"
                        title="test1"
                    ></iframe>

                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{
                            opacity: 1,

                            x: 0,
                            transition: {
                                duration: 1.2,
                                ease: "easeOut",
                                delay: 0.3
                            }
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
                            transition: { duration: 1 }
                        }}
                    >
                        <div className="pl-6 font-black text-lg md:text-xl lg:text-3xl ">
                            {director.name}
                        </div>
                    </motion.div>
                </div>
            )}
            <div className=''>
                <motion.div
                    ref={introduceRef}
                    style={{
                        transform: isIntroduceInView ? "none" : "translateY(20px)",
                        opacity: isIntroduceInView ? 1 : 0,
                        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
                    }}
                >
                    <div className="text-center pt-20">
                        <p className='text-lg pb-2'>beyond the frame</p>
                        <p className='text-sm'>경계를 넘어서는 시각적 스토리텔링으로 유럽과 아시아를 잇는 디렉터. 독창적인 미학과 정교한 연출력으로 브랜드의 가치를 새롭게 정의합니다.</p>
                    </div>

                    <div className="text-center pt-20">
                        <p className='text-lg pb-2'>visual storyteller</p>
                        <p className='text-sm'>트랜디한 감성과 예술적 직감이 교차하는 지점에서 감각적인 비주얼을 창조하는 크리에이터. 영화적 연출과 몰입도 있는 영상으로 브랜드의 진정성을 담아냅니다.</p>
                    </div>



                </motion.div>
            </div>
            <motion.div
                ref={archiveRef}
                style={{
                    transform: isArchiveInView ? "none" : "translateY(20px)",
                    opacity: isArchiveInView ? 1 : 0,
                    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
                }}
            >
                <h1 className="pl-6 font-black text-lg md:text-xl lg:text-3xl pb-10 pt-20">PORTFOLIO</h1>
            </motion.div>

            <div
                ref={projectsRef}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 "
            >
                {director.projects.map((project, index) => (
                    <motion.div
                        key={index}
                        style={{
                            transform: isProjectsInView ? "none" : "translateY(50px)",
                            opacity: isProjectsInView ? 1 : 0,
                            transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.5 + index * 0.1}s`
                        }}
                        className="cursor-pointer "
                        onClick={() => setSelectedVideo(project.videoUrl)}
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
                    className="fixed  inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
                    onClick={() => setSelectedVideo(null)}
                >
                    <div className="w-[90vw] relative aspect-video">

                        <iframe
                            src={selectedVideo}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </div>
    );
}