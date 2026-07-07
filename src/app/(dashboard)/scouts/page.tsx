"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import SearchInput from "@/components/ui/SearchInput";
import FilterPills from "@/components/ui/FilterPills";
import ScoutsTable from "@/components/scouts/ScoutsTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchScoutsThunk, deleteScoutThunk } from "@/store/slices/scoutsSlice";
import { ScoutCategory } from "@/types";

const FILTERS = ["All", "Auditors", "Valet", "Drivers", "Diagnostics"] as const;
type Filter = (typeof FILTERS)[number];

export default function ScoutsPage() {
  const dispatch = useAppDispatch();
  const {
    items: scouts,
    status,
    error,
  } = useAppSelector((state) => state.scouts);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  useEffect(() => {
    dispatch(fetchScoutsThunk());
  }, [dispatch]);

  const filtered = useMemo(() => {
    return scouts.filter((s) => {
      const matchesFilter =
        filter === "All" || s.category === (filter as ScoutCategory);
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [scouts, search, filter]);

  function handleDelete(id: string) {
    dispatch(deleteScoutThunk(id));
  }

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Scouts"
        action={{ label: "Add Provider", href: "/scouts/add", icon: Plus }}
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search scouts..."
        />
        <FilterPills options={FILTERS} active={filter} onChange={setFilter} />
      </div>

      {status === "loading" && (
        <p className="text-voita-text-muted text-sm">Loading scouts...</p>
      )}
      {status === "failed" && <p className="text-red-400 text-sm">{error}</p>}
      {status === "succeeded" && (
        <ScoutsTable scouts={filtered} onDelete={handleDelete} />
      )}
    </div>
  );
}
