import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { readSessionToken, SESSION_COOKIE } from "./session";

export const getAdminSession = async () => {
  const jar = await cookies();

  return readSessionToken(jar.get(SESSION_COOKIE)?.value);
};

export const requireAdmin = async () => {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
};
