interface TablePaginationProps {
  shown: number;
  total: number;
  itemLabel: string;
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export default function TablePagination({
  shown,
  total,
  itemLabel,
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
}: TablePaginationProps) {
  return (
    <div className="flex items-center justify-between px-1 pt-1">
      <p className="text-voita-text-muted text-xs sm:text-sm">
        Showing {shown} of {total} {itemLabel}
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className="px-4 py-2 rounded-lg border border-voita-border text-voita-text-secondary text-xs font-medium hover:bg-voita-card-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={!hasNext}
          className="px-4 py-2 rounded-lg bg-voita-accent text-voita-bg text-xs font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
