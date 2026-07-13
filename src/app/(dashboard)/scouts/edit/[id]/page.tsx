"use client";

import { use, useEffect } from "react";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";
import EditScoutForm from "@/components/scouts/EditScoutForm";
import TagsCard from "@/components/scouts/TagsCard";
import SkillsCard from "@/components/scouts/SkillsCard";
import ReviewsCard from "@/components/scouts/ReviewsCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchScoutByIdThunk,
  clearSelectedScout,
} from "@/store/slices/scoutsSlice";

export default function EditScoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const dispatch = useAppDispatch();
  const { selected: scout, status } = useAppSelector((state) => state.scouts);

  useEffect(() => {
    dispatch(fetchScoutByIdThunk(id));
    return () => {
      dispatch(clearSelectedScout());
    };
  }, [dispatch, id]);

  if (status === "loading" || !scout) {
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
          { label: "Scouts", href: "/scouts" },
          { label: "Edit Provider" },
        ]}
      />

      <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
        <Card className="p-5 sm:p-8">
          <EditScoutForm scout={scout} />
        </Card>

        <TagsCard scoutId={scout.id} tags={scout.tags} />
        <SkillsCard scoutId={scout.id} skills={scout.skills} />
        <ReviewsCard scoutId={scout.id} reviews={scout.reviews} />
      </div>
    </div>
  );
}
