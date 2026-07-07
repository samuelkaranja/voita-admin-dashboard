import { apiClient } from "@/lib/apiClient";
import { CarWash, CarWashService } from "@/types";

interface BackendCarWashListItem {
  id: string;
  name: string;
  rating: number;
  distance_km: number | null;
  area: string;
  image_url: string | null;
  wait_time_mins: number;
  verified: boolean;
  tags: string[];
  created_at: string;
}

interface BackendCarWashService {
  id: string;
  label: string;
  description: string | null;
  price: string;
  icon: string | null;
  is_premium: boolean;
}

interface BackendCarWashDetail {
  id: string;
  name: string;
  rating: number;
  review_count: number;
  address: string | null;
  area: string;
  description: string | null;
  image_url: string | null;
  verified: boolean;
  wait_time_mins: number;
  tags: string[];
  created_at: string;
  services: BackendCarWashService[];
  reviews: unknown[];
}

function parsePrice(priceStr: string): number {
  return Number(priceStr.replace(/[^\d.]/g, "")) || 0;
}

function adaptService(s: BackendCarWashService): CarWashService {
  return {
    id: s.id,
    label: s.label,
    iconKey: s.icon ?? "sparkles",
    description: s.description ?? "",
    price: parsePrice(s.price),
    premium: s.is_premium,
  };
}

function adaptListItem(item: BackendCarWashListItem): CarWash {
  return {
    id: item.id,
    name: item.name,
    avatarUrl: item.image_url ?? "",
    area: item.area,
    address: "",
    description: "",
    rating: item.rating,
    waitTimeMins: item.wait_time_mins,
    verified: item.verified,
    tags: item.tags,
    dateAdded: item.created_at,
    services: [],
  };
}

function adaptDetail(d: BackendCarWashDetail): CarWash {
  return {
    id: d.id,
    name: d.name,
    avatarUrl: d.image_url ?? "",
    area: d.area,
    address: d.address ?? "",
    description: d.description ?? "",
    rating: d.rating,
    waitTimeMins: d.wait_time_mins,
    verified: d.verified,
    tags: d.tags,
    dateAdded: d.created_at,
    services: d.services.map(adaptService),
  };
}

export async function fetchCarWashes(params?: {
  search?: string;
  type?: string;
}): Promise<CarWash[]> {
  const { data } = await apiClient.get<BackendCarWashListItem[]>(
    "/car-washes/",
    { params },
  );
  return data.map(adaptListItem);
}

export async function fetchCarWashById(id: string): Promise<CarWash> {
  const { data } = await apiClient.get<BackendCarWashDetail>(
    `/car-washes/${id}`,
  );
  return adaptDetail(data);
}

export interface CreateCarWashPayload {
  name: string;
  address?: string;
  area?: string;
  description?: string;
  rating?: number;
  verified?: boolean;
  wait_time_mins?: number;
}

export async function createCarWash(
  payload: CreateCarWashPayload,
): Promise<CarWash> {
  const { data } = await apiClient.post<BackendCarWashListItem>(
    "/car-washes/admin/car-washes",
    payload,
  );
  return adaptListItem(data);
}

export async function updateCarWash(
  id: string,
  payload: Partial<CreateCarWashPayload>,
): Promise<CarWash> {
  const { data } = await apiClient.put<BackendCarWashListItem>(
    `/car-washes/admin/car-washes/${id}`,
    payload,
  );
  return adaptListItem(data);
}

export async function deleteCarWash(id: string): Promise<void> {
  await apiClient.delete(`/car-washes/admin/car-washes/${id}`);
}

export async function addCarWashService(
  carWashId: string,
  payload: {
    label: string;
    description?: string;
    price?: string;
    icon?: string;
    is_premium?: boolean;
  },
): Promise<CarWashService> {
  const { data } = await apiClient.post<BackendCarWashService>(
    `/car-washes/admin/car-washes/${carWashId}/services`,
    payload,
  );
  return adaptService(data);
}

export async function deleteCarWashService(
  carWashId: string,
  serviceId: string,
): Promise<void> {
  await apiClient.delete(
    `/car-washes/admin/car-washes/${carWashId}/services/${serviceId}`,
  );
}

export async function addCarWashReview(
  carWashId: string,
  payload: { name: string; rating: number; comment?: string },
) {
  const { data } = await apiClient.post(
    `/car-washes/admin/car-washes/${carWashId}/reviews`,
    payload,
  );
  return data;
}

export async function uploadCarWashPhoto(
  carWashId: string,
  file: File,
): Promise<string> {
  const formData = new FormData();
  formData.append("photo", file);
  const { data } = await apiClient.post<{ image_url: string }>(
    `/car-washes/${carWashId}/photo`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return data.image_url;
}
