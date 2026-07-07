import { Star } from "lucide-react";

export default function StarRating({ rating }: { rating: number }) {
  const filled = Math.round(rating);

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={13}
            className={
              i < filled ? "fill-amber-400 text-amber-400" : "text-voita-border"
            }
          />
        ))}
      </div>
      <span className="text-voita-text-secondary text-xs">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
