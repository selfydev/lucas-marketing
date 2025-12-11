import {
  createFileRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { BlogList } from "@/components/blog/BlogList";
import { Button } from "@/components/ui/button";
import { calculateReadingTime, fetchBlogIndex } from "@/lib/queries/blog";
import { generateMetadata } from "@/lib/seo";
import type { BlogPost } from "@/lib/types/blog";

type BlogPostWithMeta = BlogPost & { readingTime: number | null };

export const Route = createFileRoute("/blog")({
  head: () => {
    const metadata = generateMetadata({
      title: "Lucas AI Blog | Insights, tips, and updates",
      description:
        "Explore the latest admissions insights, feature updates, and student success stories from the Lucas AI team.",
      url: "https://meetlucas.ai/blog",
    });

    return {
      meta: [
        {
          title:
            metadata.meta.find((m) => m.property === "og:title")?.content ||
            "Lucas AI Blog",
        },
        ...metadata.meta,
      ],
      links: metadata.links,
      scripts: metadata.scripts,
    };
  },
  validateSearch: (search) => ({
    page: sanitizePage(search.page),
  }),
  loaderDeps: ({ search }) => ({
    page: sanitizePage(search.page),
  }),
  loader: async ({ deps }) => {
    const index = await fetchBlogIndex({ page: deps.page });
    const posts: BlogPostWithMeta[] = index.posts.map((post) => ({
      ...post,
      readingTime: calculateReadingTime(post.body),
    }));

    const heroImage = posts.find((post) => post.coverImage?.url)?.coverImage
      ?.url;

    return {
      ...index,
      posts,
      heroImage,
    };
  },
  component: BlogRoute,
});

function sanitizePage(page?: unknown) {
  const parsed =
    typeof page === "string" ? Number.parseInt(page, 10) : Number(page ?? 1);

  if (Number.isNaN(parsed) || parsed < 1) {
    return 1;
  }

  return Math.floor(parsed);
}

function BlogRoute() {
  const isViewingPost = useRouterState({
    select: (state) =>
      state.matches.some((match) => match.routeId === "/blog/$slug"),
  });

  if (isViewingPost) {
    return <Outlet />;
  }

  return <BlogIndexPage />;
}

function BlogIndexPage() {
  const navigate = Route.useNavigate();
  const { posts, page, totalPages, total, heroImage } = Route.useLoaderData();

  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const goToPage = (nextPage: number) => {
    navigate({
      to: "/blog",
      search: () => ({ page: nextPage }),
      replace: false,
    });
  };

  return (
    <main className="bg-white pt-32 pb-16">
      <section className="relative isolate overflow-hidden px-6 py-16 sm:px-8 lg:px-12">
        <div
          className="-z-10 absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-emerald-50"
          aria-hidden="true"
        />
        <div className="mx-auto flex max-w-5xl flex-col gap-10 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-4 text-left">
            <p className="font-semibold text-cyan-700 text-sm uppercase tracking-wide">
              Lucas AI Blog
            </p>
            <h1 className="font-bold text-4xl text-slate-900 tracking-tight sm:text-5xl">
              Practical guidance for every stage of the admissions journey
            </h1>
            <p className="max-w-3xl text-lg text-slate-600">
              Learn how Lucas supports students with essays, interviews, and
              application strategy. Read the latest product updates, success
              stories, and guidance from our team.
            </p>
            <div className="flex flex-wrap gap-3 text-slate-600 text-sm">
              <span className="rounded-full bg-cyan-50 px-4 py-2 font-medium text-cyan-800">
                {total} {total === 1 ? "article" : "articles"}
              </span>
              <span className="rounded-full bg-slate-100 px-4 py-2 font-medium text-slate-700">
                Page {page} of {totalPages}
              </span>
            </div>
          </div>
          {heroImage ? (
            <div className="relative h-64 w-full max-w-md overflow-hidden rounded-3xl shadow-xl ring-1 ring-slate-200">
              <img
                alt="Students collaborating around laptops"
                className="h-full w-full object-cover"
                src={heroImage}
              />
              <div
                className="absolute inset-0 bg-gradient-to-tr from-slate-900/10 to-transparent"
                aria-hidden="true"
              />
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <BlogList page={page} posts={posts} />

        {totalPages > 1 ? (
          <div className="mt-10 flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="text-slate-600 text-sm">
              Showing page {page} of {totalPages}
            </div>
            <div className="flex items-center gap-3">
              <Button
                disabled={!hasPrev}
                onClick={() => goToPage(page - 1)}
                type="button"
                variant="outline"
              >
                Previous
              </Button>
              <Button
                disabled={!hasNext}
                onClick={() => goToPage(page + 1)}
                type="button"
                variant="outline"
              >
                Next
              </Button>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}
