import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: IndexRoute,
});

function IndexRoute() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <section className="rounded-3xl border border-slate-200 bg-white/80 p-12 text-center shadow-2xl shadow-cyan-100 backdrop-blur">
        <h1 className="text-4xl font-semibold text-slate-900">Hello Marketing Site!</h1>
        <p className="mt-4 max-w-xl text-balance text-lg text-slate-600">
          We are building the Lucas AI marketing experience with TanStack Start and Tailwind CSS.
        </p>
      </section>
    </main>
  );
}
