"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Pill from "@/components/ui/Pill";
import PageHeader from "@/components/layout/PageHeader";
import JoinRequestCard from "@/components/community/JoinRequestCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchJoinRequestsThunk,
  approveJoinRequestThunk,
  rejectJoinRequestThunk,
} from "@/store/slices/communitySlice";
import FilterChip from "@/components/community/FilterChip";

export default function JoinRequestsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { joinRequests, requestsStatus, requestsError } = useAppSelector(
    (state) => state.community,
  );

  const roomId = searchParams.get("room");
  const roomName = searchParams.get("roomName");

  useEffect(() => {
    dispatch(fetchJoinRequestsThunk());
  }, [dispatch]);

  const filtered = useMemo(() => {
    if (!roomId) return joinRequests;
    return joinRequests.filter((r) => r.roomId === roomId);
  }, [joinRequests, roomId]);

  function clearFilter() {
    router.push("/community/join-requests");
  }

  function handleApprove(id: string) {
    dispatch(approveJoinRequestThunk(id));
  }

  function handleReject(id: string) {
    dispatch(rejectJoinRequestThunk(id));
  }

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Join Requests"
        badge={<Pill label={`${filtered.length} Pending`} color="accent" />}
      />

      {roomId && roomName && (
        <FilterChip
          label={decodeURIComponent(roomName)}
          onClear={clearFilter}
        />
      )}

      {requestsStatus === "loading" && (
        <p className="text-voita-text-muted text-sm">
          Loading join requests...
        </p>
      )}
      {requestsStatus === "failed" && (
        <p className="text-red-400 text-sm">{requestsError}</p>
      )}

      {requestsStatus === "succeeded" && filtered.length === 0 && (
        <div className="bg-voita-card border border-voita-border rounded-xl p-10 flex flex-col items-center justify-center text-center gap-2">
          <p className="text-voita-text font-medium text-sm">
            No pending requests
          </p>
          <p className="text-voita-text-muted text-xs max-w-sm">
            {roomId
              ? "This room has no pending join requests right now."
              : "There are no pending community join requests."}
          </p>
        </div>
      )}

      {requestsStatus === "succeeded" && filtered.length > 0 && (
        <div className="flex flex-col gap-3">
          {filtered.map((request) => (
            <JoinRequestCard
              key={request.id}
              request={request}
              onApprove={() => handleApprove(request.id)}
              onReject={() => handleReject(request.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
