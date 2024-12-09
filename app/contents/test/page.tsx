"use client"

import { useEffect, useState } from "react";

export default function Home() {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideoUrl = async () => {
            try {
                const response = await fetch(`/api/vimeo?videoId=1035446953`);

                if (!response.ok) {
                    console.error("API Response:", await response.text());
                    throw new Error("Failed to fetch video URL");
                }
                console.log(videoUrl);
                const data = await response.json();
                setVideoUrl(data.url);
            } catch (error) {
                console.error("Error fetching video URL:", error);
            }
        };

        fetchVideoUrl();
    }, []);

    return (
        <div className="video-background">
            <video autoPlay loop muted>
                <source src={'https://player.vimeo.com/progressive_redirect/download/1035446953/container/0cbe5765-0ace-494c-90f4-dba9297be54b/ed1ca746-6358c728/%EA%B0%95%EC%9D%B8%EC%84%9D%EA%B0%90%EB%8F%85%EB%8B%98%EB%B0%B0%EA%B2%BD%20%281080p%29.mp4?expires=1733796506&loc=external&signature=3ad9d52e7ea3f6e927591a307824e19d9171e51f635a8e06c3b8385c4fb1ae18'} type="video/mp4" />
            </video>
            <style jsx>{`
        .video-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
        }

        video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
        </div>
    );
}