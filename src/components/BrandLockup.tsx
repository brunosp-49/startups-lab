import Image from "next/image";

type BrandLockupProps = {
  size?: "sm" | "md" | "xl";
  align?: "start" | "center";
  preload?: boolean;
  className?: string;
};

const sizes = {
  sm: "h-[44px] md:h-[54px]",
  md: "h-[54px]",
  xl: "h-[min(200px,28vw)]",
};

export function BrandLockup({
  size = "md",
  align = "start",
  preload = false,
  className = "",
}: BrandLockupProps) {
  const items = align === "center" ? "items-center" : "items-start";

  return (
    <div className={`inline-flex flex-col ${items} ${className}`}>
      <Image
        src="/logo-startups-lab.png"
        alt="Startups Lab"
        width={1400}
        height={524}
        preload={preload}
        className={`${sizes[size]} w-auto`}
      />
    </div>
  );
}
