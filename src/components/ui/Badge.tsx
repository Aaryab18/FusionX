import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  color?: "cyan" | "green" | "yellow" | "blue" | "gray" | "red";
};

const colors = {
  cyan: "bg-cyan-500/20 text-cyan-300",
  green: "bg-green-500/20 text-green-300",
  yellow: "bg-yellow-500/20 text-yellow-300",
  blue: "bg-blue-500/20 text-blue-300",
  gray: "bg-gray-500/20 text-gray-300",
  red: "bg-red-500/20 text-red-300",
};

export default function Badge({
  children,
  color = "cyan",
}: BadgeProps) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${colors[color]}`}
    >
      {children}
    </span>
  );
}