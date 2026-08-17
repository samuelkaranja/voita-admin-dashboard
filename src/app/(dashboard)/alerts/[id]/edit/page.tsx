"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import EditAlertForm from "@/components/alerts/EditAlertForm";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchAlertByIdThunk,
  clearSelectedAlert,
} from "@/store/slices/alertsSlice";

export default function EditAlertPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selected: alert, status } = useAppSelector((state) => state.alerts);

  useEffect(() => {
    dispatch(fetchAlertByIdThunk(id));
    return () => {
      dispatch(clearSelectedAlert());
    };
  }, [dispatch, id]);

  useEffect(() => {
    // Guard against editing a non-draft alert directly via URL — the button
    // is hidden on the detail page, but the route itself is still reachable.
    if (alert && alert.status !== "draft") {
      router.replace(`/alerts/${id}`);
    }
  }, [alert, id, router]);

  if (status === "loading" || !alert || alert.status !== "draft") {
    return <p className="text-voita-text-muted text-sm">Loading alert...</p>;
  }

  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Edit Alert" />
      <EditAlertForm alert={alert} />
    </div>
  );
}
