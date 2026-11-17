// Public address of the site. Used for canonical links, social previews, sitemap and robots.txt.
// Override with the SITE_URL environment variable if the domain changes.
export const siteUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_ENV === "production" ? "https://tauhid-ibrahim.vercel.app" : "http://localhost:3000");
