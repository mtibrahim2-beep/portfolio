import type { MetadataRoute } from "next";

const base = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: base, lastModified: "2026-11-15", changeFrequency: "monthly", priority: 1 }];
}
