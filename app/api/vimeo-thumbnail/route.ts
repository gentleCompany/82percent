import { NextRequest, NextResponse } from "next/server";

const VIMEO_OEMBED_ENDPOINT = "https://vimeo.com/api/oembed.json";

const extractVideoId = (videoUrl: string | null): string | null => {
    if (!videoUrl) {
        return null;
    }

    const match = videoUrl.match(/video\/(\d+)/);
    return match ? match[1] : null;
};

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const videoIdParam = searchParams.get("videoId");
    const videoUrlParam = searchParams.get("videoUrl");
    const videoId = videoIdParam || extractVideoId(videoUrlParam);

    if (!videoId) {
        return NextResponse.json({ error: "Video ID is required" }, { status: 400 });
    }

    try {
        const requestUrl = new URL(VIMEO_OEMBED_ENDPOINT);
        requestUrl.searchParams.set("url", `https://vimeo.com/${videoId}`);

        const response = await fetch(requestUrl.toString(), {
            next: { revalidate: 86400 },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: `Vimeo thumbnail fetch failed: ${response.statusText}` },
                { status: response.status }
            );
        }

        const data = await response.json();

        return NextResponse.json({
            thumbnailUrl: data.thumbnail_url ?? "",
        });
    } catch (error) {
        console.error("Unexpected Vimeo thumbnail error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
