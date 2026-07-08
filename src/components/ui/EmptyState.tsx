import type { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  action?: ReactNode;
};

export default function EmptyState({
  title,
  description,
  action,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#101827] px-8 py-16 text-center">
      <div className="mb-5 text-6xl">📂</div>

      <h2 className="text-2xl font-bold text-white">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-gray-400">
        {description}
      </p>

      {action && (
        <div className="mt-8">
          {action}
        </div>
      )}
    </div>
  );
}