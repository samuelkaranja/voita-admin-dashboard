"use client";

import { use, useEffect } from "react";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";
import EditCarWashForm from "@/components/carwash/EditCarWashForm";
import WashServicesCard from "@/components/carwash/WashServicesCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCarWashByIdThunk,
  clearSelectedCarWash,
} from "@/store/slices/carWashSlice";

export default function EditCarWashPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const dispatch = useAppDispatch();
  const { selected: carWash, status } = useAppSelector(
    (state) => state.carWash,
  );

  useEffect(() => {
    dispatch(fetchCarWashByIdThunk(id));
    return () => {
      dispatch(clearSelectedCarWash());
    };
  }, [dispatch, id]);

  if (status === "loading" || !carWash) {
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
          { label: "Car Wash", href: "/car-wash" },
          { label: "Edit Provider" },
        ]}
      />

      <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
        <Card className="p-5 sm:p-8">
          <EditCarWashForm carWash={carWash} />
        </Card>

        <WashServicesCard carWashId={carWash.id} services={carWash.services} />
      </div>
    </div>
  );
}
