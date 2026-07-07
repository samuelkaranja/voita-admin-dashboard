import clsx from "clsx";

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "bg-voita-card border border-voita-border rounded-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
