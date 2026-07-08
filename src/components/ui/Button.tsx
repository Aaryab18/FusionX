import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
};

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: Props) {
  const base =
    "rounded-xl px-5 py-3 font-semibold transition-all duration-300";

  const variants = {
    primary: "bg-cyan-500 text-black hover:bg-cyan-400",
    secondary:
      "border border-white/10 bg-white/5 text-white hover:bg-white/10",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}