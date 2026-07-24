export default function SidebarSectionHeader({ label }: { label: string }) {
  return (
    <p className="px-4 mt-4 mb-1 text-[11px] font-semibold uppercase tracking-wide text-voita-text-muted">
      {label}
    </p>
  );
}
