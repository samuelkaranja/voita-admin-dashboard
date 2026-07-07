"use client";

import { use, useEffect } from "react";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";
import EditMechanicForm from "@/components/mechanics/EditMechanicForm";
import SpecializedServicesCard from "@/components/mechanics/SpecializedServicesCard";
import InsurancePartnersCard from "@/components/mechanics/InsurancePartnersCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchMechanicByIdThunk,
  clearSelectedMechanic,
} from "@/store/slices/mechanicsSlice";

export default function EditMechanicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const dispatch = useAppDispatch();
  const { selected: mechanic, status } = useAppSelector(
    (state) => state.mechanics,
  );

  useEffect(() => {
    dispatch(fetchMechanicByIdThunk(id));
    return () => {
      dispatch(clearSelectedMechanic());
    };
  }, [dispatch, id]);

  if (status === "loading" || !mechanic) {
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
          { label: "Mechanics", href: "/mechanics" },
          { label: "Edit Provider" },
        ]}
      />

      <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
        <Card className="p-5 sm:p-8">
          <EditMechanicForm mechanic={mechanic} />
        </Card>

        <SpecializedServicesCard
          mechanicId={mechanic.id}
          services={mechanic.services}
        />
        <InsurancePartnersCard
          mechanicId={mechanic.id}
          partners={mechanic.insurancePartners}
        />
      </div>
    </div>
  );
}
