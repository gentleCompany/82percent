"use client";
import { motion } from "framer-motion";

export default function AboutUs() {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="flex flex-col gap-4 max-w-[920px] mx-auto text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        transition: { duration: 1 }
                    }}
                >

                    <h1 className="  text-3xl lg:text-5xl font-black">82PERCENT</h1>
                    {/* <p>이성욱 골프대회 외국인, 화보촬영 , 가구,  </p> */}

                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        transition: { duration: 1.4 }
                    }}
                >
                    <p className="text-sm leading-7 whitespace-pre-wrap">
                        82PERCENT는 혁신이라는 가치를 핵심으로 삼고 있는 젊은 크리에이티브 스튜디오입니다.
                        우리는 디지털 시대의 새로운 가능성을 탐구하며, 독창적인 시각과 신선한 아이디어로 차별화된 콘텐츠를 만들어냅니다.
                        기술과 창의성의 조화를 통해 클라이언트의 비전을 실현하고, 끊임없는 도전과 혁신으로 디지털 크리에이티브의 새로운 기준을 만들어가겠습니다.
                    </p>
                </motion.div>

            </div>
        </div>
    );
}