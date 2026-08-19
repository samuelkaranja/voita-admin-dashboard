"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import FilterPills from "@/components/ui/FilterPills";
import AlertsTable from "@/components/alerts/AlertsTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAlertsThunk, deleteAlertThunk } from "@/store/slices/alertsSlice";

const FILTERS = ["All", "Draft", "Sent", "Failed"] as const;
type Filter = (typeof FILTERS)[number];

export default function AlertsPage() {
  const dispatch = useAppDispatch();
  const {
    items: alerts,
    status,
    error,
  } = useAppSelector((state) => state.alerts);
  const [filter, setFilter] = useState<Filter>("All");

  useEffect(() => {
    const statusParam = filter === "All" ? undefined : filter.toLowerCase();
    dispatch(
      fetchAlertsThunk(statusParam ? { status: statusParam } : undefined),
    );
  }, [dispatch, filter]);

  function handleDelete(id: string) {
    dispatch(deleteAlertThunk(id));
  }

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Alerts"
        action={{ label: "New Alert", href: "/alerts/add", icon: Plus }}
      />

      <FilterPills options={FILTERS} active={filter} onChange={setFilter} />

      {status === "loading" && (
        <p className="text-voita-text-muted text-sm">Loading alerts...</p>
      )}
      {status === "failed" && <p className="text-red-400 text-sm">{error}</p>}
      {status === "succeeded" && (
        <AlertsTable alerts={alerts} onDelete={handleDelete} />
      )}
    </div>
  );
}
