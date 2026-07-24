import Image from "next/image";
import { Trash2 } from "lucide-react";
import { RoomMember } from "@/types";
import Pill from "@/components/ui/Pill";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export default function MemberListItem({
  member,
  onRemove,
}: {
  member: RoomMember;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-3.5 border-t border-voita-border">
      <div className="flex items-center gap-3 min-w-0">
        {member.userAvatar ? (
          <Image
            src={member.userAvatar}
            alt={member.userName}
            width={36}
            height={36}
            className="rounded-full object-cover shrink-0"
            unoptimized
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-voita-card-hover flex items-center justify-center shrink-0">
            <span className="text-voita-text-secondary text-xs font-semibold">
              {member.userName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-voita-text font-medium text-sm truncate">
              {member.userName}
            </p>
            {member.isModerator && <Pill label="Moderator" color="accent" />}
          </div>
          <p className="text-voita-text-muted text-xs mt-0.5">
            Joined {formatDate(member.joinedAt)}
          </p>
        </div>
      </div>
      <button
        onClick={onRemove}
        className="text-voita-text-secondary hover:text-red-400 transition-colors shrink-0"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
