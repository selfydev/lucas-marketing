import { AuthorBadge } from "@/components/blog/AuthorBadge";
import { TagPill } from "@/components/blog/TagPill";
import { formatPublishedDate } from "@/lib/blog";
import type { BlogPost } from "@/lib/types/blog";

interface PostHeaderProps {
  post: BlogPost & { readingTime?: number | null };
}

function PostHeader({ post }: PostHeaderProps) {
  const formattedDate = formatPublishedDate(post.publishedAt);
  const readTimeLabel = post.readingTime
    ? `${post.readingTime} min read`
    : null;

  return (
    <header className="relative isolate overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-emerald-50">
      <div className="absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="mx-auto grid max-w-5xl gap-10 px-6 pt-32 pb-12 sm:px-8 lg:grid-cols-5 lg:px-12">
        <div className="space-y-6 lg:col-span-3">
          <div className="flex flex-wrap gap-2" aria-label="Categories">
            {post.categories?.map((category) => (
              <TagPill key={category._id}>{category.title}</TagPill>
            ))}
          </div>

          <div className="space-y-4">
            <h1 className="font-bold text-4xl text-slate-900 leading-tight sm:text-5xl">
              {post.title}
            </h1>
            {post.excerpt ? (
              <p className="max-w-3xl text-lg text-slate-700">{post.excerpt}</p>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-3 font-medium text-slate-600 text-sm">
            {formattedDate ? <span>{formattedDate}</span> : null}
            {readTimeLabel ? <span aria-hidden="true">•</span> : null}
            {readTimeLabel ? <span>{readTimeLabel}</span> : null}
          </div>

          <AuthorBadge author={post.author} />
        </div>
        {post.coverImage?.url ? (
          <figure className="relative lg:col-span-2">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-xl ring-1 ring-slate-200">
              <img
                alt={post.coverImage.alt || post.title}
                className="h-full w-full object-cover"
                src={post.coverImage.url}
              />
            </div>
            {post.coverImage.caption ? (
              <figcaption className="mt-3 text-slate-600 text-sm">
                {post.coverImage.caption}
              </figcaption>
            ) : null}
          </figure>
        ) : null}
      </div>
    </header>
  );
}

export { PostHeader };
