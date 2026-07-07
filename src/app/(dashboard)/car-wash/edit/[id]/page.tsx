"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";
import EditCarWashForm from "@/components/carwash/EditCarWashForm";
import WashServicesCard from "@/components/carwash/WashServicesCard";
import { CarWashService } from "@/types";

export default function EditCarWashPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  //if (!carWash) notFound();

  //const [services, setServices] = useState<CarWashService[]>(carWash.services);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Edit Provider"
        breadcrumb={[
          { label: "Car Wash", href: "/car-wash" },
          { label: "Edit Provider" },
        ]}
      />

      <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
        {/* <Card className="p-5 sm:p-8">
          <EditCarWashForm carWash={carWash} />
        </Card>

        <WashServicesCard services={services} onChange={setServices} /> */}
      </div>
    </div>
  );
}
