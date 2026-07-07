"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import ListSectionHeader from "@/components/ui/ListSectionHeader";
import PartnerListItem from "@/components/mechanics/PartnerListItem";
import TextInput from "@/components/forms/TextInput";
import { InsurancePartner } from "@/types";
import { useAppDispatch } from "@/store/hooks";
import {
  addInsurancePartnerThunk,
  removeInsurancePartnerThunk,
} from "@/store/slices/mechanicsSlice";

interface InsurancePartnersCardProps {
  mechanicId: string;
  partners: InsurancePartner[];
}

export default function InsurancePartnersCard({
  mechanicId,
  partners,
}: InsurancePartnersCardProps) {
  const dispatch = useAppDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function resetForm() {
    setName("");
    setLogoUrl("");
    setIsAdding(false);
  }

  async function handleAdd() {
    if (!name.trim()) return;
    setSubmitting(true);
    await dispatch(
      addInsurancePartnerThunk({
        mechanicId,
        name: name.trim(),
        logoUrl: logoUrl.trim() || undefined,
      }),
    );
    setSubmitting(false);
    resetForm();
  }

  function handleDelete(partnerId: string) {
    dispatch(removeInsurancePartnerThunk({ mechanicId, partnerId }));
  }

  return (
    <Card>
      <ListSectionHeader
        title="Insurance Partners"
        count={partners.length}
        onAddClick={() => setIsAdding(true)}
      />

      {isAdding && (
        <div className="px-5 sm:px-6 pb-5 border-t border-voita-border pt-4 flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <TextInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Partner name"
            />
            <TextInput
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="Logo URL"
            />
          </div>
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

      {partners.length > 0 && (
        <div className="px-5 sm:px-6 pb-5 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {partners.map((partner) => (
            <PartnerListItem
              key={partner.id}
              partner={partner}
              onDelete={() => handleDelete(partner.id)}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
