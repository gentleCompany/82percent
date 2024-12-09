import { NextResponse } from 'next/server';
import axios from 'axios';

// Vimeo Access Token (환경 변수로 관리)
const VIMEO_ACCESS_TOKEN = '8a9f697b2e908e30fd1ae7aed73df0d1';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const videoUrl = searchParams.get('videoUrl');

    if (!videoUrl) {
        return NextResponse.json({ error: 'Video URL is required' }, { status: 400 });
    }


    try {
        // Vimeo API 호출
        const response = await axios.get(`https://api.vimeo.com/videos/${videoUrl}`, {
            headers: {
                Authorization: `Bearer ${VIMEO_ACCESS_TOKEN}`,
            },
        });

        const videoData = response.data;
        console.log(videoData);

        // 다운로드 링크 추출
        const downloadLinks = videoData.download;

        if (!downloadLinks || downloadLinks.length === 0) {
            return NextResponse.json({ error: 'No download links available for this video' }, { status: 404 });
        }

        // 가장 높은 품질의 다운로드 링크 선택
        const bestQualityLink = downloadLinks[0].link;

        return NextResponse.json({ downloadUrl: bestQualityLink });
    } catch (error) {
        console.error('Error fetching video data:', error);
        return NextResponse.json({ error: 'Failed to fetch video data' }, { status: 500 });
    }
}