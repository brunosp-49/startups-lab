import type { Icon } from "@phosphor-icons/react";

export type IconItem = { icon: Icon; title: string; text: string };

export function IconGrid({ items, columns = 3 }: { items: IconItem[]; columns?: 2 | 3 }) {
  return (
    <div
      className={`grid gap-x-12 gap-y-16 sm:grid-cols-2 lg:gap-x-16 lg:gap-y-20 ${
        columns === 3 ? "lg:grid-cols-3" : ""
      }`}
    >
      {items.map(({ icon: IconCmp, title, text }) => (
        <div key={title} data-reveal className="group">
          <IconCmp
            weight="light"
            className="h-14 w-14 text-[var(--accent)] transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:-translate-y-2 group-hover:rotate-[-8deg] group-hover:scale-110"
          />
          <h3 className="mt-6 text-[1.7rem] font-medium leading-tight text-white">{title}</h3>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-white/80">{text}</p>
          <div className="relative mt-7 h-px w-full bg-white/20">
            <span className="absolute inset-0 origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-700 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-x-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
