type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}: Props) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-white/10 bg-[#101827] px-5 py-4 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:outline-none"
    />
  );
}