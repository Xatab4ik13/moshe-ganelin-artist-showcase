import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { useSession } from "@tanstack/react-start/server";

import { dbQuery } from "./db.server";

export type AdminSessionData = { userId?: number; email?: string };

function sessionPassword(): string {
  const secret = process.env["SESSION_SECRET"];
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET не задан (нужна строка от 32 символов).");
  }
  return secret;
}

export function getAdminSession() {
  return useSession<AdminSessionData>({
    password: sessionPassword(),
    name: "mg-admin",
    maxAge: 60 * 60 * 24 * 14,
    cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
  });
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [scheme, salt, hash] = stored.split("$");
  if (scheme !== "scrypt" || !salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  if (candidate.length !== expected.length) return false;
  return timingSafeEqual(candidate, expected);
}

export type AdminUser = { id: number; email: string; password_hash: string };

export async function findAdminByEmail(email: string): Promise<AdminUser | null> {
  const rows = await dbQuery<AdminUser>(
    "SELECT id, email, password_hash FROM admin_users WHERE lower(email) = lower($1) LIMIT 1",
    [email],
  );
  return rows[0] ?? null;
}

export async function requireAdmin(): Promise<{ id: number; email: string }> {
  const session = await getAdminSession();
  const userId = session.data.userId;
  const email = session.data.email;
  if (!userId || !email) {
    throw new Error("Нужно войти в админ-панель.");
  }
  return { id: userId, email };
}
