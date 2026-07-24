"use client";

import { use, useEffect } from "react";
import { notFound } from "next/navigation";
import { Pencil } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";
import RoomTypeBadge from "@/components/ui/RoomTypeBadge";
import MembersCard from "@/components/community/MembersCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchRoomByIdThunk,
  clearSelectedRoom,
} from "@/store/slices/communitySlice";

export default function RoomDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const dispatch = useAppDispatch();
  const { selectedRoom, selectedRoomStatus } = useAppSelector(
    (state) => state.community,
  );

  useEffect(() => {
    dispatch(fetchRoomByIdThunk(id));
    return () => {
      dispatch(clearSelectedRoom());
    };
  }, [dispatch, id]);

  if (selectedRoomStatus === "loading" || !selectedRoom) {
    return <p className="text-voita-text-muted text-sm">Loading room...</p>;
  }
  if (selectedRoomStatus === "failed") notFound();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={selectedRoom.name}
        breadcrumb={[
          { label: "Community Rooms", href: "/community/chat-rooms" },
          { label: selectedRoom.name },
        ]}
        action={{
          label: "Edit Room",
          href: `/community/chat-rooms/edit/${selectedRoom.id}`,
          icon: Pencil,
        }}
      />

      <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
        <Card className="p-5 sm:p-8 flex flex-col gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <RoomTypeBadge type={selectedRoom.type} />
            {selectedRoom.brandSlug && (
              <span className="text-voita-text-muted text-xs">
                Brand: {selectedRoom.brandSlug}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-voita-text-muted text-xs uppercase tracking-wide">
                Members
              </p>
              <p className="text-voita-text font-semibold text-lg mt-1">
                {selectedRoom.memberCount.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-voita-text-muted text-xs uppercase tracking-wide">
                Pending Requests
              </p>
              <p className="text-voita-text font-semibold text-lg mt-1">
                {selectedRoom.pendingRequestCount}
              </p>
            </div>
          </div>

          {selectedRoom.description && (
            <div>
              <p className="text-voita-text-muted text-xs uppercase tracking-wide mb-1">
                Description
              </p>
              <p className="text-voita-text-secondary text-sm">
                {selectedRoom.description}
              </p>
            </div>
          )}

          {selectedRoom.rulesText && (
            <div>
              <p className="text-voita-text-muted text-xs uppercase tracking-wide mb-1">
                Rules
              </p>
              <p className="text-voita-text-secondary text-sm whitespace-pre-line">
                {selectedRoom.rulesText}
              </p>
            </div>
          )}
        </Card>

        <MembersCard roomId={selectedRoom.id} />
      </div>
    </div>
  );
}
