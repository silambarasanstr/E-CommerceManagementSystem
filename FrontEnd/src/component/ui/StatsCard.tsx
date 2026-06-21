type StatsCardProps = {
  count: number;
  label: string;
};

const StatsCard = ({ count, label }: StatsCardProps) => {
  return (
    <div className="flex items-center gap-2 px-4 py-1.5 border border-gray-200 rounded-full text-[11px] tracking-[0.08em] font-mono text-gray-700 bg-white hover:border-gray-900 hover:shadow-sm transition-all">
      <strong className="font-semibold text-gray-900">{count}</strong>
      {label}
    </div>
  );
};

export default StatsCard;