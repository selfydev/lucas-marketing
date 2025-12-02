import type { BlogPost } from "@/lib/types/blog";

export function formatPublishedDate(publishedAt?: string | null) {
  if (!publishedAt) {
    return null;
  }

  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(publishedAt));
  } catch (error) {
    return null;
  }
}

export function buildPostOgImage(post: BlogPost) {
  if (post.coverImage?.url) {
    return post.coverImage.url;
  }

  return "https://meetlucas.ai/og-image-lucas-optimized.jpg";
}
