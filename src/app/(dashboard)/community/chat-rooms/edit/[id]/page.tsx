"use client";

import { use, useEffect } from "react";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import FormCard from "@/components/forms/FormCard";
import EditRoomForm from "@/components/community/EditRoomForm";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchRoomByIdThunk,
  clearSelectedRoom,
} from "@/store/slices/communitySlice";

export default function EditRoomPage({
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
        title="Edit Room"
        breadcrumb={[
          { label: "Community Rooms", href: "/community/chat-rooms" },
          { label: "Edit Room" },
        ]}
      />
      <FormCard>
        <EditRoomForm room={selectedRoom} />
      </FormCard>
    </div>
  );
}
