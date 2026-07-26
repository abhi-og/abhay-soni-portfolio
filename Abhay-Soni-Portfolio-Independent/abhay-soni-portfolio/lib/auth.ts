import { cookies } from "next/headers";
import { env } from "cloudflare:workers";

const COOKIE_NAME = "abhay_admin_session";
const SESSION_SECONDS = 60 * 60 * 24 * 7;
const encoder = new TextEncoder();
const decoder = new TextDecoder();

type RuntimeBindings = {
  ADMIN_EMAIL?: string;
  ADMIN_PASSWORD?: string;
  SESSION_SECRET?: string;
};

type SessionPayload = {
  email: string;
  exp: number;
};

function runtimeBindings(): RuntimeBindings {
  return env as unknown as RuntimeBindings;
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(value: string): Uint8Array {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function hmac(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return toBase64Url(new Uint8Array(signature));
}

async function safeEqual(left: string, right: string): Promise<boolean> {
  const [leftHash, rightHash] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(left)),
    crypto.subtle.digest("SHA-256", encoder.encode(right)),
  ]);
  const leftBytes = new Uint8Array(leftHash);
  const rightBytes = new Uint8Array(rightHash);
  let difference = 0;
  for (let index = 0; index < leftBytes.length; index += 1) {
    difference |= leftBytes[index] ^ rightBytes[index];
  }
  return difference === 0;
}

export async function validateAdminCredentials(
  email: string,
  password: string,
): Promise<boolean> {
  const bindings = runtimeBindings();
  const configuredEmail = bindings.ADMIN_EMAIL?.trim().toLowerCase();
  const configuredPassword = bindings.ADMIN_PASSWORD;
  if (!configuredEmail || !configuredPassword || !bindings.SESSION_SECRET) {
    return false;
  }

  const [emailMatches, passwordMatches] = await Promise.all([
    safeEqual(email.trim().toLowerCase(), configuredEmail),
    safeEqual(password, configuredPassword),
  ]);
  return emailMatches && passwordMatches;
}

export async function createAdminSession(email: string): Promise<string> {
  const secret = runtimeBindings().SESSION_SECRET;
  if (!secret) throw new Error("Admin login is not configured.");

  const payload: SessionPayload = {
    email: email.trim().toLowerCase(),
    exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS,
  };
  const encodedPayload = toBase64Url(encoder.encode(JSON.stringify(payload)));
  return `${encodedPayload}.${await hmac(encodedPayload, secret)}`;
}

async function verifyAdminSession(token: string): Promise<SessionPayload | null> {
  const secret = runtimeBindings().SESSION_SECRET;
  const configuredEmail = runtimeBindings().ADMIN_EMAIL?.trim().toLowerCase();
  if (!secret || !configuredEmail) return null;

  const [encodedPayload, suppliedSignature, extra] = token.split(".");
  if (!encodedPayload || !suppliedSignature || extra) return null;

  const expectedSignature = await hmac(encodedPayload, secret);
  if (!(await safeEqual(suppliedSignature, expectedSignature))) return null;

  try {
    const payload = JSON.parse(
      decoder.decode(fromBase64Url(encodedPayload)),
    ) as SessionPayload;
    if (
      payload.email !== configuredEmail ||
      !Number.isFinite(payload.exp) ||
      payload.exp <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export async function getAdminUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const session = await verifyAdminSession(token);
  if (!session) return null;
  return {
    displayName: "Abhay Soni",
    email: session.email,
    fullName: "Abhay Soni",
  };
}

export function adminSessionCookie(token: string): string {
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_SECONDS}`;
}

export function expiredAdminSessionCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}
