import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scrypt = promisify(scryptCallback);
const KEY_LENGTH = 64;
const FALLBACK_SALT = "00000000000000000000000000000000";
const FALLBACK_HASH = "0".repeat(KEY_LENGTH * 2);

export const hashPassword = async (password: string) => {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scrypt(password, salt, KEY_LENGTH)) as Buffer;

  return `scrypt$${salt}$${derived.toString("hex")}`;
};

export const verifyPassword = async (password: string, stored: string | null) => {
  const [, salt = FALLBACK_SALT, hash = FALLBACK_HASH] = (stored ?? "").split("$");
  const derived = (await scrypt(password, salt, KEY_LENGTH)) as Buffer;
  const expected = Buffer.from(hash, "hex");

  if (derived.length !== expected.length || !stored) {
    return false;
  }

  return timingSafeEqual(derived, expected);
};
