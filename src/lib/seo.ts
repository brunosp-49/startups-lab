import { site } from "@/lib/site";

export const siteUrl = "https://www.startupslab.com.br";

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function serviceJsonLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${siteUrl}${path}`,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: "BR",
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Startups Lab",
  url: siteUrl,
  email: "contato@startupslab.com.br",
  telephone: "+55-12-98887-0530",
  logo: `${siteUrl}/logo-startups-lab.png`,
  description:
    "Empresa de tecnologia que desenvolve aplicativos, MVPs e produtos digitais para startups.",
  sameAs: [site.social.linkedin],
};
