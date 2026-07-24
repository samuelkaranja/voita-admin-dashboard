"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import SearchInput from "@/components/ui/SearchInput";
import FilterPills from "@/components/ui/FilterPills";
import RoomsTable from "@/components/community/RoomsTable";
import TablePagination from "@/components/ui/TablePagination";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchRoomsThunk,
  deleteRoomThunk,
} from "@/store/slices/communitySlice";

const FILTERS = ["All", "General", "Brand"] as const;
type Filter = (typeof FILTERS)[number];
const PAGE_SIZE = 10;

export default function ChatRoomsPage() {
  const dispatch = useAppDispatch();
  const { rooms, roomsStatus, roomsError } = useAppSelector(
    (state) => state.community,
  );
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("All");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchRoomsThunk());
  }, [dispatch]);

  const filtered = useMemo(() => {
    return rooms.filter((r) => {
      const matchesFilter =
        filter === "All" ||
        (filter === "General" ? r.type === "general" : r.type === "brand");
      const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [rooms, search, filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  function handleDelete(id: string) {
    dispatch(deleteRoomThunk(id));
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <PageHeader
          title="Community Rooms"
          action={{
            label: "Create Room",
            href: "/community/chat-rooms/add",
            icon: Plus,
          }}
        />
        <p className="text-voita-text-muted text-sm mt-1">
          Manage general and brand-specific chat rooms
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search rooms by name..."
        />
        <FilterPills
          options={FILTERS}
          active={filter}
          onChange={(v) => {
            setFilter(v);
            setPage(1);
          }}
        />
      </div>

      {roomsStatus === "loading" && (
        <p className="text-voita-text-muted text-sm">Loading rooms...</p>
      )}
      {roomsStatus === "failed" && (
        <p className="text-red-400 text-sm">{roomsError}</p>
      )}
      {roomsStatus === "succeeded" && (
        <>
          <RoomsTable rooms={paginated} onDelete={handleDelete} />
          <TablePagination
            shown={paginated.length}
            total={filtered.length}
            itemLabel="rooms"
            hasPrevious={currentPage > 1}
            hasNext={currentPage < totalPages}
            onPrevious={() => setPage((p) => Math.max(1, p - 1))}
            onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
          />
        </>
      )}
    </div>
  );
}
