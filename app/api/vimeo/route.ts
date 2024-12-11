import { NextRequest, NextResponse } from "next/server";

const VIMEO_ACCESS_TOKEN = process.env.NEXT_PUBLIC_VIMEO_ACCESS_TOKEN;

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const videoId = searchParams.get("videoId");




    if (!videoId) {
        return NextResponse.json({ error: "Video ID is required" }, { status: 400 });
    }

    try {
        const response = await fetch(`https://api.vimeo.com/videos/${videoId}?fields=play`, {
            method: "GET",
            headers: {
                Authorization: `bearer ${VIMEO_ACCESS_TOKEN}`,
                Accept: "application/vnd.vimeo.*+json;version=3.4",
                'Content-Type': 'application/json',
            },
        });

        // 응답 상태 코드 확인
        if (!response.ok) {
            console.error("Vimeo API error:", response.status, response.statusText);
            return NextResponse.json(
                { error: `Vimeo API error: ${response.statusText}` },
                { status: response.status }
            );
        }

        // 전체 응답 로깅
        const rawResponse = await response.text();
        console.log("Raw API Response:", rawResponse);

        // JSON으로 다시 파싱
        const data = JSON.parse(rawResponse);

        if (!response.ok) {
            console.error("Vimeo API error:", response.status, response.statusText);
            return NextResponse.json(
                { error: `Vimeo API error: ${response.statusText}` },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}