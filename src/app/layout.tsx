import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { Preloader } from "@/components/Preloader";
import { LeadForm } from "@/components/LeadForm";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationJsonLd, siteUrl } from "@/lib/seo";
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Desenvolvimento de Apps e Software para Startups | Startups Lab",
    template: "%s | Startups Lab",
  },
  description:
    "Transformamos ideias em aplicativos, MVPs e produtos digitais. Desenvolvimento de apps Android e iOS, software, backend e IA para startups.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Startups Lab",
    url: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={interTight.variable}>
      <body>
        <JsonLd data={organizationJsonLd} />
        <Preloader />
        <CustomCursor />
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingActions />
        </SmoothScroll>
        <LeadForm />      </body>
    </html>
  );
}
