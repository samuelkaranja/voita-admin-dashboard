"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import ListSectionHeader from "@/components/ui/ListSectionHeader";
import PartnerListItem from "@/components/mechanics/PartnerListItem";
import SearchableCombobox from "@/components/ui/SearchableCombobox";
import { InsurancePartner } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchInsurancePartnersListThunk,
  addInsurancePartnerThunk,
  assignExistingInsurancePartnerThunk,
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
  const allPartners = useAppSelector(
    (state) => state.mechanics.allInsurancePartners,
  );
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAdding) {
      dispatch(fetchInsurancePartnersListThunk());
    }
  }, [isAdding, dispatch]);

  // Don't re-suggest partners already linked to this mechanic
  const linkedIds = new Set(partners.map((p) => p.id));
  const selectableOptions = allPartners
    .filter((p) => !linkedIds.has(p.id))
    .map((p) => ({ id: p.id, label: p.name }));

  async function handleSelectExisting(option: { id: string; label: string }) {
    setSubmitting(true);
    setError(null);
    const result = await dispatch(
      assignExistingInsurancePartnerThunk({
        mechanicId,
        partnerId: option.id,
        name: option.label,
      }),
    );
    setSubmitting(false);
    if (assignExistingInsurancePartnerThunk.fulfilled.match(result)) {
      setIsAdding(false);
    } else {
      setError(
        (result.payload as string) ?? "Failed to assign insurance partner",
      );
    }
  }

  async function handleCreateNew(name: string) {
    setSubmitting(true);
    setError(null);
    const result = await dispatch(
      addInsurancePartnerThunk({ mechanicId, name }),
    );
    setSubmitting(false);
    if (addInsurancePartnerThunk.fulfilled.match(result)) {
      setIsAdding(false);
    } else {
      setError(
        (result.payload as string) ?? "Failed to create insurance partner",
      );
    }
  }

  function handleDelete(partnerId: string) {
    dispatch(removeInsurancePartnerThunk({ mechanicId, partnerId }));
  }

  return (
    <Card>
      <ListSectionHeader
        title="Insurance Partners"
        count={partners.length}
        onAddClick={() => {
          setError(null);
          setIsAdding(true);
        }}
      />

      {isAdding && (
        <div className="px-5 sm:px-6 pb-5 border-t border-voita-border pt-4 flex flex-col gap-3">
          {error && (
            <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <SearchableCombobox
            options={selectableOptions}
            placeholder={
              submitting
                ? "Working..."
                : "Search or add an insurance partner..."
            }
            onSelectExisting={handleSelectExisting}
            onCreateNew={handleCreateNew}
          />

          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-lg border border-voita-border text-voita-text-secondary text-xs font-medium hover:bg-voita-card-hover transition-colors"
            >
              Close
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
