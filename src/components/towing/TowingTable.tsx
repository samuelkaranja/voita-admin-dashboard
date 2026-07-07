"use client";

import { useState } from "react";
import Image from "next/image";
import { TowingProvider } from "@/types";
import StarRating from "@/components/ui/StarRating";
import RowActions from "@/components/ui/RowActions";
import ConfirmModal from "@/components/ui/ConfirmModal";
import VehicleTypeBadge from "@/components/ui/VehicleTypeBadge";
import AvailabilityStatus from "@/components/ui/AvailabilityStatus";
import PartnerBadge from "@/components/ui/PartnerBadge";
import EtaRangeLabel from "@/components/ui/EtaRangeLabel";
import clsx from "clsx";

interface TowingTableProps {
  providers: TowingProvider[];
  onDelete: (id: string) => void;
}

export default function TowingTable({ providers, onDelete }: TowingTableProps) {
  const [pendingDelete, setPendingDelete] = useState<TowingProvider | null>(
    null,
  );

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
              <th className="px-6 py-3 font-medium">Vehicle Type</th>
              <th className="px-6 py-3 font-medium">ETA Range</th>
              <th className="px-6 py-3 font-medium">Availability</th>
              <th className="px-6 py-3 font-medium">Partner</th>
              <th className="px-6 py-3 font-medium">Rating</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((p, i) => (
              <tr
                key={p.id}
                className={clsx(
                  "border-t border-voita-border",
                  i % 2 === 1 && "bg-white/1.5",
                )}
              >
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-3">
                    {hasValidAvatar(p.avatarUrl) ? (
                      <Image
                        src={p.avatarUrl!}
                        alt={p.name}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold text-gray-700">
                        {p.name?.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <span className="text-voita-text font-medium">
                      {p.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-3.5">
                  <VehicleTypeBadge type={p.vehicleType} />
                </td>
                <td className="px-6 py-3.5">
                  <EtaRangeLabel min={p.etaMinMins} max={p.etaMaxMins} />
                </td>
                <td className="px-6 py-3.5">
                  <AvailabilityStatus status={p.availability} />
                </td>
                <td className="px-6 py-3.5">
                  <PartnerBadge isPartner={p.isPartner} />
                </td>
                <td className="px-6 py-3.5">
                  <StarRating rating={p.rating} />
                </td>
                <td className="px-6 py-3.5">
                  <RowActions
                    editHref={`/towing/edit/${p.id}`}
                    onDelete={() => setPendingDelete(p)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile / tablet cards */}
        <div className="lg:hidden divide-y divide-voita-border">
          {providers.map((p) => (
            <div key={p.id} className="p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {hasValidAvatar(p.avatarUrl) ? (
                    <Image
                      src={p.avatarUrl!}
                      alt={p.name}
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold text-gray-700">
                      {p.name?.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-voita-text font-medium text-sm">
                      {p.name}
                    </p>
                    <VehicleTypeBadge type={p.vehicleType} />
                  </div>
                </div>
                <RowActions
                  editHref={`/towing/edit/${p.id}`}
                  onDelete={() => setPendingDelete(p)}
                />
              </div>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <EtaRangeLabel min={p.etaMinMins} max={p.etaMaxMins} />
                <AvailabilityStatus status={p.availability} />
              </div>
              <div className="flex items-center justify-between">
                <StarRating rating={p.rating} />
                <PartnerBadge isPartner={p.isPartner} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConfirmModal
        isOpen={pendingDelete !== null}
        title="Delete towing provider?"
        message={
          pendingDelete
            ? `This will permanently remove ${pendingDelete.name} from the Towing list. This action cannot be undone.`
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
