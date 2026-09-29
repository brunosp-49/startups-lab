import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

const routes = [
  "",
  "/como-funciona",
  "/desenvolvimento-de-aplicativos",
  "/desenvolvimento-de-software",
  "/mvp-para-startups",
  "/ia-e-automacao",
  "/growth",
  "/projetos",
  "/sobre",
  "/carreira",
  "/contato",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/desenvolvimento") || path.startsWith("/mvp") ? 0.9 : 0.6,
  }));
}
