"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import SearchInput from "@/components/ui/SearchInput";
import FilterPills from "@/components/ui/FilterPills";
import MechanicsTable from "@/components/mechanics/MechanicsTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchMechanicsThunk,
  deleteMechanicThunk,
} from "@/store/slices/mechanicsSlice";
import { SpecialtyCategory } from "@/types";

const FILTERS = [
  "All",
  "Engine",
  "Electrical",
  "Bodywork",
  "Transmission",
  "Suspension",
] as const;
type Filter = (typeof FILTERS)[number];

export default function MechanicsPage() {
  const dispatch = useAppDispatch();
  const {
    items: mechanics,
    status,
    error,
  } = useAppSelector((state) => state.mechanics);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  useEffect(() => {
    dispatch(fetchMechanicsThunk(undefined));
  }, [dispatch]);

  const filtered = useMemo(() => {
    return mechanics.filter((m) => {
      const matchesFilter =
        filter === "All" ||
        m.specialtyCategory === (filter as SpecialtyCategory);
      const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [mechanics, search, filter]);

  function handleDelete(id: string) {
    dispatch(deleteMechanicThunk(id));
  }

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Mechanics"
        action={{ label: "Add Provider", href: "/mechanics/add", icon: Plus }}
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search mechanics..."
        />
        <FilterPills options={FILTERS} active={filter} onChange={setFilter} />
      </div>

      {status === "loading" && (
        <p className="text-voita-text-muted text-sm">Loading mechanics...</p>
      )}
      {status === "failed" && <p className="text-red-400 text-sm">{error}</p>}
      {status === "succeeded" && (
        <MechanicsTable mechanics={filtered} onDelete={handleDelete} />
      )}
    </div>
  );
}
