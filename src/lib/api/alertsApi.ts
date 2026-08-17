import axios from "axios";
import { apiClient } from "@/lib/apiClient";
import { Alert, AlertPriority, AlertTargetType } from "@/types";

export interface CreateAlertPayload {
  title: string;
  message: string;
  target_type: AlertTargetType;
  target_driver_id?: string;
  target_role?: string;
  priority: AlertPriority;
  send_immediately: boolean;
}

interface AlertSendFailureDetail {
  message: string;
  alert_id: string;
  status: string;
  recipients_count: number;
  success_count: number;
  failure_count: number;
  error?: string;
}

// Thrown when the backend returns 502 — alert was created but Firebase
// send failed. Carries the same delivery stats a success response would,
// so the UI can show what actually happened rather than a generic error.
export class AlertSendFailedError extends Error {
  alertId: string;
  recipientsCount: number;
  successCount: number;
  failureCount: number;
  firebaseError?: string;

  constructor(detail: AlertSendFailureDetail) {
    super(detail.message);
    this.name = "AlertSendFailedError";
    this.alertId = detail.alert_id;
    this.recipientsCount = detail.recipients_count;
    this.successCount = detail.success_count;
    this.failureCount = detail.failure_count;
    this.firebaseError = detail.error;
  }
}

interface RawAlert {
  id: string;
  title: string;
  message: string;
  alert_type: string;
  target_type: AlertTargetType;
  target_driver_id: string | null;
  target_role: string | null;
  priority: AlertPriority;
  status: "draft" | "sent" | "failed";
  created_at: string;
  sent_at: string | null;
  recipients_count: number;
  success_count: number;
  failure_count: number;
  created_by?: string;
}

function mapAlert(raw: RawAlert): Alert {
  return {
    id: raw.id,
    title: raw.title,
    message: raw.message,
    alertType: raw.alert_type,
    targetType: raw.target_type,
    targetDriverId: raw.target_driver_id,
    targetRole: raw.target_role,
    priority: raw.priority,
    status: raw.status,
    createdAt: raw.created_at,
    sentAt: raw.sent_at,
    recipientsCount: raw.recipients_count,
    successCount: raw.success_count,
    failureCount: raw.failure_count,
    createdBy: raw.created_by,
  };
}

export async function fetchAlerts(params?: {
  skip?: number;
  limit?: number;
  status?: string;
}): Promise<{ alerts: Alert[]; total: number }> {
  const { data } = await apiClient.get("/admin/alerts", { params });
  return {
    alerts: (data.alerts as RawAlert[]).map(mapAlert),
    total: data.total,
  };
}

export async function fetchAlertById(id: string): Promise<Alert> {
  const { data } = await apiClient.get(`/admin/alerts/${id}`);
  return mapAlert(data);
}

export async function createAlert(payload: CreateAlertPayload): Promise<{
  alertId: string;
  status: string;
  recipientsCount: number;
  successCount: number;
  failureCount: number;
  message: string;
}> {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("message", payload.message);
  formData.append("target_type", payload.target_type);
  if (payload.target_driver_id) {
    formData.append("target_driver_id", payload.target_driver_id);
  }
  if (payload.target_role) {
    formData.append("target_role", payload.target_role);
  }
  formData.append("priority", payload.priority);
  formData.append("send_immediately", String(payload.send_immediately));

  try {
    // Don't set Content-Type manually — axios strips the instance's default
    // 'application/json' header for FormData bodies and lets the browser
    // attach the correct multipart boundary automatically.
    const { data } = await apiClient.post("/admin/alerts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return {
      alertId: data.alert_id,
      status: data.status,
      recipientsCount: data.recipients_count,
      successCount: data.success_count,
      failureCount: data.failure_count,
      message: data.message,
    };
  } catch (err) {
    if (
      axios.isAxiosError(err) &&
      err.response?.status === 502 &&
      err.response.data?.detail
    ) {
      throw new AlertSendFailedError(err.response.data.detail);
    }
    throw err;
  }
}

export async function sendDraftAlert(id: string): Promise<{
  recipientsCount: number;
  successCount: number;
  failureCount: number;
}> {
  const { data } = await apiClient.post(`/admin/alerts/${id}/send`);
  return {
    recipientsCount: data.recipients_count,
    successCount: data.success_count,
    failureCount: data.failure_count,
  };
}
