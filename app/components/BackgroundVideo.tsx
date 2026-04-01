'use client';

import { useMemo, useState } from 'react';
import styles from './BackgroundVideo.module.css';

interface BackgroundVideoProps {
    videoId: string; // Vimeo 비디오 ID를 받는 프로퍼티
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ videoId }) => {
    const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
    const iframeSrc = useMemo(() => {
        const embedUrl = new URL(`https://player.vimeo.com/video/${videoId}`);
        embedUrl.searchParams.set('autoplay', '1');
        embedUrl.searchParams.set('loop', '1');
        embedUrl.searchParams.set('muted', '1');
        embedUrl.searchParams.set('background', '1');
        embedUrl.searchParams.set('autopause', '0');
        embedUrl.searchParams.set('title', '0');
        embedUrl.searchParams.set('byline', '0');
        embedUrl.searchParams.set('portrait', '0');
        embedUrl.searchParams.set('badge', '0');
        return embedUrl.toString();
    }, [videoId]);

    return (
        <div className={styles.videoContainer}>
            {!isVideoLoaded && <div className={styles.loadingSpinner}>Loading...</div>}
            <iframe
                key={iframeSrc}
                src={iframeSrc}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                title={`background-video-${videoId}`}
                onLoad={() => setIsVideoLoaded(true)}
                className={`${styles.vimeoBackground} ${isVideoLoaded ? styles.visible : styles.hidden}`}
            />
        </div>
    );
};

export default BackgroundVideo;
