"use client";

import { use, useEffect } from "react";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";
import EditTowingForm from "@/components/towing/EditTowingForm";
import DetailedServicesCard from "@/components/towing/DetailedServicesCard";
import QuickServicesCard from "@/components/towing/QuickServicesCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchTowingProviderByIdThunk,
  clearSelectedTowingProvider,
} from "@/store/slices/towingSlice";

export default function EditTowingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const dispatch = useAppDispatch();
  const { selected: provider, status } = useAppSelector(
    (state) => state.towing,
  );

  useEffect(() => {
    dispatch(fetchTowingProviderByIdThunk(id));
    return () => {
      dispatch(clearSelectedTowingProvider());
    };
  }, [dispatch, id]);

  if (status === "loading" || !provider) {
    return <p className="text-voita-text-muted text-sm">Loading provider...</p>;
  }
  if (status === "failed") {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Edit Provider"
        breadcrumb={[
          { label: "Towing", href: "/towing" },
          { label: "Edit Provider" },
        ]}
      />

      <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
        <Card className="p-5 sm:p-8">
          <EditTowingForm provider={provider} />
        </Card>

        <DetailedServicesCard
          providerId={provider.id}
          services={provider.detailedServices}
        />
        <QuickServicesCard
          providerId={provider.id}
          services={provider.quickServices}
        />
      </div>
    </div>
  );
}
