"use client";

import { useState } from "react";
import Image from "next/image";
import { Scout } from "@/types";
import StarRating from "@/components/ui/StarRating";
import StatusBadge from "@/components/ui/StatusBadge";
import RowActions from "@/components/ui/RowActions";
import ConfirmModal from "@/components/ui/ConfirmModal";
import CtaTypeBadge from "@/components/ui/CtaTypeBadge";
import MissionsCount from "@/components/ui/MissionsCount";
import clsx from "clsx";

interface ScoutsTableProps {
  scouts: Scout[];
  onDelete: (id: string) => void;
}

export default function ScoutsTable({ scouts, onDelete }: ScoutsTableProps) {
  const [pendingDelete, setPendingDelete] = useState<Scout | null>(null);

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
              <th className="px-6 py-3 font-medium">Scout</th>
              <th className="px-6 py-3 font-medium">Role</th>
              <th className="px-6 py-3 font-medium">Rating</th>
              <th className="px-6 py-3 font-medium">Missions</th>
              <th className="px-6 py-3 font-medium">CTA Type</th>
              <th className="px-6 py-3 font-medium">Verified</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {scouts.map((s, i) => (
              <tr
                key={s.id}
                className={clsx(
                  "border-t border-voita-border",
                  i % 2 === 1 && "bg-white/1.5",
                )}
              >
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-3">
                    {hasValidAvatar(s.avatarUrl) ? (
                      <Image
                        src={s.avatarUrl!}
                        alt={s.name}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold text-gray-700">
                        {s.name?.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <span className="text-voita-text font-medium">
                      {s.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-3.5 text-voita-text-secondary">
                  {s.role}
                </td>
                <td className="px-6 py-3.5">
                  <StarRating rating={s.rating} />
                </td>
                <td className="px-6 py-3.5">
                  <MissionsCount count={s.missionsCompleted} />
                </td>
                <td className="px-6 py-3.5">
                  <CtaTypeBadge type={s.ctaType} />
                </td>
                <td className="px-6 py-3.5">
                  <StatusBadge verified={s.verified} />
                </td>
                <td className="px-6 py-3.5">
                  <RowActions
                    editHref={`/scouts/edit/${s.id}`}
                    onDelete={() => setPendingDelete(s)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile / tablet cards */}
        <div className="lg:hidden divide-y divide-voita-border">
          {scouts.map((s) => (
            <div key={s.id} className="p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {hasValidAvatar(s.avatarUrl) ? (
                    <Image
                      src={s.avatarUrl!}
                      alt={s.name}
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold text-gray-700">
                      {s.name?.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-voita-text font-medium text-sm">
                      {s.name}
                    </p>
                    <p className="text-voita-text-muted text-xs">{s.role}</p>
                  </div>
                </div>
                <RowActions
                  editHref={`/scouts/edit/${s.id}`}
                  onDelete={() => setPendingDelete(s)}
                />
              </div>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <StarRating rating={s.rating} />
                <MissionsCount count={s.missionsCompleted} />
                <StatusBadge verified={s.verified} />
              </div>
              <CtaTypeBadge type={s.ctaType} />
            </div>
          ))}
        </div>
      </div>

      <ConfirmModal
        isOpen={pendingDelete !== null}
        title="Delete scout?"
        message={
          pendingDelete
            ? `This will permanently remove ${pendingDelete.name} from the Scouts list. This action cannot be undone.`
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
