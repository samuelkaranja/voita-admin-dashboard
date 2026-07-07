import { apiClient } from "@/lib/apiClient";
import { Scout, ScoutSkill, ScoutReview, CtaType } from "@/types";

interface BackendScoutListItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  missions_completed: number;
  avatar_url: string | null;
  tags: string[];
  bio: string | null;
  cta_type: "book" | "request" | "schedule";
  accent_color: string;
  created_at: string;
}

interface BackendScoutSkill {
  id: string;
  label: string;
  subtitle: string | null;
  icon: string | null;
}

interface BackendScoutReview {
  id: string;
  name: string;
  avatar_url: string | null;
  rating: number;
  comment: string | null;
}

interface BackendScoutDetail {
  id: string;
  name: string;
  location: string | null;
  rating: number;
  missions_completed: number;
  avatar_url: string | null;
  bio: string | null;
  is_verified: boolean;
  role: string;
  cta_type: "book" | "request" | "schedule";
  accent_color: string;
  tags: string[];
  created_at: string;
  skills: BackendScoutSkill[];
  reviews: BackendScoutReview[];
}

const CTA_MAP: Record<"book" | "request" | "schedule", CtaType> = {
  book: "Book Scout",
  request: "Quick Request",
  schedule: "Schedule Valet",
};
const CTA_MAP_REVERSE: Record<CtaType, "book" | "request" | "schedule"> = {
  "Book Scout": "book",
  "Quick Request": "request",
  "Schedule Valet": "schedule",
};

export function ctaTypeToBackend(cta: CtaType) {
  return CTA_MAP_REVERSE[cta];
}

function adaptSkill(s: BackendScoutSkill): ScoutSkill {
  return {
    id: s.id,
    label: s.label,
    iconKey: s.icon ?? "search",
    subtitle: s.subtitle ?? "",
  };
}

function adaptReview(r: BackendScoutReview): ScoutReview {
  return {
    id: r.id,
    reviewerName: r.name,
    avatarUrl: r.avatar_url ?? undefined,
    rating: r.rating,
    comment: r.comment ?? "",
  };
}

function adaptListItem(item: BackendScoutListItem): Scout {
  return {
    id: item.id,
    name: item.name,
    avatarUrl: item.avatar_url ?? "",
    role: item.role,
    category: "Auditors", // still not returned by the backend — see open items
    bio: item.bio ?? "",
    location: "",
    ctaType: CTA_MAP[item.cta_type],
    accentColor: item.accent_color,
    rating: item.rating,
    missionsCompleted: item.missions_completed,
    verified: false,
    dateAdded: item.created_at,
    tags: item.tags,
    skills: [],
    reviews: [],
  };
}

function adaptDetail(d: BackendScoutDetail): Scout {
  return {
    id: d.id,
    name: d.name,
    avatarUrl: d.avatar_url ?? "",
    role: d.role,
    category: "Auditors", // still not returned by the backend — see open items
    bio: d.bio ?? "",
    location: d.location ?? "",
    ctaType: CTA_MAP[d.cta_type],
    accentColor: d.accent_color,
    rating: d.rating,
    missionsCompleted: d.missions_completed,
    verified: d.is_verified,
    dateAdded: d.created_at,
    tags: d.tags,
    skills: d.skills.map(adaptSkill),
    reviews: d.reviews.map(adaptReview),
  };
}

export async function fetchScouts(params?: {
  search?: string;
  category?: string;
}): Promise<Scout[]> {
  const { data } = await apiClient.get<BackendScoutListItem[]>("/scouts/", {
    params,
  });
  return data.map(adaptListItem);
}

export async function fetchScoutById(id: string): Promise<Scout> {
  const { data } = await apiClient.get<BackendScoutDetail>(`/scouts/${id}`);
  return adaptDetail(data);
}

export interface CreateScoutPayload {
  name: string;
  role: string;
  cta_type: "book" | "request" | "schedule";
  rating?: number;
  missions_completed?: number;
  bio?: string;
  accent_color?: string;
  location?: string;
  is_verified?: boolean;
}

export async function createScout(payload: CreateScoutPayload): Promise<Scout> {
  const { data } = await apiClient.post<BackendScoutListItem>(
    "/scouts/admin/scouts",
    payload,
  );
  return adaptListItem(data);
}

export async function updateScout(
  id: string,
  payload: Partial<CreateScoutPayload>,
): Promise<Scout> {
  const { data } = await apiClient.put<BackendScoutListItem>(
    `/scouts/admin/scouts/${id}`,
    payload,
  );
  return adaptListItem(data);
}

export async function deleteScout(id: string): Promise<void> {
  await apiClient.delete(`/scouts/admin/scouts/${id}`);
}

export async function addScoutSkill(
  scoutId: string,
  payload: { label: string; subtitle?: string; icon?: string },
): Promise<ScoutSkill> {
  const { data } = await apiClient.post<BackendScoutSkill>(
    `/scouts/admin/scouts/${scoutId}/skills`,
    payload,
  );
  return adaptSkill(data);
}

export async function deleteScoutSkill(
  scoutId: string,
  skillId: string,
): Promise<void> {
  await apiClient.delete(`/scouts/admin/scouts/${scoutId}/skills/${skillId}`);
}

export async function addScoutTag(
  scoutId: string,
  label: string,
): Promise<string> {
  await apiClient.post(`/scouts/admin/scouts/${scoutId}/tags`, { label });
  return label;
}

export async function deleteScoutTag(
  scoutId: string,
  tagId: string,
): Promise<void> {
  await apiClient.delete(`/scouts/admin/scouts/${scoutId}/tags/${tagId}`);
}

export async function addScoutReview(
  scoutId: string,
  payload: {
    name: string;
    avatar_url?: string;
    rating: number;
    comment?: string;
  },
): Promise<ScoutReview> {
  const { data } = await apiClient.post<BackendScoutReview>(
    `/scouts/admin/scouts/${scoutId}/reviews`,
    payload,
  );
  return adaptReview(data);
}

export async function deleteScoutReview(
  scoutId: string,
  reviewId: string,
): Promise<void> {
  await apiClient.delete(`/scouts/admin/scouts/${scoutId}/reviews/${reviewId}`);
}

export async function assignScoutCategory(
  scoutId: string,
  categoryId: string,
): Promise<void> {
  await apiClient.post(`/scouts/admin/scouts/${scoutId}/categories`, null, {
    params: { category_id: categoryId },
  });
}

export async function uploadScoutPhoto(
  scoutId: string,
  file: File,
): Promise<string> {
  const formData = new FormData();
  formData.append("photo", file);
  const { data } = await apiClient.post<{ avatar_url: string }>(
    `/scouts/${scoutId}/photo`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return data.avatar_url;
}
