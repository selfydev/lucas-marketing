import type { PortableTextBlock } from "@portabletext/types";
import type { BlogPost } from "@/lib/types/blog";
import { blogPostBySlugQuery, blogPostProjection } from "@/lib/types/blog";
import { sanityClient } from "../sanity";

export const BLOG_PAGE_SIZE = 9;

interface BlogIndexResponse {
  posts: BlogPost[];
  total: number;
}

export interface BlogIndexResult extends BlogIndexResponse {
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function fetchBlogIndex({
  page = 1,
  pageSize = BLOG_PAGE_SIZE,
}: Partial<{ page: number; pageSize: number }> = {}): Promise<BlogIndexResult> {
  const clampedPage = Number.isInteger(page) && page && page > 0 ? page : 1;
  const safePageSize = Number.isInteger(pageSize) && pageSize && pageSize > 0 ? pageSize : BLOG_PAGE_SIZE;
  const start = (clampedPage - 1) * safePageSize;
  const end = start + safePageSize;

  const query = `{
    "posts": *[_type == "Post"] | order(PublishedAt desc) [$start...$end] ${blogPostProjection},
    "total": count(*[_type == "Post"])
  }`;

  const result = await sanityClient.fetch<BlogIndexResponse>(query, {
    start,
    end,
  });

  const totalPages = Math.max(1, Math.ceil(result.total / safePageSize));

  return {
    ...result,
    page: clampedPage,
    pageSize: safePageSize,
    totalPages,
  };
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!slug) {
    return null;
  }

  const post = await sanityClient.fetch<BlogPost | null>(blogPostBySlugQuery, {
    slug,
  });

  return post ?? null;
}

export async function fetchAllBlogSlugs(): Promise<string[]> {
  const slugs = await sanityClient.fetch<string[]>(
    '*[_type == "Post" && defined(SlugCurrent.current)].SlugCurrent.current',
  );

  return slugs.filter(Boolean);
}

export function calculateReadingTime(blocks?: PortableTextBlock[]) {
  if (!blocks?.length) {
    return null;
  }

  const words = blocks
    .flatMap((block) => {
      if (block._type !== "block" || !("children" in block)) {
        return [] as string[];
      }

      return (block.children ?? [])
        .map((child) => (typeof child === "object" && "text" in child ? (child as { text?: string }).text ?? "" : ""))
        .join(" ")
        .split(/\s+/);
    })
    .filter(Boolean);

  if (!words.length) {
    return null;
  }

  return Math.max(1, Math.ceil(words.length / 200));
}
