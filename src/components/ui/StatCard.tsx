import type { ReactNode } from "react";

type Props = {
  title: string;
  value: string | number;
  color?: "cyan" | "green" | "yellow" | "blue";
  icon?: ReactNode;
};

const colors = {
  cyan: "text-cyan-400",
  green: "text-green-400",
  yellow: "text-yellow-400",
  blue: "text-blue-400",
};

export default function StatCard({
  title,
  value,
  color = "cyan",
  icon,
}: Props) {
  return (
    <div className="rounded-xl bg-[#101827] border border-white/10 p-6 text-center transition-all duration-300 hover:border-cyan-500 hover:-translate-y-1">
      {icon && <div className="mb-3 flex justify-center">{icon}</div>}

      <h2 className={`text-3xl font-bold ${colors[color]}`}>
        {value}
      </h2>

      <p className="mt-2 text-gray-400">
        {title}
      </p>
    </div>
  );
}