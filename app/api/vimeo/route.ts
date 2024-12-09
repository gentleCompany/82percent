import { NextRequest, NextResponse } from "next/server";

const VIMEO_ACCESS_TOKEN = '7eb12fb6dd1dabe90f12271821e919d1';

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
                Authorization: `Bearer ${VIMEO_ACCESS_TOKEN}`,
                Accept: "application/vnd.vimeo.*+json;version=3.4",
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

        // 응답 데이터 가져오기
        const data = await response.json();
        console.log("Vimeo API Response:", JSON.stringify(data, null, 2));

        // 응답 데이터를 클라이언트에 반환
        return NextResponse.json(data);
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}