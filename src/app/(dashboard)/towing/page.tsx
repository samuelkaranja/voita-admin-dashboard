"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import SearchInput from "@/components/ui/SearchInput";
import FilterPills from "@/components/ui/FilterPills";
import TowingTable from "@/components/towing/TowingTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchTowingProvidersThunk,
  deleteTowingProviderThunk,
} from "@/store/slices/towingSlice";
import { VehicleType } from "@/types";

const FILTERS = ["All", "Flatbed", "Roadside", "Heavy Duty"] as const;
type Filter = (typeof FILTERS)[number];

export default function TowingPage() {
  const dispatch = useAppDispatch();
  const {
    items: providers,
    status,
    error,
  } = useAppSelector((state) => state.towing);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  useEffect(() => {
    dispatch(fetchTowingProvidersThunk());
  }, [dispatch]);

  const filtered = useMemo(() => {
    return providers.filter((p) => {
      const matchesFilter =
        filter === "All" || p.vehicleType === (filter as VehicleType);
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [providers, search, filter]);

  function handleDelete(id: string) {
    dispatch(deleteTowingProviderThunk(id));
  }

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Towing"
        action={{ label: "Add Provider", href: "/towing/add", icon: Plus }}
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search towing providers..."
        />
        <FilterPills options={FILTERS} active={filter} onChange={setFilter} />
      </div>

      {status === "loading" && (
        <p className="text-voita-text-muted text-sm">
          Loading towing providers...
        </p>
      )}
      {status === "failed" && <p className="text-red-400 text-sm">{error}</p>}
      {status === "succeeded" && (
        <TowingTable providers={filtered} onDelete={handleDelete} />
      )}
    </div>
  );
}
