"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";
import EditScoutForm from "@/components/scouts/EditScoutForm";
import TagsCard from "@/components/scouts/TagsCard";
import SkillsCard from "@/components/scouts/SkillsCard";
import ReviewsCard from "@/components/scouts/ReviewsCard";
import { getScoutById } from "@/lib/mock-scouts";
import { ScoutSkill, ScoutReview } from "@/types";

export default function EditScoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const scout = getScoutById(id);
  if (!scout) notFound();

  const [tags, setTags] = useState<string[]>(scout.tags);
  const [skills, setSkills] = useState<ScoutSkill[]>(scout.skills);
  const [reviews, setReviews] = useState<ScoutReview[]>(scout.reviews);

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

        <TagsCard tags={tags} onChange={setTags} />
        <SkillsCard skills={skills} onChange={setSkills} />
        <ReviewsCard reviews={reviews} onChange={setReviews} />
      </div>
    </div>
  );
}
