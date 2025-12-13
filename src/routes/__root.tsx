import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type * as React from "react";
import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { capturePageview, initPostHog } from "@/lib/analytics/posthog";
import { generateMetadata } from "@/lib/seo";
import appCss from "@/styles/app.css?url";

export const Route = createRootRoute({
  head: () => {
    const metadata = generateMetadata();

    return {
      meta: [
        {
          title:
            "Lucas - AI College Admissions Advisor | Essays, Test Prep & Applications",
        },
        ...metadata.meta,
      ],
      links: [{ rel: "stylesheet", href: appCss }, ...metadata.links],
      scripts: metadata.scripts,
    };
  },
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  const router = useRouter();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const isAppFullscreenRoute =
    pathname === "/app" || pathname.startsWith("/app/");
  // Create QueryClient instance once per component lifecycle
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  // Initialize PostHog on mount (client-side only)
  useEffect(() => {
    initPostHog();
  }, []);

  // Track pageviews on route changes
  useEffect(() => {
    const handleRouteChange = () => {
      capturePageview();
    };

    // Capture initial pageview
    capturePageview();

    // Subscribe to route changes
    const unsubscribe = router.subscribe("onResolved", handleRouteChange);

    return () => {
      unsubscribe();
    };
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <RootDocument hideDevtools={isAppFullscreenRoute}>
        {isAppFullscreenRoute ? null : <Navigation />}
        <Outlet />
      </RootDocument>
    </QueryClientProvider>
  );
}

function RootDocument({
  children,
  hideDevtools = false,
}: {
  children: React.ReactNode;
  hideDevtools?: boolean;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/**
         * Safari (iOS 17.4+) only honors multiple theme-color tags when we also
         * declare the supported color schemes. Rendering these tags ahead of
         * HeadContent avoids TanStack Router's deduping.
         */}
        <meta content="#F8FDF5" name="theme-color" />
        <HeadContent />
      </head>
      <body
        className="min-h-screen text-slate-950 antialiased"
        style={{ backgroundColor: "#F8FDF5" }}
      >
        {children}
        {import.meta.env.DEV && !hideDevtools ? (
          <TanStackRouterDevtools position="bottom-right" />
        ) : null}
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <RootDocument>
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <section className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xl">
          <h1 className="font-semibold text-4xl text-slate-900">
            Page not found
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            The page you&apos;re looking for doesn&apos;t exist. Use the
            navigation or go back to the homepage.
          </p>
          <a
            className="mt-8 inline-flex items-center justify-center rounded-full bg-cyan-600 px-6 py-3 font-medium text-base text-white transition hover:bg-cyan-700 focus-visible:outline-2 focus-visible:outline-cyan-600 focus-visible:outline-offset-2"
            href="/"
          >
            Return home
          </a>
        </section>
      </main>
    </RootDocument>
  );
}
