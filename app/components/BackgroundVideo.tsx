'use client';

import { useEffect, useRef, useState } from 'react';
import Player from '@vimeo/player';
import styles from './BackgroundVideo.module.css';

interface BackgroundVideoProps {
    videoId: string; // Vimeo 비디오 ID를 받는 프로퍼티
}

interface PlayerOptions {
    url: string;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
    background?: boolean;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ videoId }) => {
    const videoRef = useRef<HTMLDivElement>(null); // 비디오 컨테이너 참조
    const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (!videoRef.current) return;

        const options: PlayerOptions = {
            url: '29474908',
            autoplay: true,
            loop: true,
            muted: true,
            background: true,
        };

        const player = new Player(videoRef.current, options);



        player.on('loaded', () => {
            setIsVideoLoaded(true);
            console.log("Video loaded:", videoId);
        });

        player.on('error', (error) => {
            console.error("Vimeo player error:", error);
        });

        return () => {
            player.destroy();
        };
    }, [videoId]);

    return (
        <div className={styles.videoContainer}>
            {!isVideoLoaded && <div className={styles.loadingSpinner}>Loading...</div>}
            <div
                ref={videoRef}
                className={`${styles.vimeoBackground} ${isVideoLoaded ? styles.visible : styles.hidden}`}
            ></div>
        </div>
    );
};

export default BackgroundVideo;