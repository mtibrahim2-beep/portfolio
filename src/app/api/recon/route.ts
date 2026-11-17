import { Redis } from "@upstash/redis";
import { connection } from "next/server";

/*
 * The hero reconciliation's shared clock: how long the most recent visitor took to reconcile.
 * Stored in Upstash Redis (provisioned through the Vercel Marketplace). With no store
 * configured the route reports `enabled: false` and the panel falls back to the visitor's own time.
 */
const KEY = "recon:last";
const MIN_MS = 1_000; // four deliberate clicks can't take less than this
const MAX_MS = 60 * 60 * 1000;

type Last = { ms: number; at: number };

function store(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  return url && token ? new Redis({ url, token }) : null;
}

export async function GET() {
  await connection();
  const redis = store();
  if (!redis) return Response.json({ enabled: false, last: null });
  try {
    const last = await redis.get<Last>(KEY);
    return Response.json({ enabled: true, last }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ enabled: false, last: null }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const redis = store();
  if (!redis) return Response.json({ enabled: false }, { status: 503 });

  let ms: unknown;
  try {
    ({ ms } = (await request.json()) as { ms?: unknown });
  } catch {
    return Response.json({ error: "Invalid body" }, { status: 400 });
  }
  if (typeof ms !== "number" || !Number.isFinite(ms) || ms < MIN_MS || ms > MAX_MS) {
    return Response.json({ error: "Out of range" }, { status: 400 });
  }

  try {
    // One write per address every few seconds keeps scripted spam from churning the value.
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const fresh = await redis.set(`recon:throttle:${ip}`, 1, { nx: true, ex: 3 });
    if (!fresh) return Response.json({ error: "Too many requests" }, { status: 429 });

    const last: Last = { ms: Math.round(ms), at: Date.now() };
    await redis.set(KEY, last);
    return Response.json({ enabled: true, last });
  } catch {
    return Response.json({ enabled: false }, { status: 503 });
  }
}
