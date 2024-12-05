"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Directors() {
    const directors = [
        { name: "INSUK KANG", path: "/contents/directors/insukkang" },
        { name: "CHANGMIN KIM", path: "/contents/directors/changminkim" },
        // { name: "SEONGUK LEE", path: "/contents/directors/seonguklee" },

    ];

    return (
        <div className="mx-auto overflow-hidden">
            <div className="relative h-screen">
                <iframe
                    src="https://player.vimeo.com/video/1036199449?h=501af63d2b&background=1&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
                    frameBorder="0"
                    allow="autoplay; fullscreen; "
                    className="absolute top-1/2 left-1/2 w-[177.77777778vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2"
                    title="test1"
                ></iframe>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto">
                    {directors.map((director, index) => (
                        <motion.div
                            key={director.name}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                transition: { duration: 1, delay: index * 0.2 }
                            }}

                        >
                            <Link href={director.path}>
                                <h3 className="mb-3 md:mb-6 font-bold text-center text-xl md:text-3xl">{director.name}</h3>
                            </Link>
                        </motion.div>
                    ))}
                </div>

            </div>

        </div>
    );
}