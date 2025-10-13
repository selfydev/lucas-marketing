/**
 * SEO and metadata utilities for the marketing site
 * Generates comprehensive meta tags, Open Graph, Twitter Cards, and structured data
 */

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
}

const DEFAULT_CONFIG = {
  title:
    "Lucas - AI College Admissions Advisor | Essays, Test Prep & Applications",
  description:
    "Lucas - Your AI-powered college admissions advisor. Get personalized guidance on essays, applications, test prep, and college selection. Join thousands of students who got into their dream schools.",
  keywords:
    "college admissions, AI advisor, college essays, Common App, Coalition App, SAT prep, ACT prep, college applications, admissions counseling, college counselor, ivy league admissions, college essay help",
  image: "https://meetlucas.ai/og-image-lucas-optimized.jpg",
  url: "https://meetlucas.ai/",
  type: "website" as const,
};

/**
 * Generates complete metadata configuration for TanStack Router head() function
 */
export function generateMetadata(config: SEOConfig = {}) {
  const {
    title = DEFAULT_CONFIG.title,
    description = DEFAULT_CONFIG.description,
    keywords = DEFAULT_CONFIG.keywords,
    image = DEFAULT_CONFIG.image,
    url = DEFAULT_CONFIG.url,
    type = DEFAULT_CONFIG.type,
  } = config;

  return {
    meta: [
      // Basic meta tags
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "description", content: description },
      { name: "keywords", content: keywords },
      { name: "author", content: "Lucas AI" },

      // SEO meta tags
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "googlebot", content: "index, follow" },

      // Open Graph meta tags
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },

      // Twitter Card meta tags
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: url },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [
      // Canonical URL
      { rel: "canonical", href: url },

      // Favicons
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "alternate icon", type: "image/png", href: "/favicon-96x96.png" },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },

      // Web manifest for PWA
      { rel: "manifest", href: "/site.webmanifest" },

      // Font preloading for performance
      {
        rel: "preload",
        href: "/fonts/NeueMontreal-Regular.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous" as const,
      },
      {
        rel: "preload",
        href: "/fonts/NeueMontreal-Medium.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous" as const,
      },
      {
        rel: "preload",
        href: "/fonts/InstrumentSerif-Italic.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous" as const,
      },
    ],
    scripts: [
      // Structured data (JSON-LD) for search engines
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "Lucas AI",
          description:
            "AI-powered college admissions advisor helping students get into their dream schools",
          url: "https://meetlucas.ai/",
          logo: "https://meetlucas.ai/og-image-lucas-optimized.jpg",
          foundingDate: "2024",
          address: {
            "@type": "PostalAddress",
            addressCountry: "US",
          },
          sameAs: [
            "https://twitter.com/lucas_ai",
            "https://www.linkedin.com/company/lucas-ai",
            "https://www.facebook.com/lucasai",
          ],
          offers: {
            "@type": "Offer",
            category: "Educational Service",
            description: "AI-powered college admissions guidance",
          },
        }),
      },
    ],
  };
}
