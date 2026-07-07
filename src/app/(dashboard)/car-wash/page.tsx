"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import SearchInput from "@/components/ui/SearchInput";
import FilterPills from "@/components/ui/FilterPills";
import CarWashTable from "@/components/carwash/CarWashTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCarWashesThunk,
  deleteCarWashThunk,
} from "@/store/slices/carWashSlice";

const FILTERS = [
  "All Centers",
  "Interior",
  "Exterior",
  "Full Detail",
  "Eco-Friendly",
] as const;
type Filter = (typeof FILTERS)[number];

export default function CarWashPage() {
  const dispatch = useAppDispatch();
  const {
    items: carWashes,
    status,
    error,
  } = useAppSelector((state) => state.carWash);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("All Centers");

  useEffect(() => {
    dispatch(fetchCarWashesThunk());
  }, [dispatch]);

  const filtered = useMemo(() => {
    return carWashes.filter((c) => {
      const matchesFilter =
        filter === "All Centers" ||
        c.tags.some((tag) =>
          tag.toLowerCase().includes(filter.toLowerCase().replace(" wash", "")),
        );
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [carWashes, search, filter]);

  function handleDelete(id: string) {
    dispatch(deleteCarWashThunk(id));
  }

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Car Wash"
        action={{ label: "Add Provider", href: "/car-wash/add", icon: Plus }}
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search car washes..."
        />
        <FilterPills options={FILTERS} active={filter} onChange={setFilter} />
      </div>

      {status === "loading" && (
        <p className="text-voita-text-muted text-sm">Loading car washes...</p>
      )}
      {status === "failed" && <p className="text-red-400 text-sm">{error}</p>}
      {status === "succeeded" && (
        <CarWashTable carWashes={filtered} onDelete={handleDelete} />
      )}
    </div>
  );
}
