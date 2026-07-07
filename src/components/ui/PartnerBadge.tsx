export default function PartnerBadge({ isPartner }: { isPartner: boolean }) {
  if (!isPartner) return null;

  return (
    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-voita-accent-dim text-voita-accent border border-voita-accent/30">
      Partner
    </span>
  );
}
