import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { PostHeader } from "@/components/blog/PostHeader";
import { PortableTextContent } from "@/components/blog/PortableTextContent";
import { buildPostOgImage } from "@/lib/blog";
import {
  calculateReadingTime,
  fetchBlogPostBySlug,
} from "@/lib/queries/blog";
import type { BlogPost } from "@/lib/types/blog";
import { generateMetadata } from "@/lib/seo";

type BlogPostWithMeta = BlogPost & { readingTime: number | null };

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await fetchBlogPostBySlug(params.slug);

    if (!post) {
      throw notFound();
    }

    const readingTime = calculateReadingTime(post.body);

    return { ...post, readingTime } satisfies BlogPostWithMeta;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [], links: [], scripts: [] };
    }

    const seoTitle =
      loaderData.seo?.og?.title || loaderData.seo?.title || `${loaderData.title} | Lucas AI Blog`;
    const seoDescription =
      loaderData.seo?.og?.description || loaderData.seo?.description || loaderData.excerpt || loaderData.title;
    const seoImage = loaderData.seo?.og?.image?.url || buildPostOgImage(loaderData);

    const metadata = generateMetadata({
      title: seoTitle,
      description: seoDescription,
      url: `https://meetlucas.ai/blog/${loaderData.slug}`,
      image: seoImage,
      type: "article",
    });

    return {
      meta: [
        { title: metadata.meta.find((m) => m.property === "og:title")?.content || loaderData.title },
        ...metadata.meta,
      ],
      links: metadata.links,
      scripts: metadata.scripts,
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const post = Route.useLoaderData();
  const { page = 1 } = Route.useSearch();

  if (!post) {
    return null;
  }

  return (
    <article className="bg-white pb-16">
      <PostHeader post={post} />

      <section className="mx-auto max-w-3xl px-6 pt-12 sm:px-8">
        <PortableTextContent value={post.body} />

        <div className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-600">
          <Link
            className="font-semibold text-cyan-700 underline-offset-4 transition hover:text-cyan-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
            search={{ page }}
            to="/blog"
          >
            ← Back to blog
          </Link>
        </div>
      </section>
    </article>
  );
}
