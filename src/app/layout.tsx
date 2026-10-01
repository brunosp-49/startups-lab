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
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/ui/JsonLd";
import { CONSENT_KEY, GOOGLE_ADS_ID } from "@/lib/analytics";
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
    "Desenvolvimento de MVPs, aplicativos Android e iOS, SaaS e software sob medida para startups e empresas.",
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;var granted=false;try{granted=localStorage.getItem(${JSON.stringify(CONSENT_KEY)})==="granted";}catch(e){}var state=granted?"granted":"denied";gtag("consent","default",{ad_storage:state,ad_user_data:state,ad_personalization:state,analytics_storage:state,wait_for_update:500});gtag("js",new Date());gtag("config",${JSON.stringify(GOOGLE_ADS_ID)});`,
          }}
        />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} />
      </head>
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
        <LeadForm />
        <Analytics />
      </body>
    </html>
  );
}
