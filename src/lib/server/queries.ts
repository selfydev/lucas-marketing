import { createClient } from "@sanity/client";

/**
 * Create a Sanity client for server-side operations
 */
function getSanityClient() {
  return createClient({
    projectId: process.env.VITE_SANITY_PROJECT_ID || "your-project-id",
    dataset: process.env.VITE_SANITY_DATASET || "production",
    apiVersion: "2025-02-15",
    useCdn: true,
  });
}

export interface RSSPost {
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  authorName: string;
}

/**
 * Fetch recent blog posts for RSS feed generation
 */
export async function fetchRecentBlogPostsForRSS(
  limit = 20,
): Promise<RSSPost[]> {
  const client = getSanityClient();

  const query = `*[_type == "Post" && !(_id in path("drafts.**"))] | order(PublishedAt desc) [0...${limit}] {
    Title,
    "slug": SlugCurrent.current,
    PublishedAt,
    Excerpt,
    "authorName": Author->Name
  }`;

  const posts = await client.fetch<any[]>(query);

  return posts.map((post) => ({
    title: post.Title || "",
    slug: post.slug || "",
    publishedAt: post.PublishedAt || new Date().toISOString(),
    excerpt: post.Excerpt || "",
    authorName: post.authorName || "Lucas AI Team",
  }));
}
