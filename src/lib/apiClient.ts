import axios from "axios";

export const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "https://voita-backend.fly.dev/api/v1",
  headers: { "Content-Type": "application/json" },
});

// Attaches the admin JWT to every outgoing request, once logged in.
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

// Handles expired/invalid tokens and insufficient-role responses globally,
// so individual thunks/components don't each need their own 403 handling.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403 && typeof window !== "undefined") {
      localStorage.removeItem("voita_admin_token");
      localStorage.removeItem("voita_admin_user");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export function extractErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 403) {
      return "Access denied. Your session may have expired — please sign in again.";
    }
    return (
      error.response?.data?.detail ?? error.message ?? "Something went wrong"
    );
  }
  return "Something went wrong";
}
