"use client";

import { useState } from "react";
import Image from "next/image";
import { CarWash } from "@/types";
import StarRating from "@/components/ui/StarRating";
import StatusBadge from "@/components/ui/StatusBadge";
import RowActions from "@/components/ui/RowActions";
import ConfirmModal from "@/components/ui/ConfirmModal";
import LocationLabel from "@/components/ui/LocationLabel";
import WaitTimeLabel from "@/components/ui/WaitTimeLabel";
import TagList from "@/components/ui/TagList";
import clsx from "clsx";

interface CarWashTableProps {
  carWashes: CarWash[];
  onDelete: (id: string) => void;
}

export default function CarWashTable({
  carWashes,
  onDelete,
}: CarWashTableProps) {
  const [pendingDelete, setPendingDelete] = useState<CarWash | null>(null);

  function confirmDelete() {
    if (pendingDelete) {
      onDelete(pendingDelete.id);
      setPendingDelete(null);
    }
  }

  const hasValidAvatar = (url?: string | null) => {
    return !!url && url.trim() !== "";
  };

  return (
    <>
      <div className="bg-voita-card rounded-xl border border-voita-border overflow-hidden">
        {/* Desktop table */}
        <table className="w-full text-sm hidden lg:table">
          <thead>
            <tr className="text-left text-voita-text-muted text-xs uppercase tracking-wide">
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Area / Location</th>
              <th className="px-6 py-3 font-medium">Rating</th>
              <th className="px-6 py-3 font-medium">Wait Time</th>
              <th className="px-6 py-3 font-medium">Verified</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {carWashes.map((c, i) => (
              <tr
                key={c.id}
                className={clsx(
                  "border-t border-voita-border",
                  i % 2 === 1 && "bg-white/1.5",
                )}
              >
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-3">
                    {hasValidAvatar(c.avatarUrl) ? (
                      <Image
                        src={c.avatarUrl!}
                        alt={c.name}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold text-gray-700">
                        {c.name?.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <span className="text-voita-text font-medium">
                      {c.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-3.5">
                  <LocationLabel text={c.area} />
                </td>
                <td className="px-6 py-3.5">
                  <StarRating rating={c.rating} />
                </td>
                <td className="px-6 py-3.5">
                  <WaitTimeLabel minutes={c.waitTimeMins} />
                </td>
                <td className="px-6 py-3.5">
                  <StatusBadge verified={c.verified} />
                </td>
                <td className="px-6 py-3.5">
                  <RowActions
                    editHref={`/car-wash/edit/${c.id}`}
                    onDelete={() => setPendingDelete(c)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile / tablet cards */}
        <div className="lg:hidden divide-y divide-voita-border">
          {carWashes.map((c) => (
            <div key={c.id} className="p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {hasValidAvatar(c.avatarUrl) ? (
                    <Image
                      src={c.avatarUrl!}
                      alt={c.name}
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold text-gray-700">
                      {c.name?.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-voita-text font-medium text-sm">
                      {c.name}
                    </p>
                    <LocationLabel text={c.area} />
                  </div>
                </div>
                <RowActions
                  editHref={`/car-wash/edit/${c.id}`}
                  onDelete={() => setPendingDelete(c)}
                />
              </div>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <StarRating rating={c.rating} />
                <WaitTimeLabel minutes={c.waitTimeMins} />
                <StatusBadge verified={c.verified} />
              </div>
              <TagList tags={c.tags} maxVisible={3} />
            </div>
          ))}
        </div>
      </div>

      <ConfirmModal
        isOpen={pendingDelete !== null}
        title="Delete car wash provider?"
        message={
          pendingDelete
            ? `This will permanently remove ${pendingDelete.name} from the Car Wash list. This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete"
        isDangerous
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  );
}
