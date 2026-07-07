import axios from "axios";

export const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "https://voita-backend.fly.dev/api/v1",
  headers: { "Content-Type": "application/json" },
});

// Placeholder for when admin auth is implemented on the backend.
// Once a token exists (e.g. in a cookie or Redux auth slice), attach it here:
apiClient.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("voita_admin_token")
      : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function extractErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.detail ?? error.message ?? "Something went wrong"
    );
  }
  return "Something went wrong";
}
