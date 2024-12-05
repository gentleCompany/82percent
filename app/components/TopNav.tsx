"use client";

import Link from "next/link";
import Image from 'next/image';
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';

export default function TopNav() {
    const [scrolled, setScrolled] = useState(false);
    const [gap, setGap] = useState("gap-6");
    const [leftPosition, setLeftPosition] = useState(0);
    const pathname = usePathname();

    const getActiveIndex = () => {
        if (pathname === '/contents/aboutus') return 0;
        if (pathname.includes('/contents/directors')) return 1;
        if (pathname === '/contents/contactus') return 2;
        return -1;
    };

    // 화면 크기에 따른 left 위치와 gap 계산
    const updateLayout = () => {
        if (typeof window === 'undefined') return;

        const isMobile = window.innerWidth < 768;
        setGap(isMobile ? "gap-6" : "gap-20");
        setLeftPosition(isMobile
            ? getActiveIndex() * 120  // 모바일: gap-10 (40px) + width-24 (96px) = 136px
            : getActiveIndex() * 176  // 데스크톱: gap-20 (80px) + width-24 (96px) = 176px
        );
    };

    useEffect(() => {
        updateLayout();

        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        const handleResize = () => {
            updateLayout();
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [pathname]);

    const menuItems = [
        { href: "/contents/aboutus", label: "ABOUT US" },
        { href: "/contents/directors", label: "DIRECTOR" },
        { href: "/contents/contactus", label: "CONTACT US" },
    ];

    return (
        <nav className={`fixed top-0 w-full mx-auto z-50 transition-all duration-300 
            ${scrolled ? 'py-2 bg-black/50 backdrop-blur-sm' : 'py-6 bg-transparent'}`}>
            <motion.div
                className="relative text-[30px] md:text-[40px] font-black text-center mb-4 md:mb-6 w-[250px] mx-auto"
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
                    className="text-white cursor-pointer pl-[6px] flex justify-center items-center"
                >
                    <Link href="/"> <Image src={"/82DELAW.png"} alt={"82PERCENT"} width={100} height={100} /></Link>
                </motion.div>
                <motion.div
                    variants={{
                        initial: { opacity: 0, y: -50, pointerEvents: "none" },
                        hover: { opacity: 1, y: 0, pointerEvents: "auto" }
                    }}
                    transition={{
                        duration: 0.2,
                    }}
                    className="absolute top-0 left-0 right-0 text-white cursor-pointer  flex justify-center items-center"
                >
                    <Link href="/"><Image src={"/82PERCENTDELAW.png"} alt={"82PERCENT"} width={400} height={200} /></Link>
                </motion.div>
            </motion.div>
            <div className="w-full">
                <div className="flex justify-center items-center text-white text-sm font-bold">
                    <div className="relative">
                        <div className={`flex ${gap} transition-all duration-300`}>
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
                            className="absolute bottom-[-8px] h-[2px] bg-white"
                            initial={false}
                            animate={{
                                width: '96px',
                                left: `${leftPosition}px`,
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