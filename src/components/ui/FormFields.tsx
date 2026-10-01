"use client";

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export function maskPhone(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("55") && d.length > 11) d = d.slice(2);
  d = d.slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function Chips({
  options,
  value,
  onChange,
  className = "mt-4",
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {options.map((o) => {
        const on = value === o;
        return (
          <button
            key={o}
            type="button"
            data-lf-item
            aria-pressed={on}
            onClick={() => onChange(on ? "" : o)}
            className={`rounded-full border px-4 py-2.5 text-sm transition-colors duration-300 ${
              on
                ? "border-[var(--accent)] bg-[var(--accent)] font-medium text-[var(--accent-ink)]"
                : "border-white/15 text-white/75 hover:border-white/40 hover:text-white"
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

export function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  invalid,
  multiline,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  invalid?: boolean;
  multiline?: boolean;
  className?: string;
}) {
  const base = `peer w-full rounded-2xl border bg-white/[0.03] px-5 text-[15px] text-white outline-none transition-colors ${
    invalid ? "border-[#ff8a8a]" : "border-white/10 focus:border-[var(--accent)]"
  }`;
  return (
    <label data-lf-item className={`group relative block ${className}`}>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder=" "
          rows={5}
          className={`${base} resize-none pb-4 pt-8 leading-relaxed`}
        />
      ) : (
        <input
          type={type}
          value={type === "tel" ? maskPhone(value) : value}
          onChange={(e) => onChange(type === "tel" ? maskPhone(e.target.value) : e.target.value)}
          autoComplete={autoComplete}
          inputMode={type === "tel" ? "numeric" : undefined}
          placeholder=" "
          className={`${base} h-[60px] pt-5`}
        />
      )}
      <span
        className={`pointer-events-none absolute left-5 text-[15px] text-white/45 transition-all duration-300 peer-focus:text-[11px] peer-focus:text-[var(--accent)] peer-[:not(:placeholder-shown)]:text-[11px] ${
          multiline
            ? "top-5 peer-focus:top-3 peer-[:not(:placeholder-shown)]:top-3"
            : "top-1/2 -translate-y-1/2 peer-focus:top-4 peer-[:not(:placeholder-shown)]:top-4"
        }`}
      >
        {label}
      </span>
    </label>
  );
}

export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="text"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="absolute -left-[9999px] h-0 w-0 opacity-0"
    />
  );
}
