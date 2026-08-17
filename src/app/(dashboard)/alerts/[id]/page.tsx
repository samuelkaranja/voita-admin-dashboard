"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchAlertByIdThunk,
  sendDraftAlertThunk,
  clearSelectedAlert,
} from "@/store/slices/alertsSlice";
import { Pencil } from "lucide-react";

export default function AlertDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const {
    selected: alert,
    status,
    mutationStatus,
  } = useAppSelector((state) => state.alerts);

  useEffect(() => {
    dispatch(fetchAlertByIdThunk(id));
    return () => {
      dispatch(clearSelectedAlert());
    };
  }, [dispatch, id]);

  async function handleSend() {
    await dispatch(sendDraftAlertThunk(id));
  }

  if (status === "loading" || !alert) {
    return <p className="text-voita-text-muted text-sm">Loading alert...</p>;
  }

  return (
    <div className="flex flex-col gap-5">
      <Link
        href="/alerts"
        className="text-sm text-voita-text-muted hover:text-white"
      >
        ← Back to Alerts
      </Link>
      <PageHeader
        title={alert.title}
        action={
          alert.status === "draft"
            ? {
                label: "Edit Alert",
                href: `/alerts/${alert.id}/edit`,
                icon: Pencil,
              }
            : undefined
        }
      />

      <div className="rounded-lg border border-voita-border divide-y divide-voita-border">
        <DetailRow label="Message" value={alert.message} />
        <DetailRow label="Status" value={alert.status.toUpperCase()} />
        <DetailRow
          label="Target Type"
          value={alert.targetType.replace("_", " ")}
        />
        {alert.targetDriverId && (
          <DetailRow label="Target Driver ID" value={alert.targetDriverId} />
        )}
        {alert.targetRole && (
          <DetailRow label="Target Role" value={alert.targetRole} />
        )}
        <DetailRow label="Priority" value={alert.priority.toUpperCase()} />
        <DetailRow
          label="Delivery"
          value={
            alert.status === "draft"
              ? "Not sent yet"
              : `${alert.successCount} succeeded, ${alert.failureCount} failed of ${alert.recipientsCount} recipients`
          }
        />
        <DetailRow
          label="Created"
          value={new Date(alert.createdAt).toLocaleString()}
        />
        {alert.sentAt && (
          <DetailRow
            label="Sent"
            value={new Date(alert.sentAt).toLocaleString()}
          />
        )}
      </div>

      {alert.status === "draft" && (
        <button
          onClick={handleSend}
          disabled={mutationStatus === "loading"}
          className="self-start rounded-lg bg-voita-accent px-5 py-2.5 text-sm font-semibold text-voita-bg hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {mutationStatus === "loading" ? "Sending..." : "Send Alert"}
        </button>
      )}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-3">
      <p className="text-xs font-medium text-voita-text-muted">{label}</p>
      <p className="text-sm text-voita-text mt-0.5">{value}</p>
    </div>
  );
}
