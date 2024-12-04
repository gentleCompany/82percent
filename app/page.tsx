'use client'
import Image from "next/image";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const archiveTitleRef = useRef(null);
  const archiveItemsRef = useRef(null);
  const isArchiveTitleInView = useInView(archiveTitleRef, { once: true });
  const isArchiveItemsInView = useInView(archiveItemsRef, { once: true });

  const archiveItems = [
    {
      id: 1,
      src: "/inseokkangPFthumbnails/1.jpg",
      title: "Project Title 1",
      description: "Short description about the project",
      videoUrl: "https://player.vimeo.com/video/1035499391?h=c51f0d10ad&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
    },
    {
      id: 2,
      src: "/inseokkangPFthumbnails/2.jpg",
      title: "Project Title 2",
      description: "Short description about the project",
      videoUrl: "https://player.vimeo.com/video/1035885060?h=8b79da5bda&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"

    },
    {
      id: 3,
      src: "/inseokkangPFthumbnails/3.jpg",
      title: "Project Title 3",
      description: "Short description about the project",
      videoUrl: "https://player.vimeo.com/video/1035885474?h=8f39f17f0e&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
    },
    {
      id: 4,
      src: "/inseokkangPFthumbnails/4.jpg",
      title: "Project Title 4",
      description: "Short description about the project",
      videoUrl: "https://player.vimeo.com/video/1035886274?h=84efa739b9&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
    },
    {
      id: 5,
      src: "/inseokkangPFthumbnails/5.jpg",
      title: "Project Title 5",
      description: "Short description about the project",
      videoUrl: "https://player.vimeo.com/video/1035886303?h=5ffd34b434&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
    },
    {
      id: 6,
      src: "/inseokkangPFthumbnails/6.jpg",
      title: "Project Title 6",
      description: "Short description about the project",
      videoUrl: "https://player.vimeo.com/video/1035886358?h=107b412004&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
    },
    {
      id: 7,
      src: "/inseokkangPFthumbnails/7.jpg",
      title: "Project Title 7",
      description: "Short description about the project",
      videoUrl: "https://player.vimeo.com/video/1035886399?h=d11786fd79&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
    },
    {
      id: 8,
      src: "/inseokkangPFthumbnails/8.jpg",
      title: "Project Title 8",
      description: "Short description about the project",
      videoUrl: "https://player.vimeo.com/video/1035886446?h=249cc4eac9&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
    },
    {
      id: 9,
      src: "/inseokkangPFthumbnails/9.jpg",
      title: "Project Title 9",
      description: "Short description about the project",
      videoUrl: "https://player.vimeo.com/video/1035886714?h=d6e98322f5&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
    },
    {
      id: 10,
      src: "/inseokkangPFthumbnails/10.jpg",
      title: "Project Title 10",
      description: "Short description about the project",
      videoUrl: "https://player.vimeo.com/video/1035887058?h=767f61ba22&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
    },
    {
      id: 11,
      src: "/inseokkangPFthumbnails/11.jpg",
      title: "Project Title 11",
      description: "Short description about the project",
      videoUrl: "https://player.vimeo.com/video/1035887359?h=66540d39ac&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
    },
    {
      id: 12,
      src: "/inseokkangPFthumbnails/12.jpg",
      title: "Project Title 12",
      description: "Short description about the project",
      videoUrl: "https://player.vimeo.com/video/1035887408?h=9743a1867c&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
    }
  ];

  return (
    <div className="mx-auto">
      <div className="relative h-screen ">
        <iframe
          src="https://player.vimeo.com/video/1035446953?background=1&h=55124934f3&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
          frameBorder="0"
          allow="autoplay; fullscreen; "
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
          className="absolute top-1/2 transform -translate-y-1/2 z-10 pointer-events-auto"
        >
          <div className="pl-4 font-black text-base md:text-xl lg:text-3xl">
            INSEOK KANG
          </div>
        </motion.div>
      </div>

      <section className="">
        <div className="">
          <motion.h1
            ref={archiveTitleRef}
            style={{
              transform: isArchiveTitleInView ? "none" : "translateY(20px)",
              opacity: isArchiveTitleInView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
            }}
            className=" pl-4 font-black text-lg md:text-xl lg:text-3xl pb-10 pt-20"
          >
            ARCHIVE
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
                  onClick={() => setSelectedVideo(item.videoUrl || "")}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="px-2">
                  <h3 className=" text-base md:text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm mb-4">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
