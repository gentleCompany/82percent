"use client";
import { motion } from "framer-motion";



export default function AboutUs() {
    return (
        <div className="w-full h-screen flex justify-center items-center ">
            <div className="flex flex-col gap-4 max-w-[920px] mx-auto text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        transition: { duration: 1 }
                    }}
                >
                    <h1 className="text-3xl lg:text-5xl font-black pb-4">82PERCENT</h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        transition: { duration: 1, delay: 0.3 }
                    }}
                >
                    {/* PC 버전 */}
                    <div className="text-sm leading-7 text-center hidden sm:block">
                        <p>82PERCENT는 파리의 감성을 담아내는 프리미엄 영상 프로덕션입니다.</p>
                        <p>광고영상, 룩북 등 클라이언트의 브랜드가 꿈꾸는 모든 순간을 예술적 감성으로 채워드립니다.</p>
                        <p>15년간 유럽 현지에서 쌓아온 전문성과 네트워크를 통해 최적의 로케이션 선정 및 현지 협찬까지</p>
                        <p>효율적인 솔루션으로 해외에서의 성공적인 촬영을 약속드립니다.</p>
                    </div>

                    {/* 모바일 버전 */}
                    <div className="text-sm leading-7 text-center sm:hidden">
                        <p>82PERCENT는 파리의 감성을 담아내는 프리미엄 영상 프로덕션입니다. 광고영상, 룩북 등 클라이언트의 브랜드가 꿈꾸는 모든 순간을 예술적 감성으로 채워드립니다.</p>
                        <p>15년간 유럽 현지에서 쌓아온 전문성과 네트워크를 통해 최적의 로케이션 선정 및 현지 협찬까지 효율적인 솔루션으로 해외에서의 성공적인 촬영을 약속드립니다.</p>


                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        transition: { duration: 1, delay: 0.5 }
                    }}
                >
                    {/* PC 버전 */}
                    <div className="hidden sm:block">
                        <p className="text-sm leading-7 text-center">
                            {`82PERCENT는 독창적인 시각과 신선한 아이디어로 차별화된 콘텐츠를 만들어 내고`}
                        </p>
                        <p className="text-sm leading-7 text-center">
                            {`기술과 창의성의 조화를 통해 클라이언트의 비전을 실현하는 디지털 크리에이티브의 새로운 기준을 만들어가겠습니다.`}
                        </p>
                    </div>

                    {/* 모바일 버전 */}
                    <div className="sm:hidden">
                        <p className="text-sm leading-7 text-center">
                            {`82PERCENT는 독창적인 시각과 신선한 아이디어로 차별화된 콘텐츠를 만들어 내고 기술과 창의성의 조화를 통해 클라이언트의 비전을 실현하는 디지털 크리에이티브의 새로운 기준을 만들어가겠습니다.`}
                        </p>
                        <p className="text-sm leading-7 text-center">
                            {``}
                        </p>

                    </div>
                </motion.div>
            </div>
        </div>
    );
}