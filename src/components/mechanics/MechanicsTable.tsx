"use client";

import { useState } from "react";
import Image from "next/image";
import { Mechanic } from "@/types";
import StarRating from "@/components/ui/StarRating";
import StatusBadge from "@/components/ui/StatusBadge";
import AvailabilityIndicator from "@/components/ui/AvailabilityIndicator";
import RowActions from "@/components/ui/RowActions";
import ConfirmModal from "@/components/ui/ConfirmModal";
import clsx from "clsx";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

interface MechanicsTableProps {
  mechanics: Mechanic[];
  onDelete: (id: string) => void;
}

export default function MechanicsTable({
  mechanics,
  onDelete,
}: MechanicsTableProps) {
  const [pendingDelete, setPendingDelete] = useState<Mechanic | null>(null);

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
        <table className="w-full text-sm hidden md:table">
          <thead>
            <tr className="text-left text-voita-text-muted text-xs uppercase tracking-wide">
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Primary Specialty</th>
              <th className="px-6 py-3 font-medium">Rating</th>
              <th className="px-6 py-3 font-medium">Verified</th>
              <th className="px-6 py-3 font-medium">Available Today</th>
              <th className="px-6 py-3 font-medium">Date Added</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mechanics.map((m, i) => (
              <tr
                key={m.id}
                className={clsx(
                  "border-t border-voita-border",
                  i % 2 === 1 && "bg-white/1.5",
                )}
              >
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-3">
                    {hasValidAvatar(m.avatarUrl) ? (
                      <Image
                        src={m.avatarUrl!}
                        alt={m.name}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold text-gray-700">
                        {m.name?.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <span className="text-voita-text font-medium">
                      {m.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-3.5 text-voita-text-secondary">
                  {m.primarySpecialty}
                </td>
                <td className="px-6 py-3.5">
                  <StarRating rating={m.rating} />
                </td>
                <td className="px-6 py-3.5">
                  <StatusBadge verified={m.verified} />
                </td>
                <td className="px-6 py-3.5">
                  <AvailabilityIndicator available={m.availableToday} />
                </td>
                <td className="px-6 py-3.5 text-voita-text-secondary">
                  {formatDate(m.dateAdded)}
                </td>
                <td className="px-6 py-3.5">
                  <RowActions
                    editHref={`/mechanics/edit/${m.id}`}
                    onDelete={() => setPendingDelete(m)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-voita-border">
          {mechanics.map((m) => (
            <div key={m.id} className="p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {hasValidAvatar(m.avatarUrl) ? (
                    <Image
                      src={m.avatarUrl!}
                      alt={m.name}
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold text-gray-700">
                      {m.name?.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-voita-text font-medium text-sm">
                      {m.name}
                    </p>
                    <p className="text-voita-text-muted text-xs">
                      {m.primarySpecialty}
                    </p>
                  </div>
                </div>
                <RowActions
                  editHref={`/mechanics/edit/${m.id}`}
                  onDelete={() => setPendingDelete(m)}
                />
              </div>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <StarRating rating={m.rating} />
                <StatusBadge verified={m.verified} />
              </div>
              <div className="flex items-center justify-between text-xs text-voita-text-muted">
                <AvailabilityIndicator available={m.availableToday} />
                <span>{formatDate(m.dateAdded)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConfirmModal
        isOpen={pendingDelete !== null}
        title="Delete mechanic?"
        message={
          pendingDelete
            ? `This will permanently remove ${pendingDelete.name} from the Mechanics list. This action cannot be undone.`
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
