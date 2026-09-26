import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { BigMarquee } from "@/components/BigMarquee";
import { About } from "@/components/About";
import { Pillars } from "@/components/Pillars";
import { Partners } from "@/components/Partners";
import { StackedCards } from "@/components/StackedCards";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="section-gradient relative overflow-hidden">
        <Services />
        <BigMarquee />
        <About />
        <Pillars />
        <Partners />
      </div>
      <StackedCards />
    </>
  );
}
