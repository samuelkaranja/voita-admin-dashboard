"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchAlertByIdThunk,
  sendDraftAlertThunk,
  clearSelectedAlert,
} from "@/store/slices/alertsSlice";
import { Pencil, Trash2 } from "lucide-react";
import { deleteAlertThunk } from "@/store/slices/alertsSlice";

export default function AlertDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const router = useRouter();
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

  const currentAlert = alert;

  async function handleDelete() {
    if (
      !window.confirm(`Delete "${currentAlert.title}"? This can't be undone.`)
    )
      return;
    const result = await dispatch(deleteAlertThunk(id));
    if (deleteAlertThunk.fulfilled.match(result)) {
      router.push("/alerts");
    }
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

      <div className="flex items-center gap-3">
        {alert.status === "draft" && (
          <button
            onClick={handleSend}
            disabled={mutationStatus === "loading"}
            className="rounded-lg bg-voita-accent px-5 py-2.5 text-sm font-semibold text-voita-bg hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {mutationStatus === "loading" ? "Sending..." : "Send Alert"}
          </button>
        )}
        <button
          onClick={handleDelete}
          disabled={mutationStatus === "loading"}
          className="flex items-center gap-1.5 rounded-lg border border-red-500/40 px-5 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-60"
        >
          <Trash2 size={16} />
          Delete Alert
        </button>
      </div>
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
