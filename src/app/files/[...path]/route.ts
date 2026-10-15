import { NextRequest, NextResponse } from "next/server";

import { blobUrlFromPublicPath } from "@/shared/lib/public-file-url";

interface RouteParams {
  params: Promise<{ path: string[] }>;
}

const FORWARDED_HEADERS = [
  "content-type",
  "content-length",
  "content-disposition",
  "accept-ranges",
  "content-range",
  "etag",
  "last-modified",
  "cache-control",
];

const proxyFile = async (request: NextRequest, path: string[]) => {
  const target = blobUrlFromPublicPath(path);

  if (!target) {
    return NextResponse.json({ error: "Некорректный файл" }, { status: 400 });
  }

  const headers = new Headers();
  const range = request.headers.get("range");

  if (range) {
    headers.set("range", range);
  }

  let upstream: Response;

  try {
    upstream = await fetch(target, {
      method: request.method,
      headers,
    });
  } catch {
    return NextResponse.json({ error: "Файл временно недоступен" }, { status: 502 });
  }

  const responseHeaders = new Headers();

  for (const name of FORWARDED_HEADERS) {
    const value = upstream.headers.get(name);

    if (value) {
      responseHeaders.set(name, value);
    }
  }

  responseHeaders.set("x-content-type-options", "nosniff");

  return new NextResponse(request.method === "HEAD" ? null : upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
};

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { path } = await params;

  return proxyFile(request, path);
}

export async function HEAD(request: NextRequest, { params }: RouteParams) {
  const { path } = await params;

  return proxyFile(request, path);
}
