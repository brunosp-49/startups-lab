import {
  siDocker,
  siFigma,
  siFirebase,
  siFlutter,
  siGooglecloud,
  siKotlin,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siSupabase,
  siSwift,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import { OpenAiLogo } from "@phosphor-icons/react/dist/ssr";

const stack: { name: string; icon?: SimpleIcon; group: string }[] = [
  { name: "React", icon: siReact, group: "Front-end" },
  { name: "Next.js", icon: siNextdotjs, group: "Front-end" },
  { name: "TypeScript", icon: siTypescript, group: "Linguagem" },
  { name: "React Native", icon: siReact, group: "Mobile" },
  { name: "Flutter", icon: siFlutter, group: "Mobile" },
  { name: "Swift", icon: siSwift, group: "iOS" },
  { name: "Kotlin", icon: siKotlin, group: "Android" },
  { name: "Node.js", icon: siNodedotjs, group: "Back-end" },
  { name: "Python", icon: siPython, group: "Back-end · IA" },
  { name: "PostgreSQL", icon: siPostgresql, group: "Dados" },
  { name: "Supabase", icon: siSupabase, group: "Back-end" },
  { name: "Firebase", icon: siFirebase, group: "Back-end" },
  { name: "Google Cloud", icon: siGooglecloud, group: "Infra" },
  { name: "Docker", icon: siDocker, group: "Infra" },
  { name: "OpenAI", group: "IA" },
  { name: "n8n", icon: siN8n, group: "Automação" },
  { name: "Figma", icon: siFigma, group: "Design" },
];

export function TechStack() {
  return (
    <div className="grid grid-cols-2 border-l border-t border-white/10 sm:grid-cols-3 lg:grid-cols-6">
      {stack.map((t) => (
        <div
          key={t.name}
          data-reveal
          className="group relative flex aspect-square flex-col justify-between overflow-hidden border-b border-r border-white/10 p-5 transition-colors duration-500 hover:bg-white/[0.04] md:p-6"
        >
          <span
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: "radial-gradient(circle at 30% 20%, rgba(46,242,216,0.16), transparent 60%)" }}
          />
          <span className="relative text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">
            {t.group}
          </span>
          <span className="relative">
            {t.icon ? (
              <svg
                viewBox="0 0 24 24"
                className="h-9 w-9 fill-white/80 transition-all duration-500 group-hover:-translate-y-1 group-hover:fill-[var(--accent)] md:h-10 md:w-10"
                aria-hidden
              >
                <path d={t.icon.path} />
              </svg>
            ) : (
              <OpenAiLogo
                weight="fill"
                className="h-9 w-9 text-white/80 transition-all duration-500 group-hover:-translate-y-1 group-hover:text-[var(--accent)] md:h-10 md:w-10"
              />
            )}
            <span className="mt-4 block text-lg font-medium tracking-[-0.02em] text-white">{t.name}</span>
          </span>
        </div>
      ))}
      <div className="hidden aspect-square border-b border-r border-white/10 p-6 lg:flex lg:items-end">
        <span className="text-sm leading-relaxed text-white/45">e o que mais o seu projeto pedir.</span>
      </div>
    </div>
  );
}
