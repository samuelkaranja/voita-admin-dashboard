import Link from "next/link";
import { Eye, Pencil, UserPlus, Trash2 } from "lucide-react";

interface RoomRowActionsProps {
  detailHref: string;
  editHref: string;
  manageMembersHref?: string;
  onDelete: () => void;
}

export default function RoomRowActions({
  detailHref,
  editHref,
  manageMembersHref,
  onDelete,
}: RoomRowActionsProps) {
  return (
    <div className="flex items-center gap-3">
      <Link
        href={detailHref}
        className="text-voita-text-secondary hover:text-voita-accent transition-colors"
      >
        <Eye size={15} />
      </Link>
      <Link
        href={editHref}
        className="text-voita-text-secondary hover:text-voita-accent transition-colors"
      >
        <Pencil size={15} />
      </Link>
      {manageMembersHref && (
        <Link
          href={manageMembersHref}
          className="text-voita-text-secondary hover:text-voita-accent transition-colors"
        >
          <UserPlus size={15} />
        </Link>
      )}
      <button
        onClick={onDelete}
        className="text-voita-text-secondary hover:text-red-400 transition-colors"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
