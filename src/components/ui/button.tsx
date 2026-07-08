import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark";
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-12 items-center justify-center rounded-xl px-5 text-sm font-bold transition active:scale-[0.98]",
        variant === "primary" &&
          "bg-[#ff5a40] text-white shadow-sm hover:bg-[#ed422b]",
        variant === "secondary" &&
          "bg-[#111111] text-white shadow-sm hover:bg-black",
        variant === "dark" &&
          "bg-[#111111] text-white shadow-sm hover:bg-black",
        variant === "outline" &&
          "border border-[#deded9] bg-white text-[#111111] hover:border-[#ff5a40]",
        variant === "ghost" && "bg-transparent text-[#111111] hover:bg-[#f2f2f0]",
        className,
      )}
      {...props}
    />
  );
}
