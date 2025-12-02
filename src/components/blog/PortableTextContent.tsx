import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

interface PortableTextContentProps {
  value?: PortableTextBlock[];
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;

      const altText = typeof value.alt === "string" && value.alt.trim().length > 0 ? value.alt : "Blog image";

      return (
        <figure className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <img alt={altText} className="w-full" loading="lazy" src={value.url || ""} />
          {value.caption ? (
            <figcaption className="px-4 pb-4 pt-2 text-center text-sm text-slate-500">{value.caption}</figcaption>
          ) : null}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 text-3xl font-semibold text-slate-900 first:mt-0">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-2xl font-semibold text-slate-900 first:mt-0">{children}</h3>
    ),
    normal: ({ children }) => <p className="leading-relaxed text-slate-700">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-cyan-500 pl-4 italic text-slate-800">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="ml-6 list-disc space-y-2 text-slate-700">{children}</ul>,
    number: ({ children }) => <ol className="ml-6 list-decimal space-y-2 text-slate-700">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href || "";
      const isInternal = href.startsWith("/");

      return (
        <a
          className="font-semibold text-cyan-700 underline-offset-4 transition hover:text-cyan-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
          href={href}
          rel={isInternal ? undefined : "noreferrer noopener"}
          target={isInternal ? undefined : "_blank"}
        >
          {children}
        </a>
      );
    },
    internalLink: ({ value, children }) => {
      const href = value?.slug ? `/blog/${value.slug}` : undefined;

      if (!href) {
        return children;
      }

      return (
        <a
          className="font-semibold text-cyan-700 underline-offset-4 transition hover:text-cyan-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
          href={href}
        >
          {children}
        </a>
      );
    },
  },
};

function PortableTextContent({ value }: PortableTextContentProps) {
  if (!value?.length) return null;

  return (
    <div className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-cyan-700">
      <PortableText components={components} value={value} />
    </div>
  );
}

export { PortableTextContent };
