import { NextResponse } from "next/server";
import http from "http";

export async function GET(request: Request): Promise<NextResponse> {
  return handleProxy(request, "GET");
}

export async function POST(request: Request): Promise<NextResponse> {
  return handleProxy(request, "POST");
}

async function handleProxy(
  request: Request,
  method: "GET" | "POST"
): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  // 🔥 HTTPS → HTTP 변환
  const httpTargetUrl = targetUrl.replace(/^https:\/\//i, "http://");

  return new Promise<NextResponse>(async (resolve) => {
    const options = {
      method,
      headers: {
        "Content-Type":
          request.headers.get("Content-Type") || "application/json",
      },
    };

    const proxyReq = http.request(httpTargetUrl, options, (proxyRes) => {
      const chunks: Buffer[] = [];
      proxyRes.on("data", (chunk: Buffer) => chunks.push(chunk));
      proxyRes.on("end", () => {
        const buffer = Buffer.concat(chunks);

        // Headers 변환
        const headers = new Headers();
        Object.entries(proxyRes.headers).forEach(([key, value]) => {
          if (value) {
            if (Array.isArray(value)) {
              value.forEach((v) => headers.append(key, v));
            } else {
              headers.set(key, value);
            }
          }
        });

        resolve(
          new NextResponse(buffer, { status: proxyRes.statusCode, headers })
        );
      });
    });

    proxyReq.on("error", (e: Error) => {
      resolve(NextResponse.json({ error: e.message }, { status: 500 }));
    });

    if (method === "POST") {
      const body = await request.text();
      proxyReq.write(body);
    }

    proxyReq.end();
  });
}
