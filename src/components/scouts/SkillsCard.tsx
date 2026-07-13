"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import ListSectionHeader from "@/components/ui/ListSectionHeader";
import SkillListItem from "@/components/scouts/SkillListItem";
import TextInput from "@/components/forms/TextInput";
import { ScoutSkill } from "@/types";
import { useAppDispatch } from "@/store/hooks";
import {
  addScoutSkillThunk,
  deleteScoutSkillThunk,
} from "@/store/slices/scoutsSlice";
import IconKeySelect from "../forms/IconKeySelect";

interface SkillsCardProps {
  scoutId: string;
  skills: ScoutSkill[];
}

export default function SkillsCard({ scoutId, skills }: SkillsCardProps) {
  const dispatch = useAppDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [label, setLabel] = useState("");
  const [iconKey, setIconKey] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function resetForm() {
    setLabel("");
    setIconKey("");
    setSubtitle("");
    setIsAdding(false);
  }

  async function handleAdd() {
    if (!label.trim()) return;
    setSubmitting(true);
    await dispatch(
      addScoutSkillThunk({
        scoutId,
        payload: {
          label: label.trim(),
          subtitle: subtitle.trim(),
          icon: iconKey.trim() || "search",
        },
      }),
    );
    setSubmitting(false);
    resetForm();
  }

  function handleDelete(skillId: string) {
    dispatch(deleteScoutSkillThunk({ scoutId, skillId }));
  }

  return (
    <Card>
      <ListSectionHeader
        title="Skills"
        count={skills.length}
        onAddClick={() => setIsAdding(true)}
      />

      {isAdding && (
        <div className="px-5 sm:px-6 pb-5 border-t border-voita-border pt-4 flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <TextInput
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Label"
            />
            <IconKeySelect value={iconKey} onChange={setIconKey} />
          </div>
          <TextInput
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Subtitle / description"
          />
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 rounded-lg border border-voita-border text-voita-text-secondary text-xs font-medium hover:bg-voita-card-hover transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAdd}
              disabled={submitting}
              className="px-4 py-2 rounded-lg bg-voita-accent text-voita-bg text-xs font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {submitting ? "Adding..." : "Add"}
            </button>
          </div>
        </div>
      )}

      <div>
        {skills.map((skill) => (
          <SkillListItem
            key={skill.id}
            skill={skill}
            onDelete={() => handleDelete(skill.id)}
          />
        ))}
      </div>
    </Card>
  );
}
