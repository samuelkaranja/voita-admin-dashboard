"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import ListSectionHeader from "@/components/ui/ListSectionHeader";
import ReviewListItem from "@/components/scouts/ReviewListItem";
import TextInput from "@/components/forms/TextInput";
import { ScoutReview } from "@/types";

interface ReviewsCardProps {
  reviews: ScoutReview[];
  onChange: (reviews: ScoutReview[]) => void;
}

export default function ReviewsCard({ reviews, onChange }: ReviewsCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [reviewerName, setReviewerName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");

  function resetForm() {
    setReviewerName("");
    setAvatarUrl("");
    setRating("5");
    setComment("");
    setIsAdding(false);
  }

  function handleAdd() {
    if (!reviewerName.trim() || !comment.trim()) return;
    onChange([
      ...reviews,
      {
        id: crypto.randomUUID(),
        reviewerName: reviewerName.trim(),
        avatarUrl: avatarUrl.trim() || undefined,
        rating: Math.min(5, Math.max(1, Number(rating) || 5)),
        comment: comment.trim(),
      },
    ]);
    resetForm();
  }

  return (
    <Card>
      <ListSectionHeader
        title="Reviews"
        count={reviews.length}
        onAddClick={() => setIsAdding(true)}
      />

      {isAdding && (
        <div className="px-5 sm:px-6 pb-5 border-t border-voita-border pt-4 flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <TextInput
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              placeholder="Reviewer name"
            />
            <TextInput
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="Avatar URL (optional)"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <TextInput
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="Rating (1–5)"
            />
            <TextInput
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comment"
            />
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 rounded-lg border border-voita-border text-voita-text-secondary text-xs font-medium hover:bg-voita-card-hover transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAdd}
              className="px-4 py-2 rounded-lg bg-voita-accent text-voita-bg text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              Add
            </button>
          </div>
        </div>
      )}

      <div>
        {reviews.map((review) => (
          <ReviewListItem
            key={review.id}
            review={review}
            onDelete={() => onChange(reviews.filter((r) => r.id !== review.id))}
          />
        ))}
      </div>
    </Card>
  );
}
