import {
  siAnthropic,
  siFigma,
  siGoogleads,
  siGooglecloud,
  siHubspot,
  siMeta,
  siNextdotjs,
  siStripe,
  siSupabase,
  siVercel,
  type SimpleIcon,
} from "simple-icons";
import { OpenAiLogo } from "@phosphor-icons/react/dist/ssr";

type Brand = { name: string; icon?: SimpleIcon; custom?: React.ReactNode };

const brands: Brand[] = [
  { name: "Meta", icon: siMeta },
  { name: "OpenAI", custom: <OpenAiLogo weight="fill" className="h-9 w-9" /> },
  { name: "Google Cloud", icon: siGooglecloud },
  { name: "Google Ads", icon: siGoogleads },
  { name: "Anthropic", icon: siAnthropic },
  { name: "Vercel", icon: siVercel },
  { name: "Next.js", icon: siNextdotjs },
  { name: "Stripe", icon: siStripe },
  { name: "Supabase", icon: siSupabase },
  { name: "HubSpot", icon: siHubspot },
  { name: "Figma", icon: siFigma },
];

function BrandItem({ brand }: { brand: Brand }) {
  return (
    <div className="flex shrink-0 items-center gap-3 pr-16 text-white/85 transition-colors duration-300 hover:text-white md:pr-24">
      {brand.icon ? (
        <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" aria-hidden>
          <path d={brand.icon.path} />
        </svg>
      ) : (
        brand.custom
      )}
      <span className="text-[1.65rem] font-medium tracking-[-0.03em]">{brand.name}</span>
    </div>
  );
}

export function Partners() {
  return (
    <section aria-label="Tecnologias e parceiros" className="relative overflow-hidden pb-24 pt-10 md:pb-32">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 md:w-48"
        style={{ background: "linear-gradient(90deg, var(--section-gradient-end), transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 md:w-48"
        style={{ background: "linear-gradient(270deg, var(--section-gradient-end), transparent)" }}
      />
      <div className="marquee items-center" style={{ ["--marquee-duration" as string]: "40s" }}>
        {[...brands, ...brands].map((b, i) => (
          <BrandItem key={`${b.name}-${i}`} brand={b} />
        ))}
      </div>
    </section>
  );
}
