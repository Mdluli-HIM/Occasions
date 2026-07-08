import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  tone?: "blue" | "red" | "green" | "light";
  className?: string;
};

export function Badge({ children, tone = "light", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold",
        tone === "blue" && "bg-blue-100 text-[#ff5a40]",
        tone === "red" && "bg-[#fff0ec] text-[#ff5a40]",
        tone === "green" && "bg-emerald-100 text-emerald-700",
        tone === "light" && "bg-white/90 text-[#111111]",
        className,
      )}
    >
      {children}
    </span>
  );
}
