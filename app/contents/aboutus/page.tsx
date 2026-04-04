"use client";
import Image from "next/image";
import { motion } from "motion/react";


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
                    <div className="flex justify-center pb-4">
                        <Image
                            src="/82PERCENTW.png"
                            alt="82PERCENT"
                            width={887}
                            height={83}
                            priority
                            className="h-auto w-[13rem] sm:w-[16rem] lg:w-[21rem]"
                        />
                    </div>
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
                    <div className="hidden text-center text-sm leading-7 sm:block">
                        <p>82PERCENT는 브랜드의 매력을</p>
                        <p>더 선명하게 만드는 영상 제작사입니다.</p>
                        <div className="mt-4">
                            <p>우리는 멋진 영상과 감각적인 연출을 넘어,</p>
                            <p>브랜드의 목표와 타깃, 시장의 흐름까지 정확히 읽으며,</p>
                            <p>결과로 연결되는 콘텐츠를 만듭니다.</p>
                        </div>
                        <div className="mt-4">
                            <p>기획부터 촬영, 편집까지 모든 과정을 인하우스로 직접 진행하며,</p>
                            <p>각 브랜드의 목적과 상황에 맞는 맞춤형 솔루션을 설계합니다.</p>
                        </div>
                    </div>

                    {/* 모바일 버전 */}
                    <div className="text-sm leading-7 text-center sm:hidden">
                        <p>82PERCENT는 브랜드의 매력을</p>
                        <p>더 선명하게 만드는 영상 제작사입니다.</p>
                        <div className="mt-4">
                            <p>우리는 멋진 영상과 감각적인 연출을 넘어,</p>
                            <p>브랜드의 목표와 타깃, 시장의 흐름까지 정확히 읽으며,</p>
                            <p>결과로 연결되는 콘텐츠를 만듭니다.</p>
                        </div>
                        <div className="mt-4">
                            <p>기획부터 촬영, 편집까지 모든 과정을 인하우스로 직접 진행하며,</p>
                            <p>각 브랜드의 목적과 상황에 맞는 맞춤형 솔루션을 설계합니다.</p>
                        </div>
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
                        <div>
                            <p className="text-sm leading-7 text-center">
                                {`트렌디한 감각, 분명한 메시지, 그리고 실제 반응까지`}
                            </p>
                            <p className="text-sm leading-7 text-center">
                                {`완성도 있게 담아내는 것이 82PERCENT의 방식입니다.`}
                            </p>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm leading-7 text-center">
                                {`저희는 영상을 만드는 팀을 넘어,`}
                            </p>
                            <p className="text-sm leading-7 text-center">
                                {`브랜드가 더 또렷하게 보이고`}
                            </p>
                            <p className="text-sm leading-7 text-center">
                                {`더 힘 있게 움직일 수 있도록 함께하는 파트너가 되겠습니다.`}
                            </p>
                        </div>
                    </div>

                    {/* 모바일 버전 */}
                    <div className="sm:hidden">
                        <div>
                            <p className="text-sm leading-7 text-center">
                                {`트렌디한 감각, 분명한 메시지, 그리고 실제 반응까지`}
                            </p>
                            <p className="text-sm leading-7 text-center">
                                {`완성도 있게 담아내는 것이 82PERCENT의 방식입니다.`}
                            </p>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm leading-7 text-center">
                                {`저희는 영상을 만드는 팀을 넘어,`}
                            </p>
                            <p className="text-sm leading-7 text-center">
                                {`브랜드가 더 또렷하게 보이고`}
                            </p>
                            <p className="text-sm leading-7 text-center">
                                {`더 힘 있게 움직일 수 있도록 함께하는 파트너가 되겠습니다.`}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
