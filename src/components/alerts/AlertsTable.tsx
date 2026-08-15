import Link from "next/link";
import { Alert } from "@/types";

const STATUS_STYLES: Record<Alert["status"], string> = {
  sent: "bg-green-500/15 text-green-400",
  failed: "bg-red-500/15 text-red-400",
  draft: "bg-amber-500/15 text-amber-400",
};

const PRIORITY_STYLES: Record<Alert["priority"], string> = {
  low: "text-voita-text-muted",
  normal: "text-voita-text-muted",
  high: "text-orange-400",
  urgent: "text-red-400 font-semibold",
};

export default function AlertsTable({ alerts }: { alerts: Alert[] }) {
  if (alerts.length === 0) {
    return (
      <div className="rounded-lg border border-voita-border py-12 text-center text-sm text-voita-text-muted">
        No alerts found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-voita-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-voita-border text-left text-voita-text-muted">
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Target</th>
            <th className="px-4 py-3 font-medium">Priority</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Recipients</th>
            <th className="px-4 py-3 font-medium">Created</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <tr
              key={alert.id}
              className="border-b border-voita-border last:border-0 hover:bg-voita-accent-dim/30"
            >
              <td className="px-4 py-3">
                <Link
                  href={`/alerts/${alert.id}`}
                  className="font-medium text-voita-text hover:underline"
                >
                  {alert.title}
                </Link>
                <p className="line-clamp-1 text-xs text-voita-text-muted">
                  {alert.message}
                </p>
              </td>
              <td className="px-4 py-3 text-voita-text-secondary capitalize">
                {alert.targetType.replace("_", " ")}
              </td>
              <td
                className={`px-4 py-3 capitalize ${PRIORITY_STYLES[alert.priority]}`}
              >
                {alert.priority}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium uppercase ${STATUS_STYLES[alert.status]}`}
                >
                  {alert.status}
                </span>
              </td>
              <td className="px-4 py-3 text-voita-text-muted">
                {alert.status === "draft"
                  ? "—"
                  : `${alert.successCount}/${alert.recipientsCount}`}
              </td>
              <td className="px-4 py-3 text-voita-text-muted">
                {new Date(alert.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
