"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TowingProvider, VehicleType, TowingAvailability } from "@/types";
import FormField from "@/components/forms/FormField";
import TextInput from "@/components/forms/TextInput";
import TextArea from "@/components/forms/TextArea";
import Select from "@/components/forms/Select";
import ImageUploadInput from "@/components/forms/ImageUploadInput";
import ToggleSwitch from "@/components/forms/ToggleSwitch";
import FormActions from "@/components/forms/FormActions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateTowingProviderThunk } from "@/store/slices/towingSlice";
import {
  vehicleTypeToBackend,
  availabilityToBackend,
} from "@/lib/api/towingApi";

const VEHICLE_TYPES: VehicleType[] = ["Flatbed", "Roadside", "Heavy Duty"];
const AVAILABILITY_OPTIONS: TowingAvailability[] = ["Available", "Busy"];

export default function EditTowingForm({
  provider,
}: {
  provider: TowingProvider;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutationStatus, mutationError } = useAppSelector(
    (state) => state.towing,
  );

  const [name, setName] = useState(provider.name);
  const [description, setDescription] = useState(provider.description);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [phoneNumber, setPhoneNumber] = useState(provider.phoneNumber);
  const [etaMin, setEtaMin] = useState(provider.etaMinMins?.toString() ?? "");
  const [etaMax, setEtaMax] = useState(provider.etaMaxMins?.toString() ?? "");
  const [vehicleType, setVehicleType] = useState<VehicleType>(
    provider.vehicleType,
  );
  const [availability, setAvailability] = useState<TowingAvailability>(
    provider.availability,
  );
  const [rating, setRating] = useState(provider.rating.toString());
  const [isPartner, setIsPartner] = useState(provider.isPartner);
  const [verified, setVerified] = useState(provider.verified);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await dispatch(
      updateTowingProviderThunk({
        id: provider.id,
        payload: {
          name,
          description,
          phone_number: phoneNumber,
          eta_min: etaMin ? Number(etaMin) : undefined,
          eta_max: etaMax ? Number(etaMax) : undefined,
          vehicle_type: vehicleTypeToBackend(vehicleType),
          availability: availabilityToBackend(availability),
          rating: rating ? Number(rating) : undefined,
          is_partner: isPartner,
          verified,
        },
        photoFile,
      }),
    );
    if (updateTowingProviderThunk.fulfilled.match(result)) {
      router.push("/towing");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {mutationStatus === "failed" && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
          {mutationError}
        </p>
      )}

      <FormField label="Name">
        <TextInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </FormField>

      <FormField label="Description / About">
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </FormField>

      <FormField label="Photo">
        <ImageUploadInput
          initialUrl={provider.avatarUrl}
          onFileSelect={setPhotoFile}
        />
      </FormField>

      <FormField label="Phone Number">
        <TextInput
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Min ETA (mins)">
          <TextInput
            type="number"
            min={0}
            value={etaMin}
            onChange={(e) => setEtaMin(e.target.value)}
          />
        </FormField>
        <FormField label="Max ETA (mins)">
          <TextInput
            type="number"
            min={0}
            value={etaMax}
            onChange={(e) => setEtaMax(e.target.value)}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Vehicle Type">
          <Select
            options={VEHICLE_TYPES}
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value as VehicleType)}
          />
        </FormField>
        <FormField label="Availability">
          <Select
            options={AVAILABILITY_OPTIONS}
            value={availability}
            onChange={(e) =>
              setAvailability(e.target.value as TowingAvailability)
            }
          />
        </FormField>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end gap-4">
        <div className="w-full sm:max-w-[160px]">
          <FormField label="Rating (1–5)">
            <TextInput
              type="number"
              min={1}
              max={5}
              step={0.1}
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </FormField>
        </div>
        <div className="flex items-center gap-6 pb-0.5 sm:pb-2.5">
          <ToggleSwitch
            label="Is Partner"
            checked={isPartner}
            onChange={setIsPartner}
          />
          <ToggleSwitch
            label="Verified"
            checked={verified}
            onChange={setVerified}
          />
        </div>
      </div>

      <div className="pt-2">
        <FormActions
          onCancel={() => router.push("/towing")}
          saveLabel={
            mutationStatus === "loading" ? "Saving..." : "Update Provider"
          }
        />
      </div>
    </form>
  );
}
