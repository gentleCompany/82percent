export const fetchVimeoVideoUrl = async (videoId: string): Promise<string> => {
    try {
        const response = await fetch(`/api/vimeo?videoId=${videoId}`);

        if (!response.ok) {
            throw new Error("Failed to fetch video URL");
        }

        const data = await response.json();

        if (!data.url) {
            throw new Error("Video URL not found");
        }

        return data.url;
    } catch (error) {
        console.error(error);
        throw error;
    }
};