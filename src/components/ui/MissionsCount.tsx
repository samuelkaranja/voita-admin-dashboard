export default function MissionsCount({ count }: { count: number }) {
  return (
    <span className="text-voita-text-secondary text-sm">
      {count.toLocaleString()}
    </span>
  );
}
