function SectionHeader({
  title,
  open,
  onToggle,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full py-3 text-left group"
    >
      <span className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider">
        {title}
      </span>
      <span className="text-lg leading-none text-gray-400 transition-colors group-hover:text-gray-600">
        {open ? "−" : "+"}
      </span>
    </button>
  );
}

export default SectionHeader;
