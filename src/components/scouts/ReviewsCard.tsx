"use client";

import Card from "@/components/ui/Card";
import ReviewListItem from "@/components/scouts/ReviewListItem";
import { ScoutReview } from "@/types";
import { useAppDispatch } from "@/store/hooks";
import { deleteScoutReviewThunk } from "@/store/slices/scoutsSlice";

interface ReviewsCardProps {
  scoutId: string;
  reviews: ScoutReview[];
}

export default function ReviewsCard({ scoutId, reviews }: ReviewsCardProps) {
  const dispatch = useAppDispatch();

  function handleDelete(reviewId: string) {
    dispatch(deleteScoutReviewThunk({ scoutId, reviewId }));
  }

  return (
    <Card>
      <div className="px-5 sm:px-6 py-4">
        <h3 className="text-voita-text font-semibold text-sm">Reviews</h3>
        <p className="text-voita-text-muted text-xs mt-0.5">
          {reviews.length} {reviews.length === 1 ? "review" : "reviews"}{" "}
          &middot; submitted by users, moderation only
        </p>
      </div>

      <div>
        {reviews.map((review) => (
          <ReviewListItem
            key={review.id}
            review={review}
            onDelete={() => handleDelete(review.id)}
          />
        ))}
        {reviews.length === 0 && (
          <p className="px-5 sm:px-6 pb-5 text-voita-text-muted text-sm">
            No reviews yet.
          </p>
        )}
      </div>
    </Card>
  );
}
