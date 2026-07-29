import { apiClient } from "@/lib/apiClient";
import { MechanicSuggestion, SuggestionStatus } from "@/types";

interface BackendSuggestion {
  id: string;
  name: string;
  phone: string;
  location: string;
  specialty: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  submitted_by: string;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
}

interface BackendSuggestionsListResponse {
  suggestions: BackendSuggestion[];
  total: number;
  page: number;
  size: number;
}

function adaptSuggestion(s: BackendSuggestion): MechanicSuggestion {
  return {
    id: s.id,
    name: s.name,
    phone: s.phone,
    location: s.location,
    specialty: s.specialty as MechanicSuggestion["specialty"],
    reason: s.reason,
    status: s.status,
    submittedBy: s.submitted_by,
    reviewedBy: s.reviewed_by,
    reviewedAt: s.reviewed_at,
    createdAt: s.created_at,
    updatedAt: s.updated_at,
  };
}

export interface FetchSuggestionsParams {
  status?: SuggestionStatus;
  skip?: number;
  limit?: number;
}

export interface FetchSuggestionsResult {
  suggestions: MechanicSuggestion[];
  total: number;
  page: number;
  size: number;
}

export async function fetchSuggestions(
  params: FetchSuggestionsParams = {},
): Promise<FetchSuggestionsResult> {
  const { data } = await apiClient.get<BackendSuggestionsListResponse>(
    "/mechanics/suggestions/",
    {
      params: {
        status: params.status ?? "pending",
        skip: params.skip ?? 0,
        limit: params.limit ?? 20,
      },
    },
  );
  return {
    suggestions: data.suggestions.map(adaptSuggestion),
    total: data.total,
    page: data.page,
    size: data.size,
  };
}

export async function approveSuggestion(
  id: string,
  adminNotes?: string,
): Promise<void> {
  await apiClient.post(
    `/mechanics/suggestions/${id}/approve/`,
    adminNotes ? { admin_notes: adminNotes } : undefined,
  );
}

export async function rejectSuggestion(
  id: string,
  adminNotes?: string,
): Promise<void> {
  await apiClient.post(
    `/mechanics/suggestions/${id}/reject/`,
    adminNotes ? { admin_notes: adminNotes } : undefined,
  );
}
