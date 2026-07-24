"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import MemberListItem from "@/components/community/MemberListItem";
import TablePagination from "@/components/ui/TablePagination";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchRoomMembersThunk,
  removeRoomMemberThunk,
} from "@/store/slices/communitySlice";
import { RoomMember } from "@/types";

const PAGE_SIZE = 20;

export default function MembersCard({ roomId }: { roomId: string }) {
  const dispatch = useAppDispatch();
  const { members, membersTotal, membersPage, membersStatus } = useAppSelector(
    (state) => state.community,
  );
  const [pendingRemove, setPendingRemove] = useState<RoomMember | null>(null);

  useEffect(() => {
    dispatch(fetchRoomMembersThunk({ roomId, page: 1, pageSize: PAGE_SIZE }));
  }, [dispatch, roomId]);

  const totalPages = Math.max(1, Math.ceil(membersTotal / PAGE_SIZE));

  function goToPage(page: number) {
    dispatch(fetchRoomMembersThunk({ roomId, page, pageSize: PAGE_SIZE }));
  }

  function confirmRemove() {
    if (pendingRemove) {
      dispatch(removeRoomMemberThunk({ roomId, userId: pendingRemove.userId }));
      setPendingRemove(null);
    }
  }

  return (
    <Card>
      <div className="px-5 sm:px-6 py-4">
        <h3 className="text-voita-text font-semibold text-sm">Members</h3>
        <p className="text-voita-text-muted text-xs mt-0.5">
          {membersTotal} total
        </p>
      </div>

      {membersStatus === "loading" && (
        <p className="px-5 sm:px-6 pb-5 text-voita-text-muted text-sm">
          Loading members...
        </p>
      )}

      {membersStatus === "succeeded" && members.length === 0 && (
        <p className="px-5 sm:px-6 pb-5 text-voita-text-muted text-sm">
          No members yet.
        </p>
      )}

      {membersStatus === "succeeded" && members.length > 0 && (
        <>
          <div>
            {members.map((member) => (
              <MemberListItem
                key={member.id}
                member={member}
                onRemove={() => setPendingRemove(member)}
              />
            ))}
          </div>
          <div className="px-5 sm:px-6 py-4 border-t border-voita-border">
            <TablePagination
              shown={members.length}
              total={membersTotal}
              itemLabel="members"
              hasPrevious={membersPage > 1}
              hasNext={membersPage < totalPages}
              onPrevious={() => goToPage(membersPage - 1)}
              onNext={() => goToPage(membersPage + 1)}
            />
          </div>
        </>
      )}

      <ConfirmModal
        isOpen={pendingRemove !== null}
        title="Remove member?"
        message={
          pendingRemove
            ? `${pendingRemove.userName} will lose access to this room immediately. Their past messages will remain.`
            : ""
        }
        confirmLabel="Remove"
        isDangerous
        onConfirm={confirmRemove}
        onCancel={() => setPendingRemove(null)}
      />
    </Card>
  );
}
