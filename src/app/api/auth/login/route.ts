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

type AdminUser = {
  email: string;
  password: string;
};

const loadAdmins = (): AdminUser[] => {
  const users: AdminUser[] = [];
  const raw = process.env.ADMIN_USERS;

  if (raw) {
    try {
      const parsed = JSON.parse(raw) as Array<{ email?: string; password?: string }>;

      if (Array.isArray(parsed)) {
        for (const item of parsed) {
          const email = item?.email?.trim().toLowerCase();
          const password = item?.password;

          if (email && password) {
            users.push({ email, password });
          }
        }
      }
    } catch {
      users.length = 0;
    }
  }

  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (email && password && !users.some((user) => user.email === email)) {
    users.push({ email, password });
  }

  return users;
};

export async function POST(request: NextRequest) {
  const admins = loadAdmins();

  if (admins.length === 0 || !process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json({ error: "Вход не настроен" }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const email = String(body?.email ?? "").trim().toLowerCase();
  const password = String(body?.password ?? "");
  const valid = admins.some(
    (admin) => safeEqual(email, admin.email) && safeEqual(password, admin.password),
  );

  if (!valid) {
    return NextResponse.json({ error: "Неверная почта или пароль" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set(SESSION_COOKIE, await createSessionToken(email), sessionCookieOptions());

  return response;
}
