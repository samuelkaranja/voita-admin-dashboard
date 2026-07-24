import Image from "next/image";

export default function RoomIconAvatar({
  iconUrl,
  name,
}: {
  iconUrl: string;
  name: string;
}) {
  return (
    <Image
      src={iconUrl}
      alt={name}
      width={40}
      height={40}
      className="rounded-lg object-cover shrink-0"
      unoptimized
    />
  );
}
