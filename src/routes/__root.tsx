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
import { cdn } from "@/lib/cdn";
import { generateMetadata } from "@/lib/seo";
import appCss from "@/styles/app.css?url";

const THEME_COLORS = {
  default: "#F8FDF5",
  autopilot: "#B7D3E5",
} as const;

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
        {
          name: "theme-color",
          content: THEME_COLORS.default,
        },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        // Preload critical LCP image (Dashboard in hero slider)
        {
          rel: "preload",
          href: cdn("/assets/Dashboard2.png", 1024),
          as: "image",
        },
        ...metadata.links,
      ],
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
    pathname === "/autopilot" || pathname.startsWith("/autopilot/");
  // Create QueryClient instance once per component lifecycle
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  useEffect(() => {
    initPostHog();
  }, []);

  // Update Safari status bar color (body bg for iOS 18+, meta tag for iOS 15-17)
  useEffect(() => {
    const color = isAppFullscreenRoute
      ? THEME_COLORS.autopilot
      : THEME_COLORS.default;

    // Modern Safari (18+): samples body background-color
    // Only update if different to avoid unnecessary repaints
    if (document.body.style.backgroundColor !== color) {
      document.body.style.backgroundColor = color;
    }

    // Older Safari (15-17): reads theme-color meta tag
    const metaTag = document.querySelector('meta[name="theme-color"]');
    if (metaTag && metaTag.getAttribute("content") !== color) {
      metaTag.setAttribute("content", color);
    }
  }, [isAppFullscreenRoute]);

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

  // Don't show the old Navigation on homepage (it has its own NewNavbar)
  const isHomepage = pathname === "/";
  
  return (
    <QueryClientProvider client={queryClient}>
      <RootDocument hideDevtools={isAppFullscreenRoute}>
        {isAppFullscreenRoute || isHomepage ? null : <Navigation />}
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
        <meta content={THEME_COLORS.default} name="theme-color" />
        <HeadContent />
      </head>
      <body 
        className="min-h-screen text-slate-950 antialiased"
        style={{ backgroundColor: THEME_COLORS.default }}
        suppressHydrationWarning
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
