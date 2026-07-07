import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

interface RowActionsProps {
  editHref?: string;
  onDelete?: () => void;
}

export default function RowActions({ editHref, onDelete }: RowActionsProps) {
  return (
    <div className="flex items-center gap-3">
      {editHref && (
        <Link
          href={editHref}
          className="text-voita-text-secondary hover:text-voita-accent transition-colors"
        >
          <Pencil size={15} />
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
