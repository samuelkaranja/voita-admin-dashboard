import { Clock, AlertTriangle } from "lucide-react";
import { JoinRequest } from "@/types";
import Pill from "@/components/ui/Pill";
import { formatTimeAgo } from "@/lib/formatTimeAgo";

const STALE_THRESHOLD_MS = 24 * 60 * 60 * 1000;

interface JoinRequestCardProps {
  request: JoinRequest;
  onApprove: () => void;
  onReject: () => void;
}

export default function JoinRequestCard({
  request,
  onApprove,
  onReject,
}: JoinRequestCardProps) {
  const isStale =
    Date.now() - new Date(request.requestedAt).getTime() > STALE_THRESHOLD_MS;
  const initial = request.userName.trim().charAt(0).toUpperCase();

  return (
    <div className="bg-voita-card border border-voita-border rounded-xl p-4 sm:p-5 flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-11 h-11 rounded-full bg-voita-card-hover flex items-center justify-center shrink-0">
          <span className="text-voita-text-secondary text-sm font-semibold">
            {initial}
          </span>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-voita-text font-semibold text-sm">
              {request.userName}
            </p>
            {isStale && <Pill label="Stale" color="amber" />}
          </div>
          <div className="flex items-center gap-2.5 flex-wrap mt-1.5">
            <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-voita-bg text-voita-text-secondary border border-voita-border">
              {request.roomName}
            </span>
            <span
              className={`flex items-center gap-1.5 text-xs ${isStale ? "text-amber-400" : "text-voita-text-muted"}`}
            >
              {isStale ? <AlertTriangle size={12} /> : <Clock size={12} />}
              {formatTimeAgo(request.requestedAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={onApprove}
          className="px-4 py-2 rounded-lg bg-voita-accent-dim text-voita-accent text-xs font-semibold hover:bg-voita-accent hover:text-voita-bg transition-colors"
        >
          Approve
        </button>
        <button
          onClick={onReject}
          className="px-4 py-2 rounded-lg border border-red-500/40 text-red-400 text-xs font-semibold hover:bg-red-500/10 transition-colors"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
