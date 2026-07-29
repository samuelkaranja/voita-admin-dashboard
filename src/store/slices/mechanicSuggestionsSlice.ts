import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MechanicSuggestion, SuggestionStatus } from "@/types";
import * as api from "@/lib/api/mechanicSuggestionsApi";
import { extractErrorMessage } from "@/lib/apiClient";

interface MechanicSuggestionsState {
  items: MechanicSuggestion[];
  total: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  mutatingId: string | null;
  mutationError: string | null;
}

const initialState: MechanicSuggestionsState = {
  items: [],
  total: 0,
  status: "idle",
  error: null,
  mutatingId: null,
  mutationError: null,
};

export const fetchSuggestionsThunk = createAsyncThunk(
  "mechanicSuggestions/fetch",
  async (
    params: { status: SuggestionStatus; skip?: number; limit?: number },
    { rejectWithValue },
  ) => {
    try {
      return await api.fetchSuggestions(params);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const approveSuggestionThunk = createAsyncThunk(
  "mechanicSuggestions/approve",
  async (
    { id, adminNotes }: { id: string; adminNotes?: string },
    { rejectWithValue },
  ) => {
    try {
      await api.approveSuggestion(id, adminNotes);
      return id;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const rejectSuggestionThunk = createAsyncThunk(
  "mechanicSuggestions/reject",
  async (
    { id, adminNotes }: { id: string; adminNotes?: string },
    { rejectWithValue },
  ) => {
    try {
      await api.rejectSuggestion(id, adminNotes);
      return id;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

const mechanicSuggestionsSlice = createSlice({
  name: "mechanicSuggestions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestionsThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSuggestionsThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.suggestions;
        state.total = action.payload.total;
      })
      .addCase(fetchSuggestionsThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      .addCase(approveSuggestionThunk.pending, (state, action) => {
        state.mutatingId = action.meta.arg.id;
        state.mutationError = null;
      })
      .addCase(approveSuggestionThunk.fulfilled, (state, action) => {
        state.mutatingId = null;
        state.items = state.items.filter((s) => s.id !== action.payload);
        state.total = Math.max(0, state.total - 1);
      })
      .addCase(approveSuggestionThunk.rejected, (state, action) => {
        state.mutatingId = null;
        state.mutationError = action.payload as string;
      })

      .addCase(rejectSuggestionThunk.pending, (state, action) => {
        state.mutatingId = action.meta.arg.id;
        state.mutationError = null;
      })
      .addCase(rejectSuggestionThunk.fulfilled, (state, action) => {
        state.mutatingId = null;
        state.items = state.items.filter((s) => s.id !== action.payload);
        state.total = Math.max(0, state.total - 1);
      })
      .addCase(rejectSuggestionThunk.rejected, (state, action) => {
        state.mutatingId = null;
        state.mutationError = action.payload as string;
      });
  },
});

export default mechanicSuggestionsSlice.reducer;
