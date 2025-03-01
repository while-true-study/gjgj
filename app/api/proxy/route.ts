import { NextResponse } from "next/server";
import http from "http";
import https from "https";

// interface ProxyResponse {
//   statusCode: number;
//   headers: Record<string, string | string[] | undefined>;
//   data: Buffer;
// }

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  const protocol = url.startsWith("https") ? https : http;

  return new Promise((resolve) => {
    protocol
      .get(url, (proxyRes) => {
        const chunks: Buffer[] = [];
        proxyRes.on("data", (chunk: Buffer) => chunks.push(chunk));
        proxyRes.on("end", () => {
          const buffer = Buffer.concat(chunks);
          const headers = new Headers(
            proxyRes.headers as Record<string, string>
          );
          resolve(
            new NextResponse(buffer, { status: proxyRes.statusCode, headers })
          );
        });
      })
      .on("error", (e: Error) => {
        resolve(NextResponse.json({ error: e.message }, { status: 500 }));
      });
  });
}
