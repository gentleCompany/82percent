// 'use client';

// import React, { useState, useEffect } from 'react';

// interface VimeoDownloaderProps {
//     videoUrl: string; // Vimeo 비디오 URL
// }

// const VimeoDownloader: React.FC<VimeoDownloaderProps> = ({ videoUrl }) => {
//     const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
//     const [isLoading, setIsLoading] = useState<boolean>(false);

//     useEffect(() => {
//         const fetchDownloadUrl = async () => {
//             try {
//                 const response = await fetch(`/api/vimeo-download?videoUrl=${encodeURIComponent(videoUrl)}`, {
//                     method: 'GET', // 반드시 GET으로 설정
//                 });

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }

//                 const data = await response.json();
//                 console.log(data);
//             } catch (error) {
//                 console.error('Error fetching download URL:', error);
//             }
//         };

//         fetchDownloadUrl();
//     }, [videoUrl]);

//     if (isLoading) {
//         return <p style={{ textAlign: 'center', marginTop: '20px' }}>Fetching download link...</p>;
//     }

//     if (!downloadUrl) {
//         return <p style={{ textAlign: 'center', marginTop: '20px' }}>Unable to fetch video download link.</p>;
//     }

//     return (
//         <div style={{ textAlign: 'center', marginTop: '20px' }}>
//             <video controls autoPlay style={{ width: '100%', maxWidth: '800px' }}>
//                 <source src={downloadUrl} type="video/mp4" />
//                 Your browser does not support the video tag.
//             </video>
//         </div>
//     );
// };

// export default VimeoDownloader;