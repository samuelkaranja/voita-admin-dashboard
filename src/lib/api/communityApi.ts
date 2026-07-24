import { apiClient } from "@/lib/apiClient";
import {
  CommunityRoom,
  JoinRequest,
  RoomType,
  PaginatedMembers,
} from "@/types";

export async function fetchRooms(): Promise<CommunityRoom[]> {
  const { data } = await apiClient.get<CommunityRoom[]>(
    "/admin/community/rooms/",
  );
  return data;
}

export async function fetchRoomById(roomId: string): Promise<CommunityRoom> {
  const { data } = await apiClient.get<CommunityRoom>(
    `/admin/community/rooms/${roomId}`,
  );
  return data;
}

export interface CreateRoomPayload {
  name: string;
  type: RoomType;
  brandSlug?: string;
  description?: string;
  rulesText?: string;
  iconFile?: File | null;
}

function buildRoomFormData(payload: {
  name?: string;
  type?: RoomType;
  brandSlug?: string;
  description?: string;
  rulesText?: string;
  iconFile?: File | null;
}): FormData {
  const formData = new FormData();
  if (payload.name !== undefined) formData.append("name", payload.name);
  if (payload.type !== undefined) formData.append("type", payload.type);
  if (payload.brandSlug) formData.append("brandSlug", payload.brandSlug);
  if (payload.description) formData.append("description", payload.description);
  if (payload.rulesText) formData.append("rulesText", payload.rulesText);
  if (payload.iconFile) formData.append("icon", payload.iconFile);
  return formData;
}

export async function createRoom(
  payload: CreateRoomPayload,
): Promise<CommunityRoom> {
  const formData = buildRoomFormData(payload);
  const { data } = await apiClient.post<CommunityRoom>(
    "/admin/community/rooms/",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return data;
}

export interface UpdateRoomPayload {
  name?: string;
  description?: string;
  rulesText?: string;
  iconFile?: File | null;
}

export async function updateRoom(
  roomId: string,
  payload: UpdateRoomPayload,
): Promise<CommunityRoom> {
  const formData = buildRoomFormData(payload);
  const { data } = await apiClient.patch<CommunityRoom>(
    `/admin/community/rooms/${roomId}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return data;
}

export async function deleteRoom(roomId: string): Promise<void> {
  await apiClient.delete(`/admin/community/rooms/${roomId}`);
}

export async function fetchRoomMembers(
  roomId: string,
  page: number,
  pageSize: number,
): Promise<PaginatedMembers> {
  const { data } = await apiClient.get<PaginatedMembers>(
    `/admin/community/rooms/${roomId}/members`,
    {
      params: { page, pageSize },
    },
  );
  return data;
}

export async function removeRoomMember(
  roomId: string,
  userId: string,
): Promise<void> {
  await apiClient.delete(`/admin/community/rooms/${roomId}/members/${userId}`);
}

export async function fetchJoinRequests(): Promise<JoinRequest[]> {
  const { data } = await apiClient.get<JoinRequest[]>(
    "/admin/community/rooms/join-requests/",
  );
  return data;
}

export async function approveJoinRequest(
  requestId: string,
): Promise<{ roomId: string; userId: string }> {
  const { data } = await apiClient.post(
    `/admin/community/rooms/join-requests/${requestId}/approve`,
  );
  return data;
}

export async function rejectJoinRequest(
  requestId: string,
): Promise<{ roomId: string; userId: string }> {
  const { data } = await apiClient.post(
    `/admin/community/rooms/join-requests/${requestId}/reject`,
  );
  return data;
}
