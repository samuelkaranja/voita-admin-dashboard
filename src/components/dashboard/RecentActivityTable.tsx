import ServiceBadge from "./ServiceBadge";
import { ActivityItem } from "@/types";
import clsx from "clsx";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function RecentActivityTable({
  items,
}: {
  items: ActivityItem[];
}) {
  return (
    <div className="bg-voita-card rounded-xl border border-voita-border overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-voita-border">
        <h3 className="text-voita-text font-semibold text-sm">
          Recent Activity
        </h3>
        <p className="text-voita-text-muted text-xs mt-0.5">
          Latest 10 providers across all services
        </p>
      </div>

      {/* Desktop / tablet table */}
      <table className="w-full text-sm hidden sm:table">
        <thead>
          <tr className="text-left text-voita-text-muted text-xs uppercase tracking-wide">
            <th className="px-6 py-3 font-medium">Name</th>
            <th className="px-6 py-3 font-medium">Service Type</th>
            <th className="px-6 py-3 font-medium">Date Added</th>
            <th className="px-6 py-3 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr
              key={item.id}
              className={clsx(
                "border-t border-voita-border",
                i % 2 === 1 && "bg-white/1.5",
              )}
            >
              <td className="px-6 py-3.5 text-voita-text font-medium">
                {item.name}
              </td>
              <td className="px-6 py-3.5">
                <ServiceBadge type={item.serviceType} />
              </td>
              <td className="px-6 py-3.5 text-voita-text-secondary">
                {formatDate(item.dateAdded)}
              </td>
              <td className="px-6 py-3.5">
                <button className="text-voita-accent hover:underline text-sm font-medium">
                  Quick Edit →
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile card list */}
      <div className="sm:hidden divide-y divide-voita-border">
        {items.map((item) => (
          <div key={item.id} className="px-4 py-3.5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-voita-text font-medium text-sm">{item.name}</p>
              <ServiceBadge type={item.serviceType} />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-voita-text-secondary text-xs">
                {formatDate(item.dateAdded)}
              </p>
              <button className="text-voita-accent hover:underline text-xs font-medium">
                Quick Edit →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
