import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from "@/types";
import * as api from "@/lib/api/alertsApi";
import { extractErrorMessage } from "@/lib/apiClient";

interface AlertSendFailure {
  message: string;
  alertId: string;
  recipientsCount: number;
  successCount: number;
  failureCount: number;
  firebaseError?: string;
}

interface AlertsState {
  items: Alert[];
  selected: Alert | null;
  total: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  mutationStatus: "idle" | "loading" | "succeeded" | "failed";
  mutationError: string | null;
  lastSendFailure: AlertSendFailure | null;
}

const initialState: AlertsState = {
  items: [],
  selected: null,
  total: 0,
  status: "idle",
  error: null,
  mutationStatus: "idle",
  mutationError: null,
  lastSendFailure: null,
};

export const fetchAlertsThunk = createAsyncThunk(
  "alerts/fetchAll",
  async (
    params: { skip?: number; limit?: number; status?: string } | undefined,
    { rejectWithValue },
  ) => {
    try {
      return await api.fetchAlerts(params);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const fetchAlertByIdThunk = createAsyncThunk(
  "alerts/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await api.fetchAlertById(id);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const createAlertThunk = createAsyncThunk(
  "alerts/create",
  async (payload: api.CreateAlertPayload, { rejectWithValue }) => {
    try {
      return await api.createAlert(payload);
    } catch (err) {
      if (err instanceof api.AlertSendFailedError) {
        return rejectWithValue({
          message: err.message,
          alertId: err.alertId,
          recipientsCount: err.recipientsCount,
          successCount: err.successCount,
          failureCount: err.failureCount,
          firebaseError: err.firebaseError,
        } satisfies AlertSendFailure);
      }
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const sendDraftAlertThunk = createAsyncThunk(
  "alerts/sendDraft",
  async (id: string, { rejectWithValue }) => {
    try {
      const result = await api.sendDraftAlert(id);
      return { id, ...result };
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const updateAlertThunk = createAsyncThunk(
  "alerts/update",
  async (
    { id, payload }: { id: string; payload: api.UpdateAlertPayload },
    { dispatch, rejectWithValue },
  ) => {
    try {
      await api.updateAlert(id, payload);
      const result = await dispatch(fetchAlertByIdThunk(id));
      if (fetchAlertByIdThunk.rejected.match(result)) {
        return rejectWithValue(result.payload as string);
      }
      return result.payload as Alert;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    clearSelectedAlert(state) {
      state.selected = null;
    },
    clearSendFailure(state) {
      state.lastSendFailure = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlertsThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAlertsThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.alerts;
        state.total = action.payload.total;
      })
      .addCase(fetchAlertsThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? "Failed to load alerts";
      })

      .addCase(fetchAlertByIdThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAlertByIdThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selected = action.payload;
      })
      .addCase(fetchAlertByIdThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? "Failed to load alert";
      })

      .addCase(createAlertThunk.pending, (state) => {
        state.mutationStatus = "loading";
        state.mutationError = null;
        state.lastSendFailure = null;
      })
      .addCase(createAlertThunk.fulfilled, (state) => {
        state.mutationStatus = "succeeded";
      })
      .addCase(createAlertThunk.rejected, (state, action) => {
        state.mutationStatus = "failed";
        const payload = action.payload;
        if (payload && typeof payload === "object" && "alertId" in payload) {
          state.lastSendFailure = payload as AlertSendFailure;
          state.mutationError = (payload as AlertSendFailure).message;
        } else {
          state.mutationError = (payload as string) ?? "Failed to create alert";
        }
      })

      .addCase(sendDraftAlertThunk.fulfilled, (state, action) => {
        state.mutationStatus = "succeeded";
        const { id, recipientsCount, successCount, failureCount } =
          action.payload;
        const patch = {
          status: "sent" as const,
          recipientsCount,
          successCount,
          failureCount,
        };
        const index = state.items.findIndex((a) => a.id === id);
        if (index !== -1)
          state.items[index] = { ...state.items[index], ...patch };
        if (state.selected?.id === id) {
          state.selected = { ...state.selected, ...patch };
        }
      })
      .addCase(sendDraftAlertThunk.rejected, (state, action) => {
        state.mutationStatus = "failed";
        state.mutationError =
          (action.payload as string) ?? "Failed to send alert";
      })

      .addCase(updateAlertThunk.pending, (state) => {
        state.mutationStatus = "loading";
        state.mutationError = null;
      })
      .addCase(updateAlertThunk.fulfilled, (state, action) => {
        state.mutationStatus = "succeeded";
        const updated = action.payload;
        const index = state.items.findIndex((a) => a.id === updated.id);
        if (index !== -1) state.items[index] = updated;
        if (state.selected?.id === updated.id) state.selected = updated;
      })
      .addCase(updateAlertThunk.rejected, (state, action) => {
        state.mutationStatus = "failed";
        state.mutationError =
          (action.payload as string) ?? "Failed to update alert";
      });
  },
});

export const { clearSelectedAlert, clearSendFailure } = alertsSlice.actions;
export default alertsSlice.reducer;
