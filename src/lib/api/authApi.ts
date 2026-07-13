import { apiClient } from "@/lib/apiClient";
import { AuthUser } from "@/types";

interface LoginResponse {
  access_token: string;
  token_type: string;
  driver_info: AuthUser;
}

export async function login(
  phone: string,
  password: string,
): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>("/auth/login", {
    phone,
    password,
  });
  return data;
}

export function isAdminRole(
  role: AuthUser["role"] | null | undefined,
): boolean {
  return role === "admin" || role === "super_admin";
}

export function isSuperAdminRole(
  role: AuthUser["role"] | null | undefined,
): boolean {
  return role === "super_admin";
}
