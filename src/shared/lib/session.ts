export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 14;

export type AdminSession = {
  email: string;
  exp: number;
};

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

const toBase64Url = (bytes: Uint8Array) => {
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/g, "");
};

const fromBase64Url = (value: string) => {
  const padded = value.replaceAll("-", "+").replaceAll("_", "/") + "=".repeat((4 - (value.length % 4 || 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
};

const sign = async (secret: string, value: string) => {
  const key = await crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, textEncoder.encode(value));

  return toBase64Url(new Uint8Array(signature));
};

const safeEqual = (left: string, right: string) => {
  const leftBytes = textEncoder.encode(left);
  const rightBytes = textEncoder.encode(right);

  if (leftBytes.length !== rightBytes.length) {
    return false;
  }

  let diff = 0;

  for (let index = 0; index < leftBytes.length; index += 1) {
    diff |= leftBytes[index] ^ rightBytes[index];
  }

  return diff === 0;
};

export const sessionCookieOptions = (maxAge = SESSION_MAX_AGE) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge,
});

export const createSessionToken = async (email: string) => {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not set");
  }

  const payload = toBase64Url(
    textEncoder.encode(
      JSON.stringify({
        email,
        exp: Date.now() + SESSION_MAX_AGE * 1000,
      } satisfies AdminSession),
    ),
  );
  const signature = await sign(secret, payload);

  return `${payload}.${signature}`;
};

export const readSessionToken = async (
  token: string | undefined | null,
): Promise<AdminSession | null> => {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!token || !secret) {
    return null;
  }

  const [payload, signature] = token.split(".");

  if (!payload || !signature) {
    return null;
  }

  const expected = await sign(secret, payload);

  if (!safeEqual(signature, expected)) {
    return null;
  }

  try {
    const session = JSON.parse(textDecoder.decode(fromBase64Url(payload))) as AdminSession;

    if (!session.email || session.exp < Date.now()) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
};
