import { BlogCard } from "@/components/blog/BlogCard";
import type { BlogPost } from "@/lib/types/blog";

interface BlogListProps {
  page: number;
  posts: (BlogPost & { readingTime?: number | null })[];
}

function BlogList({ page, posts }: BlogListProps) {
  if (!posts.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center text-slate-700">
        No posts published yet. Please check back soon.
      </div>
    );
  }

  return (
    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" role="list">
      {posts.map((post) => (
        <li key={post._id} className="h-full">
          <BlogCard page={page} post={post} />
        </li>
      ))}
    </ul>
  );
}

export { BlogList };
