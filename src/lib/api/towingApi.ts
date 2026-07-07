import { apiClient } from "@/lib/apiClient";
import {
  TowingProvider,
  TowingDetailedService,
  TowingQuickService,
  VehicleType,
  TowingAvailability,
} from "@/types";

interface BackendTowingListItem {
  id: string;
  name: string;
  rating: number;
  review_count: number;
  distance_km: number | null;
  eta_min: number | null; // was: number
  eta_max: number | null; // was: number
  tags: string[];
  availability: "available" | "busy";
  vehicle_type: string | null; // was: string
  is_partner: boolean;
  verified: boolean;
  created_at: string;
}

interface BackendTowingService {
  id: string;
  label: string;
  description: string | null;
  icon: string | null;
  is_highlighted: boolean;
}

interface BackendTowingQuickService {
  id: string;
  label: string;
  icon: string | null;
}

interface BackendTowingDetail {
  id: string;
  name: string;
  rating: number;
  review_count: number;
  eta_min: number | null;
  eta_max: number | null;
  availability: "available" | "busy";
  is_partner: boolean;
  verified: boolean;
  phone_number: string | null;
  image_url: string | null;
  description: string | null;
  vehicle_type: string | null;
  tags: string[];
  created_at: string;
  services: BackendTowingService[];
  quick_services: BackendTowingQuickService[];
  reviews: unknown[];
}

function toVehicleType(raw: string | null | undefined): VehicleType {
  if (!raw) return "Flatbed";
  const map: Record<string, VehicleType> = {
    flatbed: "Flatbed",
    roadside: "Roadside",
    heavy: "Heavy Duty",
  };
  return map[raw.toLowerCase()] ?? "Flatbed";
}

function toAvailability(raw: "available" | "busy"): TowingAvailability {
  return raw === "available" ? "Available" : "Busy";
}

function adaptDetailedService(s: BackendTowingService): TowingDetailedService {
  return {
    id: s.id,
    label: s.label,
    iconKey: s.icon ?? "truck",
    description: s.description ?? "",
    highlighted: s.is_highlighted,
  };
}

function adaptQuickService(s: BackendTowingQuickService): TowingQuickService {
  return { id: s.id, label: s.label, iconKey: s.icon ?? "wrench" };
}

function adaptListItem(item: BackendTowingListItem): TowingProvider {
  return {
    id: item.id,
    name: item.name,
    avatarUrl: "",
    vehicleType: toVehicleType(item.vehicle_type),
    etaMinMins: item.eta_min,
    etaMaxMins: item.eta_max,
    availability: toAvailability(item.availability),
    isPartner: item.is_partner,
    rating: item.rating,
    phoneNumber: "",
    description: "",
    tags: item.tags,
    dateAdded: item.created_at,
    detailedServices: [],
    quickServices: [],
  };
}

function adaptDetail(d: BackendTowingDetail): TowingProvider {
  return {
    id: d.id,
    name: d.name,
    avatarUrl: d.image_url ?? "",
    vehicleType: toVehicleType(d.vehicle_type),
    etaMinMins: d.eta_min,
    etaMaxMins: d.eta_max,
    availability: toAvailability(d.availability),
    isPartner: d.is_partner,
    rating: d.rating,
    phoneNumber: d.phone_number ?? "",
    description: d.description ?? "",
    tags: d.tags,
    dateAdded: d.created_at,
    detailedServices: d.services.map(adaptDetailedService),
    quickServices: d.quick_services.map(adaptQuickService),
  };
}

export async function fetchTowingProviders(params?: {
  search?: string;
  type?: string;
}): Promise<TowingProvider[]> {
  const { data } = await apiClient.get<BackendTowingListItem[]>(
    "/towing-providers/",
    { params },
  );
  return data.map(adaptListItem);
}

export async function fetchTowingProviderById(
  id: string,
): Promise<TowingProvider> {
  const { data } = await apiClient.get<BackendTowingDetail>(
    `/towing-providers/${id}`,
  );
  return adaptDetail(data);
}

export interface CreateTowingPayload {
  name: string;
  eta_min?: number;
  eta_max?: number;
  availability?: "available" | "busy";
  vehicle_type?: string;
  is_partner?: boolean;
  verified?: boolean;
  phone_number?: string;
  description?: string;
}

export async function createTowingProvider(
  payload: CreateTowingPayload,
): Promise<TowingProvider> {
  const { data } = await apiClient.post<BackendTowingListItem>(
    "/towing-providers/admin/towing-providers",
    payload,
  );
  return adaptListItem(data);
}

export async function updateTowingProvider(
  id: string,
  payload: Partial<CreateTowingPayload>,
): Promise<TowingProvider> {
  const { data } = await apiClient.put<BackendTowingListItem>(
    `/towing-providers/admin/towing-providers/${id}`,
    payload,
  );
  return adaptListItem(data);
}

export async function deleteTowingProvider(id: string): Promise<void> {
  await apiClient.delete(`/towing-providers/admin/towing-providers/${id}`);
}

export async function addTowingService(
  providerId: string,
  payload: {
    label: string;
    description?: string;
    icon?: string;
    is_highlighted?: boolean;
  },
): Promise<TowingDetailedService> {
  const { data } = await apiClient.post<BackendTowingService>(
    `/towing-providers/admin/towing-providers/${providerId}/services`,
    payload,
  );
  return adaptDetailedService(data);
}

export async function deleteTowingService(
  providerId: string,
  serviceId: string,
): Promise<void> {
  await apiClient.delete(
    `/towing-providers/admin/towing-providers/${providerId}/services/${serviceId}`,
  );
}

export async function addTowingQuickService(
  providerId: string,
  payload: { label: string; icon?: string },
): Promise<TowingQuickService> {
  const { data } = await apiClient.post<BackendTowingQuickService>(
    `/towing-providers/admin/towing-providers/${providerId}/quick-services`,
    payload,
  );
  return adaptQuickService(data);
}

export async function deleteTowingQuickService(
  providerId: string,
  quickServiceId: string,
): Promise<void> {
  await apiClient.delete(
    `/towing-providers/admin/towing-providers/${providerId}/quick-services/${quickServiceId}`,
  );
}

export async function uploadTowingPhoto(
  providerId: string,
  file: File,
): Promise<string> {
  const formData = new FormData();
  formData.append("photo", file);
  const { data } = await apiClient.post<{ image_url: string }>(
    `/towing-providers/${providerId}/photo`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return data.image_url;
}
