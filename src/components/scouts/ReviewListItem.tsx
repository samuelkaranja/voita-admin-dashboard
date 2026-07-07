import { Trash2 } from "lucide-react";
import { ScoutReview } from "@/types";
import ReviewerAvatar from "@/components/ui/ReviewerAvatar";
import StarRating from "@/components/ui/StarRating";

export default function ReviewListItem({
  review,
  onDelete,
}: {
  review: ScoutReview;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-start gap-3 px-5 sm:px-6 py-3.5 border-t border-voita-border">
      <ReviewerAvatar name={review.reviewerName} avatarUrl={review.avatarUrl} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-voita-text font-medium text-sm">
            {review.reviewerName}
          </p>
          <StarRating rating={review.rating} />
        </div>
        <p className="text-voita-text-secondary text-sm mt-1">
          {review.comment}
        </p>
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
