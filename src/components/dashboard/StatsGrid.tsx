import StatCard from "./StatCard";
import { StatCardData } from "@/types";

export default function StatsGrid({ stats }: { stats: StatCardData[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.id} {...stat} />
      ))}
    </div>
  );
}
