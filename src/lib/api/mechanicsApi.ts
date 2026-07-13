import { apiClient } from "@/lib/apiClient";
import {
  Mechanic,
  MechanicService,
  InsurancePartner,
  SpecialtyCategory,
} from "@/types";

interface BackendMechanicListItem {
  id: string;
  name: string;
  rating: number;
  distance_km: number | null;
  image_url: string | null;
  verified: boolean;
  available_today: boolean;
  specialties: string[];
  created_at: string;
}

interface BackendMechanicService {
  id: string;
  label: string;
  description: string | null;
  icon: string | null;
  highlighted: boolean;
}

interface BackendInsurancePartner {
  id: string;
  name: string;
  logo_url: string | null;
}

interface BackendMechanicDetail {
  id: string;
  name: string;
  rating: number;
  review_count: number;
  address: string | null;
  availability: boolean;
  specialties: string[];
  description: string | null;
  image_url: string | null;
  verified: boolean;
  created_at: string;
  services: BackendMechanicService[];
  reviews: unknown[];
  insurance_partners: BackendInsurancePartner[];
}

function toSpecialtyCategory(name: string | undefined): SpecialtyCategory {
  const valid: SpecialtyCategory[] = [
    "Engine",
    "Electrical",
    "Bodywork",
    "Transmission",
    "Suspension",
  ];
  return (valid.find((v) => v.toLowerCase() === name?.toLowerCase()) ??
    "Engine") as SpecialtyCategory;
}

function adaptService(s: BackendMechanicService): MechanicService {
  return {
    id: s.id,
    label: s.label,
    iconKey: s.icon ?? "wrench",
    description: s.description ?? "",
    highlighted: s.highlighted,
  };
}

function adaptPartner(p: BackendInsurancePartner): InsurancePartner {
  return { id: p.id, name: p.name, logoUrl: p.logo_url ?? "" };
}

function adaptListItem(item: BackendMechanicListItem): Mechanic {
  const primarySpecialty = item.specialties[0] ?? "";
  return {
    id: item.id,
    name: item.name,
    avatarUrl: item.image_url ?? "",
    address: "",
    primarySpecialty,
    specialtyCategory: toSpecialtyCategory(primarySpecialty),
    specialties: item.specialties,
    description: "",
    rating: item.rating,
    verified: item.verified,
    availableToday: item.available_today,
    dateAdded: item.created_at,
    services: [],
    insurancePartners: [],
  };
}

function adaptDetail(d: BackendMechanicDetail): Mechanic {
  const primarySpecialty = d.specialties[0] ?? "";
  return {
    id: d.id,
    name: d.name,
    avatarUrl: d.image_url ?? "",
    address: d.address ?? "",
    primarySpecialty,
    specialtyCategory: toSpecialtyCategory(primarySpecialty),
    specialties: d.specialties,
    description: d.description ?? "",
    rating: d.rating,
    verified: d.verified,
    availableToday: d.availability,
    dateAdded: d.created_at,
    services: d.services.map(adaptService),
    insurancePartners: d.insurance_partners.map(adaptPartner),
  };
}

export async function fetchMechanics(params?: {
  search?: string;
  specialty?: string;
}): Promise<Mechanic[]> {
  const { data } = await apiClient.get<BackendMechanicListItem[]>(
    "/mechanics/",
    { params },
  );
  return data.map(adaptListItem);
}

export async function fetchMechanicById(id: string): Promise<Mechanic> {
  const { data } = await apiClient.get<BackendMechanicDetail>(
    `/mechanics/${id}`,
  );
  return adaptDetail(data);
}

export interface CreateMechanicPayload {
  name: string;
  address?: string;
  specialty?: string;
  description?: string;
  rating?: number;
  verified?: boolean;
  available_today?: boolean;
  image_url?: string;
}

export async function createMechanic(
  payload: CreateMechanicPayload,
): Promise<Mechanic> {
  const { data } = await apiClient.post<BackendMechanicListItem>(
    "/mechanics/admin/mechanics", // fixed — was "/admin/mechanics", untested until now
    payload,
  );
  return adaptListItem(data);
}

export async function updateMechanic(
  id: string,
  payload: Partial<CreateMechanicPayload>,
): Promise<Mechanic> {
  const { data } = await apiClient.put<BackendMechanicListItem>(
    `/mechanics/admin/mechanics/${id}`, // fixed — was "/admin/mechanics/{id}"
    payload,
  );
  return adaptListItem(data);
}

export async function deleteMechanic(id: string): Promise<void> {
  await apiClient.delete(`/mechanics/admin/mechanics/${id}`); // confirmed working via curl
}

export async function addMechanicService(
  mechanicId: string,
  payload: {
    label: string;
    description?: string;
    icon?: string;
    highlighted?: boolean;
  },
): Promise<MechanicService> {
  const { data } = await apiClient.post<BackendMechanicService>(
    `/mechanics/admin/mechanics/${mechanicId}/services`, // fixed
    payload,
  );
  return adaptService(data);
}

export async function deleteMechanicService(
  mechanicId: string,
  serviceId: string,
): Promise<void> {
  await apiClient.delete(
    `/mechanics/admin/mechanics/${mechanicId}/services/${serviceId}`, // fixed
  );
}

export async function assignInsurancePartner(
  mechanicId: string,
  insurancePartnerId: string,
): Promise<void> {
  await apiClient.post(
    `/mechanics/admin/mechanics/${mechanicId}/insurance-partners`, // fixed
    null,
    {
      params: { insurance_partner_id: insurancePartnerId },
    },
  );
}

export async function removeInsurancePartner(
  mechanicId: string,
  partnerId: string,
): Promise<void> {
  await apiClient.delete(
    `/mechanics/admin/mechanics/${mechanicId}/insurance-partners/${partnerId}`, // fixed
  );
}

export async function createInsurancePartner(payload: {
  name: string;
  logo_url?: string;
}): Promise<InsurancePartner> {
  const { data } = await apiClient.post<BackendInsurancePartner>(
    "/mechanics/admin/insurance-partners",
    payload,
  );
  return adaptPartner(data);
}

export async function fetchInsurancePartners(): Promise<InsurancePartner[]> {
  const { data } = await apiClient.get<BackendInsurancePartner[]>(
    "/mechanics/admin/insurance-partners",
  );
  return data.map(adaptPartner);
}

export async function addMechanicReview(
  mechanicId: string,
  payload: { name: string; rating: number; comment?: string },
): Promise<{ id: string; name: string; rating: number; comment: string }> {
  const { data } = await apiClient.post(
    `/mechanics/admin/mechanics/${mechanicId}/reviews`, // fixed
    payload,
  );
  return data;
}

export async function uploadMechanicPhoto(
  mechanicId: string,
  file: File,
): Promise<string> {
  const formData = new FormData();
  formData.append("photo", file);
  const { data } = await apiClient.post<{ image_url: string }>(
    `/mechanics/${mechanicId}/photo`, // unchanged — not an admin route, already correctly prefixed
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return data.image_url;
}
