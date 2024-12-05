"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';

export default function TopNav() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // 현재 활성화된 메뉴의 인덱스 계산
    const getActiveIndex = () => {
        if (pathname === '/contents/aboutus') return 0;
        if (pathname.includes('/contents/directors')) return 1;
        if (pathname === '/contents/archives') return 2;
        if (pathname === '/contents/exhibitions') return 3;
        if (pathname === '/contents/origins') return 4;
        if (pathname === '/contents/stuffs') return 5;
        return -1;
    };

    const menuItems = [
        { href: "/contents/aboutus", label: "ABOUT US" },
        { href: "/contents/directors", label: "DIRECTOR" },
        // { href: "/contents/archives", label: "ARCHIVES" },
        // { href: "/contents/exhibitions", label: "EXHIBITIONS" },
        // { href: "/contents/origins", label: "ORIGINS" },
        // { href: "/contents/stuffs", label: "STUFFS" }
    ];

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`fixed top-0 w-full mx-auto z-50 transition-all duration-300 
            ${scrolled ? 'py-4 bg-black/50 backdrop-blur-sm' : 'py-8 bg-transparent'}`}>
            <motion.div
                className="relative text-[40px] font-black text-center mb-6 w-[250px] mx-auto"
                whileHover="hover"
                initial="initial"
            >
                <motion.div
                    variants={{
                        initial: { opacity: 1, y: 0, pointerEvents: "auto" },
                        hover: { opacity: 0, y: 50, pointerEvents: "none" }
                    }}
                    transition={{
                        duration: 0.2,
                    }}
                    className="text-white cursor-pointer pl-[10px]"
                >
                    <Link href="/">82%</Link>
                </motion.div>
                <motion.div
                    variants={{
                        initial: { opacity: 0, y: -50, pointerEvents: "none" },
                        hover: { opacity: 1, y: 0, pointerEvents: "auto" }
                    }}
                    transition={{
                        duration: 0.2,
                    }}
                    className="absolute top-0 left-0 right-0 text-white cursor-pointer"
                >
                    <Link href="/">82PERCENT</Link>
                </motion.div>
            </motion.div>
            <div className="w-full">
                <div className="flex justify-center items-center gap-20 text-white text-sm font-bold">
                    <div className="relative">
                        <div className="flex gap-20">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="hover:text-gray-300 transition-colors w-24 text-center"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                        <motion.div
                            className="absolute bottom-[-8px] h-[2px] bg-white "
                            initial={false}
                            animate={{
                                width: '96px',
                                left: `${getActiveIndex() * 176}px`,
                                opacity: getActiveIndex() >= 0 ? 1 : 0
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30
                            }}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}