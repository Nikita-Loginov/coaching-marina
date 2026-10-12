import { NextRequest, NextResponse } from "next/server";

import {
  createSessionToken,
  sessionCookieOptions,
  SESSION_COOKIE,
} from "@/shared/lib/session";

const safeEqual = (left: string, right: string) => {
  const encoder = new TextEncoder();
  const leftBytes = encoder.encode(left);
  const rightBytes = encoder.encode(right);

  if (leftBytes.length !== rightBytes.length) {
    return false;
  }

  let diff = 0;

  for (let index = 0; index < leftBytes.length; index += 1) {
    diff |= leftBytes[index] ^ rightBytes[index];
  }

  return diff === 0;
};

export async function POST(request: NextRequest) {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword || !process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json({ error: "Вход не настроен" }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const email = String(body?.email ?? "").trim().toLowerCase();
  const password = String(body?.password ?? "");
  const valid = safeEqual(email, adminEmail) && safeEqual(password, adminPassword);

  if (!valid) {
    return NextResponse.json({ error: "Неверная почта или пароль" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set(SESSION_COOKIE, await createSessionToken(email), sessionCookieOptions());

  return response;
}
