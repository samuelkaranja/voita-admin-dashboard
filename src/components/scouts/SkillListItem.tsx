import { Trash2 } from "lucide-react";
import { ScoutSkill } from "@/types";
import IconKeyAvatar from "@/components/ui/IconKeyAvatar";

export default function SkillListItem({
  skill,
  onDelete,
}: {
  skill: ScoutSkill;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-3.5 border-t border-voita-border">
      <div className="flex items-center gap-3 min-w-0">
        <IconKeyAvatar iconKey={skill.iconKey} />
        <div className="min-w-0">
          <p className="text-voita-text font-medium text-sm truncate">
            {skill.label}
          </p>
          <p className="text-voita-text-muted text-xs truncate">
            {skill.subtitle}
          </p>
        </div>
      </div>
      <button
        onClick={onDelete}
        className="text-voita-text-secondary hover:text-red-400 transition-colors shrink-0"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
