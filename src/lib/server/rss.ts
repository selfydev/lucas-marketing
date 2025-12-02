import { fetchRecentBlogPostsForRSS } from "./queries";

/**
 * Generate RSS 2.0 XML feed
 */
export async function generateRSSFeed(): Promise<string> {
  const baseUrl = "https://meetlucas.ai";
  const buildDate = new Date().toUTCString();

  const posts = await fetchRecentBlogPostsForRSS(20);

  const escapeXml = (unsafe: string) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  };

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Lucas AI Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Practical guidance for every stage of the admissions journey. Learn how Lucas supports students with essays, interviews, and application strategy.</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${baseUrl}/assets/logo.svg</url>
      <title>Lucas AI Blog</title>
      <link>${baseUrl}/blog</link>
    </image>
${posts
  .map(
    (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description>${escapeXml(post.excerpt || "")}</description>
      <author>${escapeXml(post.authorName || "Lucas AI Team")}</author>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>`;
}
