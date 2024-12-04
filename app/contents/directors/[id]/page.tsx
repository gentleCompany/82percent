'use client'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { directorsData } from '@/app/data/directors'
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function DirectorDetail() {
    const params = useParams();
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const archiveRef = useRef(null);
    const isArchiveInView = useInView(archiveRef, { once: true });
    const projectsRef = useRef(null);
    const isProjectsInView = useInView(projectsRef, { once: true });

    const director = directorsData[params.id as keyof typeof directorsData];

    if (!director) {
        return <div>디렉터를 찾을 수 없습니다.</div>
    }

    return (
        <div className="mx-auto px-4 py-8">
            {director.bg ? (
                <div className="relative h-screen overflow-hidden">
                    <iframe
                        src={director.bg}
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                        className="absolute top-1/2 left-1/2 w-[177.77777778vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2"
                        title="test1"
                    ></iframe>

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
                        className="absolute top-1/2 transform -translate-y-1/2 z-10"
                    >
                        <div className="pl-10 font-black text-base md:text-xl lg:text-3xl">
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
                        <div className="font-black text-4xl ">
                            {director.name}
                        </div>
                    </motion.div>
                </div>
            )}
            <motion.div
                ref={archiveRef}
                style={{
                    transform: isArchiveInView ? "none" : "translateY(20px)",
                    opacity: isArchiveInView ? 1 : 0,
                    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
                }}
            >
                <h1 className="text-4xl font-bold mb-8">ARCHIVE</h1>
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
                        className="cursor-pointer  mb-6"
                        onClick={() => setSelectedVideo(project.videoUrl)}
                    >
                        <div className="aspect-video relative mb-4">
                            <img
                                src={project.thumbnail}
                                alt={project.title}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <h3 className="text-base font-semibold">{project.title}</h3>
                    </motion.div>
                ))}
            </div>

            {/* 비디오 모달 */}
            {selectedVideo && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
                    onClick={() => setSelectedVideo(null)}
                >
                    <div className="w-[90vw] h-[90vh] relative">
                        <button
                            className="absolute -top-10 right-0 text-white text-xl"
                            onClick={() => setSelectedVideo(null)}
                        >
                            닫기 ✕
                        </button>
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