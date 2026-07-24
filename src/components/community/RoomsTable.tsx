"use client";

import { useState } from "react";
import Image from "next/image";
import { CommunityRoom } from "@/types";
import RoomTypeBadge from "@/components/ui/RoomTypeBadge";
import ConfirmModal from "@/components/ui/ConfirmModal";
import clsx from "clsx";
import PendingCountBadge from "../ui/PendingCountBadge";
import RoomRowActions from "./RoomRowActions";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

interface RoomsTableProps {
  rooms: CommunityRoom[];
  onDelete: (id: string) => void;
}

function RoomIcon({ room }: { room: CommunityRoom }) {
  if (room.iconUrl) {
    return (
      <Image
        src={room.iconUrl}
        alt={room.name}
        width={60}
        height={60}
        className="rounded-lg object-cover shrink-0"
        unoptimized
      />
    );
  }
  return (
    <div className="w-10 h-10 rounded-lg bg-voita-card-hover flex items-center justify-center shrink-0">
      <span className="text-voita-text-secondary text-sm font-semibold">
        {room.name.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}

export default function RoomsTable({ rooms, onDelete }: RoomsTableProps) {
  const [pendingDelete, setPendingDelete] = useState<CommunityRoom | null>(
    null,
  );

  function confirmDelete() {
    if (pendingDelete) {
      onDelete(pendingDelete.id);
      setPendingDelete(null);
    }
  }

  return (
    <>
      <div className="bg-voita-card rounded-xl border border-voita-border overflow-hidden">
        <table className="w-full text-sm hidden lg:table">
          <thead>
            <tr className="text-left text-voita-text-muted text-xs uppercase tracking-wide">
              <th className="px-6 py-3 font-medium">Room Icon</th>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Type</th>
              <th className="px-6 py-3 font-medium">Member Count</th>
              <th className="px-6 py-3 font-medium">Pending Requests</th>
              <th className="px-6 py-3 font-medium">Created Date</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, i) => (
              <tr
                key={room.id}
                className={clsx(
                  "border-t border-voita-border",
                  i % 2 === 1 && "bg-white/1.5",
                )}
              >
                <td className="px-6 py-3.5">
                  <RoomIcon room={room} />
                </td>
                <td className="px-6 py-3.5">
                  <p className="text-voita-text font-medium">{room.name}</p>
                  {room.brandSlug && (
                    <p className="text-voita-text-muted text-xs mt-0.5">
                      {room.brandSlug}
                    </p>
                  )}
                </td>
                <td className="px-6 py-3.5">
                  <RoomTypeBadge type={room.type} />
                </td>
                <td className="px-6 py-3.5 text-voita-text-secondary">
                  {room.memberCount.toLocaleString()}
                </td>
                <td className="px-6 py-3.5">
                  <PendingCountBadge count={room.pendingRequestCount} />
                </td>
                <td className="px-6 py-3.5 text-voita-text-secondary">
                  {formatDate(room.createdAt)}
                </td>
                <td className="px-6 py-3.5">
                  <RoomRowActions
                    detailHref={`/community/chat-rooms/${room.id}`}
                    editHref={`/community/chat-rooms/edit/${room.id}`}
                    manageMembersHref={
                      room.pendingRequestCount > 0
                        ? `/community/join-requests?room=${room.id}&roomName=${encodeURIComponent(room.name)}`
                        : undefined
                    }
                    onDelete={() => setPendingDelete(room)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="lg:hidden divide-y divide-voita-border">
          {rooms.map((room) => (
            <div key={room.id} className="p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <RoomIcon room={room} />
                  <div>
                    <p className="text-voita-text font-medium text-sm">
                      {room.name}
                    </p>
                    {room.brandSlug && (
                      <p className="text-voita-text-muted text-xs">
                        {room.brandSlug}
                      </p>
                    )}
                  </div>
                </div>
                <RoomRowActions
                  detailHref={`/community/chat-rooms/${room.id}`}
                  editHref={`/community/chat-rooms/edit/${room.id}`}
                  manageMembersHref={
                    room.pendingRequestCount > 0
                      ? `/community/join-requests?room=${room.id}&roomName=${encodeURIComponent(room.name)}`
                      : undefined
                  }
                  onDelete={() => setPendingDelete(room)}
                />
              </div>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <RoomTypeBadge type={room.type} />
                <PendingCountBadge count={room.pendingRequestCount} />
              </div>
              <div className="flex items-center justify-between text-xs text-voita-text-muted">
                <span>{room.memberCount.toLocaleString()} members</span>
                <span>{formatDate(room.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConfirmModal
        isOpen={pendingDelete !== null}
        title="Delete room?"
        message={
          pendingDelete
            ? `This will permanently remove ${pendingDelete.name} and all its messages, members, and join requests. This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete"
        isDangerous
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  );
}
