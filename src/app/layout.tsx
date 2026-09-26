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
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Startups Lab — Laboratório de negócios digitais",
    template: "%s — Startups Lab",
  },
  description:
    "Validamos ideias, construímos apps e softwares e colocamos empresas para crescer com marketing, IA e automação.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={interTight.variable}>
      <body>
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
