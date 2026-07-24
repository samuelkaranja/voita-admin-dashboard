export default function PendingCountBadge({ count }: { count: number }) {
  if (count === 0) {
    return <span className="text-voita-text-muted text-sm">—</span>;
  }
  return (
    <span className="inline-flex items-center justify-center min-w-[26px] h-[22px] px-1.5 rounded-full bg-rose-500/15 text-rose-400 text-xs font-semibold">
      {count}
    </span>
  );
}
