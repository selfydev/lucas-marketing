import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type * as React from "react";
import appCss from "@/styles/app.css?url";

export const Route = createRootRoute({
  head: () => ({
    title: "Lucas AI Marketing",
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "description",
        content:
          "Discover how Lucas AI helps universities modernize admissions.",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-white text-slate-950 antialiased">
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
