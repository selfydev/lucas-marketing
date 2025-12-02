import type { PortableTextBlock } from "@portabletext/types";

export interface SanitySlug {
  current: string;
}

export interface SanityImageAssetRef {
  _ref: string;
  _type: "reference";
}

export interface SanityImageWithAlt {
  _type: "image";
  alt?: string;
  caption?: string;
  url?: string;
  asset: SanityImageAssetRef;
}

export interface BlogAuthor {
  _id: string;
  _type: "Author" | string;
  name: string;
  role?: string;
}

export interface BlogCategory {
  _id: string;
  _type: "Category" | string;
  title: string;
}

export interface BlogOpenGraph {
  title?: string;
  description?: string;
  image?: SanityImageWithAlt;
}

export interface BlogPost {
  _id: string;
  _type: "Post" | string;
  title: string;
  slug: string;
  publishedAt?: string;
  excerpt?: string;
  coverImage?: SanityImageWithAlt;
  author?: BlogAuthor;
  categories?: BlogCategory[];
  seo?: BlogSeo;
  body?: PortableTextBlock[];
}

export interface BlogSeo {
  title?: string;
  description?: string;
  og?: BlogOpenGraph;
}

export interface BlogPostDetail extends BlogPost {
  seo?: BlogSeo;
  relatedPosts?: BlogPost[];
}

export const seoProjection = `{
  "title": coalesce(SEO.title, SEO.Title, Seo.title, Seo.Title),
  "description": coalesce(SEO.description, SEO.Description, Seo.description, Seo.Description),
  "og": {
    "title": coalesce(SEO.og.title, SEO.og.Title, Seo.og.title, Seo.og.Title),
    "description": coalesce(SEO.og.description, SEO.og.Description, Seo.og.description, Seo.og.Description),
    "image": coalesce(SEO.og.image, SEO.og.Image, Seo.og.image, Seo.og.Image) {
      _type,
      alt,
      caption,
      "url": asset->url,
      asset,
    }
  }
}`;

export const imageProjection = `{
  _type,
  alt,
  caption,
  "url": asset->url,
  asset
}`;

export const authorProjection = `{
  _id,
  _type,
  "name": Name,
  "role": Role
}`;

export const categoryProjection = `{
  _id,
  _type,
  "title": Title
}`;

const portableTextProjection = `Body[]{
  ...,
  markDefs[]{
    ...,
    _type == "internalLink" => {
      ...,
      "slug": reference->SlugCurrent.current
    }
  },
  _type == "image" => {
    ...,
    "url": asset->url
  }
}`;

export const blogPostProjection = `{
  _id,
  _type,
  "title": Title,
  "slug": SlugCurrent.current,
  "excerpt": Excerpt,
  "publishedAt": PublishedAt,
  "coverImage": CoverImage{
    _type,
    alt,
    caption,
    "url": asset->url,
    asset,
  },
  "author": Author->${authorProjection},
  "categories": Categories[]->${categoryProjection},
  "seo": ${seoProjection},
  "body": ${portableTextProjection}
}`;

export const allBlogPostsQuery = `*[_type == "Post"] | order(PublishedAt desc) ${blogPostProjection}`;
export const blogPostBySlugQuery = `*[_type == "Post" && SlugCurrent.current == $slug][0] ${blogPostProjection}`;
