"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Directors() {
    const directors = [
        { name: "INSEOK KANG", path: "/contents/directors/inseokkang" },
        { name: "JONGHYUN KIM", path: "/contents/directors/jonghyunkim" },
        { name: "SEONGUK LEE", path: "/contents/directors/seonguklee" },

    ];

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center max-w-[920px] mx-auto font-bold text-center">
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
                        <h3 className="mb-4">{director.name}</h3>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}