import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog";
import { siteUrl } from "@/lib/seo";

const routes = [
  "",
  "/como-funciona",
  "/desenvolvimento-de-produtos-digitais",
  "/desenvolvimento-de-aplicativos",
  "/desenvolvimento-de-software",
  "/desenvolvimento-de-saas",
  "/mvp-para-startups",
  "/ia-e-automacao",
  "/growth",
  "/projetos",
  "/sobre",
  "/carreira",
  "/contato",
  "/blog",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "" || path === "/blog" ? "weekly" : "monthly",
    priority:
      path === ""
        ? 1
        : path.startsWith("/desenvolvimento") || path.startsWith("/mvp")
          ? 0.9
          : path === "/blog"
            ? 0.7
            : 0.6,
  }));

  const articles: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T12:00:00`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...articles];
}
