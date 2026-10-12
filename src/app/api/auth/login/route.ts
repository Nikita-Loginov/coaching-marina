import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/shared/lib/prisma";
import { verifyPassword } from "@/shared/lib/password";
import {
  createSessionToken,
  sessionCookieOptions,
  SESSION_COOKIE,
} from "@/shared/lib/session";

export async function POST(request: NextRequest) {
  if (!process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json({ error: "Вход не настроен" }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const email = String(body?.email ?? "").trim().toLowerCase();
  const password = String(body?.password ?? "");
  const user = email
    ? await prisma.user.findUnique({ where: { email } })
    : null;
  const valid = await verifyPassword(password, user?.passwordHash ?? null);

  if (!valid) {
    return NextResponse.json({ error: "Неверная почта или пароль" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set(SESSION_COOKIE, await createSessionToken(email), sessionCookieOptions());

  return response;
}
