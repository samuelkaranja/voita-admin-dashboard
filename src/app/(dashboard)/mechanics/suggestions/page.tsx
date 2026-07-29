"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import FilterPills from "@/components/ui/FilterPills";
import SuggestionCard from "@/components/mechanics/SuggestionCard";
import TablePagination from "@/components/ui/TablePagination";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchSuggestionsThunk,
  approveSuggestionThunk,
  rejectSuggestionThunk,
} from "@/store/slices/mechanicSuggestionsSlice";
import { SuggestionStatus } from "@/types";

const FILTERS = ["pending", "approved", "rejected", "all"] as const;
const FILTER_LABELS: Record<(typeof FILTERS)[number], string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  all: "All",
};
const PAGE_SIZE = 20;

export default function MechanicSuggestionsPage() {
  const dispatch = useAppDispatch();
  const { items, total, status, error, mutatingId } = useAppSelector(
    (state) => state.mechanicSuggestions,
  );
  const [filter, setFilter] = useState<SuggestionStatus>("pending");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      fetchSuggestionsThunk({
        status: filter,
        skip: (page - 1) * PAGE_SIZE,
        limit: PAGE_SIZE,
      }),
    );
  }, [dispatch, filter, page]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function handleApprove(id: string) {
    dispatch(approveSuggestionThunk({ id }));
  }

  function handleReject(id: string) {
    dispatch(rejectSuggestionThunk({ id }));
  }

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Mechanic Suggestions"
        breadcrumb={[
          { label: "Mechanics", href: "/mechanics" },
          { label: "Suggestions" },
        ]}
      />

      <FilterPills
        options={FILTERS.map((f) => FILTER_LABELS[f])}
        active={FILTER_LABELS[filter]}
        onChange={(label) => {
          const key = (Object.keys(FILTER_LABELS) as SuggestionStatus[]).find(
            (k) => FILTER_LABELS[k] === label,
          );
          if (key) {
            setFilter(key);
            setPage(1);
          }
        }}
      />

      {status === "loading" && (
        <p className="text-voita-text-muted text-sm">Loading suggestions...</p>
      )}
      {status === "failed" && <p className="text-red-400 text-sm">{error}</p>}

      {status === "succeeded" && items.length === 0 && (
        <div className="bg-voita-card border border-voita-border rounded-xl p-10 flex flex-col items-center justify-center text-center gap-2">
          <p className="text-voita-text font-medium text-sm">
            No {filter !== "all" ? filter : ""} suggestions
          </p>
          <p className="text-voita-text-muted text-xs max-w-sm">
            Nothing to review here right now.
          </p>
        </div>
      )}

      {status === "succeeded" && items.length > 0 && (
        <>
          <div className="flex flex-col gap-3">
            {items.map((suggestion) => (
              <SuggestionCard
                key={suggestion.id}
                suggestion={suggestion}
                onApprove={() => handleApprove(suggestion.id)}
                onReject={() => handleReject(suggestion.id)}
                isMutating={mutatingId === suggestion.id}
              />
            ))}
          </div>

          <TablePagination
            shown={items.length}
            total={total}
            itemLabel="suggestions"
            hasPrevious={page > 1}
            hasNext={page < totalPages}
            onPrevious={() => setPage((p) => Math.max(1, p - 1))}
            onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
          />
        </>
      )}
    </div>
  );
}
