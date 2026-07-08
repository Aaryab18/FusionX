type Props = {
  className?: string;
};

export default function LoadingSkeleton({
  className = "",
}: Props) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-white/10 ${className}`}
    />
  );
}