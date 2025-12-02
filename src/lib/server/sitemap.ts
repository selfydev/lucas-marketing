import { createClient } from "@sanity/client";

/**
 * Create a Sanity client for server-side operations
 */
function getSanityClient() {
  const projectId = process.env.VITE_SANITY_PROJECT_ID;
  const dataset = process.env.VITE_SANITY_DATASET;
  if (!projectId) {
    throw new Error("Missing required environment variable: VITE_SANITY_PROJECT_ID");
  }
  if (!dataset) {
    throw new Error("Missing required environment variable: VITE_SANITY_DATASET");
  }
  return createClient({
    projectId,
    dataset,
    apiVersion: "2025-02-15",
    useCdn: true,
  });
}

export interface SitemapPost {
  slug: string;
}

/**
 * Fetch all published blog post slugs for sitemap generation
 */
export async function fetchAllBlogSlugsForSitemap(): Promise<string[]> {
  const client = getSanityClient();
  const slugs = await client.fetch<string[]>(
    '*[_type == "Post" && defined(SlugCurrent.current)].SlugCurrent.current',
  );

  return slugs.filter(Boolean);
}

/**
 * Generate sitemap XML
 */
export async function generateSitemapXML(): Promise<string> {
  const baseUrl = "https://meetlucas.ai";
  const currentDate = new Date().toISOString();

  const staticRoutes = [
    { path: "/", priority: "1.0", changefreq: "daily" },
    { path: "/about", priority: "0.8", changefreq: "monthly" },
    { path: "/contact", priority: "0.7", changefreq: "monthly" },
    { path: "/blog", priority: "0.9", changefreq: "daily" },
  ];

  const blogSlugs = await fetchAllBlogSlugsForSitemap();

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join("\n")}
${blogSlugs
  .map(
    (slug) => `  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;
}
