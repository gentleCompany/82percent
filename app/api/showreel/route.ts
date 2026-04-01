import { createReadStream, existsSync, type ReadStream } from "fs";
import { stat } from "fs/promises";
import path from "path";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

const videoPath = path.join(process.cwd(), "app", "img", "video", "showreel.mp4");

function createVideoHeaders(size: number, extraHeaders?: Record<string, string>) {
  return {
    "Accept-Ranges": "bytes",
    "Cache-Control": "public, max-age=3600",
    "Content-Type": "video/mp4",
    "Content-Length": size.toString(),
    ...extraHeaders
  };
}

function createVideoStream(stream: ReadStream, signal: AbortSignal) {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      let isClosed = false;

      const cleanup = () => {
        stream.removeAllListeners("data");
        stream.removeAllListeners("end");
        stream.removeAllListeners("error");
        signal.removeEventListener("abort", handleAbort);
      };

      const handleAbort = () => {
        if (isClosed) {
          return;
        }

        isClosed = true;
        cleanup();
        stream.destroy();
      };

      stream.on("data", (chunk: Buffer) => {
        if (isClosed) {
          return;
        }

        controller.enqueue(new Uint8Array(chunk));
      });

      stream.on("end", () => {
        if (isClosed) {
          return;
        }

        isClosed = true;
        cleanup();
        controller.close();
      });

      stream.on("error", (error) => {
        if (isClosed) {
          return;
        }

        isClosed = true;
        cleanup();
        controller.error(error);
      });

      signal.addEventListener("abort", handleAbort);
    },
    cancel() {
      stream.destroy();
    }
  });
}

export async function GET(request: NextRequest) {
  if (!existsSync(videoPath)) {
    return new Response("Showreel video not found.", { status: 404 });
  }

  const fileStats = await stat(videoPath);
  const fileSize = fileStats.size;
  const range = request.headers.get("range");

  if (!range) {
    const stream = createReadStream(videoPath);

    return new Response(createVideoStream(stream, request.signal), {
      headers: createVideoHeaders(fileSize)
    });
  }

  const [startValue, endValue] = range.replace("bytes=", "").split("-");
  const start = Number.parseInt(startValue, 10);
  const end = endValue ? Number.parseInt(endValue, 10) : fileSize - 1;

  if (Number.isNaN(start) || Number.isNaN(end) || start > end || end >= fileSize) {
    return new Response("Requested range not satisfiable.", {
      status: 416,
      headers: {
        "Content-Range": `bytes */${fileSize}`
      }
    });
  }

  const chunkSize = end - start + 1;
  const stream = createReadStream(videoPath, { start, end });

  return new Response(createVideoStream(stream, request.signal), {
    status: 206,
    headers: createVideoHeaders(chunkSize, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`
    })
  });
}
