interface TagListProps {
  tags: string[];
  maxVisible?: number;
}

export default function TagList({ tags, maxVisible = 2 }: TagListProps) {
  const visible = tags.slice(0, maxVisible);
  const overflowCount = tags.length - visible.length;

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {visible.map((tag) => (
        <span
          key={tag}
          className="px-2 py-1 rounded-md text-xs font-medium bg-voita-bg text-voita-text-secondary border border-voita-border whitespace-nowrap"
        >
          {tag}
        </span>
      ))}
      {overflowCount > 0 && (
        <span className="px-2 py-1 rounded-md text-xs font-medium bg-voita-bg text-voita-text-muted border border-voita-border">
          +{overflowCount}
        </span>
      )}
    </div>
  );
}
