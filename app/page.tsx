"use client"

import Image from "next/image";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import VideoLoader from "./components/MainVideoPlayer";
import { directorsData } from "./data/directors";

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const archiveTitleRef = useRef(null);
  const archiveItemsRef = useRef(null);
  const isArchiveTitleInView = useInView(archiveTitleRef, { once: true });
  const isArchiveItemsInView = useInView(archiveItemsRef, { once: true });


  return (
    <div className="mx-auto overflow-hidden">
      <div className="relative h-screen">
        {/* Background Video */}
        <div style={{ width: "100%", height: "100vh" }} className="w-screen h-screen">
          <VideoLoader
            videoSrc="https://player.vimeo.com/video/1035446953?background=1&badge=0&autopause=0&player_id=0&app_id=58479"
            poster="/82bg.png"
          />
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 1.2, ease: "easeOut", delay: 0.3 },
          }}
          className="absolute top-1/2 transform -translate-y-1/2 z-10 pointer-events-auto"
        >
          <div className="pl-6 font-black text-base md:text-xl lg:text-3xl">
            INSUK KANG
          </div>
        </motion.div>
      </div>

      {/* Portfolio Section */}
      <section>
        <div>
          <motion.h1
            ref={archiveTitleRef}
            style={{
              transform: isArchiveTitleInView ? "none" : "translateY(20px)",
              opacity: isArchiveTitleInView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            }}
            className="pl-6 font-black text-lg md:text-xl lg:text-3xl pb-10 pt-20"
          >
            PORTFOLIO
          </motion.h1>

          <div ref={archiveItemsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
            {directorsData.insukkang.projects.map((item, index) => (
              <motion.div
                key={item.title}
                style={{
                  transform: isArchiveItemsInView ? "none" : "translateY(50px)",
                  opacity: isArchiveItemsInView ? 1 : 0,
                  transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.5 + index * 0.1}s`,
                }}
                className="relative"
              >
                <div
                  className="aspect-[16/9] relative mb-4 cursor-pointer"
                  onClick={() => setSelectedVideo(item.videoUrl || "")}
                >
                  <Image
                    src={item.thumbnail}
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

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="w-[90vw] aspect-video relative">
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