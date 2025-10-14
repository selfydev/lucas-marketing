import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type * as React from "react";
import { Navigation } from "@/components/Navigation";
import { generateMetadata } from "@/lib/seo";
import { UIThemeProvider } from "@/providers/UIThemeProvider";
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
      links: [
        { rel: "stylesheet", href: appCss },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap",
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
  return (
    <RootDocument>
      <UIThemeProvider>
        <Navigation />
        <Outlet />
      </UIThemeProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/** biome-ignore lint/style/noHeadElement: <tanstack neneds it> */}
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
        {import.meta.env.DEV ? (
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
            className="mt-8 inline-flex items-center justify-center rounded-full bg-cyan-600 px-6 py-3 font-medium text-base text-white transition hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-600 focus-visible:outline-offset-2"
            href="/"
          >
            Return home
          </a>
        </section>
      </main>
    </RootDocument>
  );
}
