"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";
import EditTowingForm from "@/components/towing/EditTowingForm";
import DetailedServicesCard from "@/components/towing/DetailedServicesCard";
import QuickServicesCard from "@/components/towing/QuickServicesCard";
import { getTowingProviderById } from "@/lib/mock-towing";
import { TowingDetailedService, TowingQuickService } from "@/types";

export default function EditTowingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const provider = getTowingProviderById(id);
  if (!provider) notFound();

  const [detailedServices, setDetailedServices] = useState<
    TowingDetailedService[]
  >(provider.detailedServices);
  const [quickServices, setQuickServices] = useState<TowingQuickService[]>(
    provider.quickServices,
  );

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
          services={detailedServices}
          onChange={setDetailedServices}
        />
        <QuickServicesCard
          services={quickServices}
          onChange={setQuickServices}
        />
      </div>
    </div>
  );
}
