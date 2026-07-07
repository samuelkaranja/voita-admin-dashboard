import Image from "next/image";

export default function ReviewerAvatar({
  name,
  avatarUrl,
}: {
  name: string;
  avatarUrl?: string;
}) {
  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt={name}
        width={32}
        height={32}
        className="rounded-full object-cover shrink-0"
        unoptimized
      />
    );
  }

  const initial = name.trim().charAt(0).toUpperCase();
  return (
    <div className="w-8 h-8 shrink-0 rounded-full bg-voita-card-hover flex items-center justify-center">
      <span className="text-voita-text-secondary text-xs font-semibold">
        {initial}
      </span>
    </div>
  );
}
