import { Link } from "@tanstack/react-router";

import { AuthorBadge } from "@/components/blog/AuthorBadge";
import { TagPill } from "@/components/blog/TagPill";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPublishedDate } from "@/lib/blog";
import type { BlogPost } from "@/lib/types/blog";

interface BlogCardProps {
  page: number;
  post: BlogPost & { readingTime?: number | null };
}

function BlogCard({ page, post }: BlogCardProps) {
  const formattedDate = formatPublishedDate(post.publishedAt);
  const readTimeLabel = post.readingTime
    ? `${post.readingTime} min read`
    : null;
  const coverAlt = post.coverImage?.alt || post.title;

  return (
    <article className="h-full">
      <Card className="group h-full gap-0 overflow-hidden p-0">
        {post.coverImage?.url ? (
          <Link
            aria-label={`Read ${post.title}`}
            className="relative block aspect-[4/3] overflow-hidden"
            params={{ slug: post.slug }}
            search={{ page }}
            to="/blog/$slug"
          >
            <img
              alt={coverAlt}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              loading="lazy"
              src={post.coverImage.url}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-slate-900/15 to-transparent"
              aria-hidden="true"
            />
          </Link>
        ) : null}

        <CardContent className="flex h-full flex-col gap-4 p-6">
          <div className="flex flex-wrap gap-2" aria-label="Categories">
            {post.categories?.map((category) => (
              <TagPill key={category._id}>{category.title}</TagPill>
            ))}
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-slate-900 text-xl leading-tight">
              <Link
                className="transition hover:text-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
                params={{ slug: post.slug }}
                search={{ page }}
                to="/blog/$slug"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-slate-600 text-sm">
              {post.excerpt || "Continue reading"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-medium text-slate-500 text-xs">
            {formattedDate ? <span>{formattedDate}</span> : null}
            {readTimeLabel ? <span aria-hidden="true">•</span> : null}
            {readTimeLabel ? <span>{readTimeLabel}</span> : null}
          </div>

          <div className="mt-auto flex items-center justify-between gap-4 pt-2">
            <AuthorBadge author={post.author} />
            <Button asChild size="sm" variant="ghost">
              <Link
                params={{ slug: post.slug }}
                search={{ page }}
                to="/blog/$slug"
              >
                Read post
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}

export { BlogCard };
