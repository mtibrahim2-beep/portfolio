import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const base = siteUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: base, lastModified: "2026-11-15", changeFrequency: "monthly", priority: 1 }];
}
