import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

export default function SectionHeading({
  title,
  subtitle,
  children,
}: Props) {
  return (
    <div className="mb-10 flex items-end justify-between">
      <div>
        <h2 className="text-4xl font-bold text-white">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-2 text-gray-400">
            {subtitle}
          </p>
        )}
      </div>

      {children}
    </div>
  );
}