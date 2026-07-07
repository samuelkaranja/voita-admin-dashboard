import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TowingProvider } from "@/types";
import * as api from "@/lib/api/towingApi";
import { extractErrorMessage } from "@/lib/apiClient";

interface TowingState {
  items: TowingProvider[];
  selected: TowingProvider | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  mutationStatus: "idle" | "loading" | "succeeded" | "failed";
  mutationError: string | null;
}

const initialState: TowingState = {
  items: [],
  selected: null,
  status: "idle",
  error: null,
  mutationStatus: "idle",
  mutationError: null,
};

export const fetchTowingProvidersThunk = createAsyncThunk(
  "towing/fetchAll",
  async (_: void, { rejectWithValue }) => {
    try {
      return await api.fetchTowingProviders();
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const fetchTowingProviderByIdThunk = createAsyncThunk(
  "towing/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await api.fetchTowingProviderById(id);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const createTowingProviderThunk = createAsyncThunk(
  "towing/create",
  async (
    {
      payload,
      photoFile,
    }: { payload: api.CreateTowingPayload; photoFile: File | null },
    { rejectWithValue },
  ) => {
    try {
      const created = await api.createTowingProvider(payload);
      if (photoFile) {
        const imageUrl = await api.uploadTowingPhoto(created.id, photoFile);
        return { ...created, avatarUrl: imageUrl };
      }
      return created;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const updateTowingProviderThunk = createAsyncThunk(
  "towing/update",
  async (
    {
      id,
      payload,
      photoFile,
    }: {
      id: string;
      payload: Partial<api.CreateTowingPayload>;
      photoFile: File | null;
    },
    { rejectWithValue },
  ) => {
    try {
      let imageUrl: string | undefined;
      if (photoFile) imageUrl = await api.uploadTowingPhoto(id, photoFile);
      const updated = await api.updateTowingProvider(id, payload);
      return imageUrl ? { ...updated, avatarUrl: imageUrl } : updated;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const deleteTowingProviderThunk = createAsyncThunk(
  "towing/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.deleteTowingProvider(id);
      return id;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const addTowingServiceThunk = createAsyncThunk(
  "towing/addService",
  async (
    {
      providerId,
      payload,
    }: {
      providerId: string;
      payload: {
        label: string;
        description?: string;
        icon?: string;
        is_highlighted?: boolean;
      };
    },
    { rejectWithValue },
  ) => {
    try {
      return await api.addTowingService(providerId, payload);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const addTowingQuickServiceThunk = createAsyncThunk(
  "towing/addQuickService",
  async (
    {
      providerId,
      payload,
    }: { providerId: string; payload: { label: string; icon?: string } },
    { rejectWithValue },
  ) => {
    try {
      return await api.addTowingQuickService(providerId, payload);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const deleteTowingServiceThunk = createAsyncThunk(
  "towing/deleteService",
  async (
    { providerId, serviceId }: { providerId: string; serviceId: string },
    { rejectWithValue },
  ) => {
    try {
      await api.deleteTowingService(providerId, serviceId);
      return serviceId;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const deleteTowingQuickServiceThunk = createAsyncThunk(
  "towing/deleteQuickService",
  async (
    {
      providerId,
      quickServiceId,
    }: { providerId: string; quickServiceId: string },
    { rejectWithValue },
  ) => {
    try {
      await api.deleteTowingQuickService(providerId, quickServiceId);
      return quickServiceId;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

const towingSlice = createSlice({
  name: "towing",
  initialState,
  reducers: {
    clearSelectedTowingProvider(state) {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTowingProvidersThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTowingProvidersThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTowingProvidersThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      .addCase(fetchTowingProviderByIdThunk.fulfilled, (state, action) => {
        state.selected = action.payload;
      })

      .addCase(createTowingProviderThunk.pending, (state) => {
        state.mutationStatus = "loading";
        state.mutationError = null;
      })
      .addCase(createTowingProviderThunk.fulfilled, (state, action) => {
        state.mutationStatus = "succeeded";
        state.items.unshift(action.payload);
      })
      .addCase(createTowingProviderThunk.rejected, (state, action) => {
        state.mutationStatus = "failed";
        state.mutationError = action.payload as string;
      })

      .addCase(updateTowingProviderThunk.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1)
          state.items[index] = { ...state.items[index], ...action.payload };
        if (state.selected?.id === action.payload.id)
          state.selected = { ...state.selected, ...action.payload };
      })

      .addCase(deleteTowingProviderThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      })

      .addCase(addTowingServiceThunk.fulfilled, (state, action) => {
        if (state.selected)
          state.selected.detailedServices.push(action.payload);
      })
      .addCase(addTowingQuickServiceThunk.fulfilled, (state, action) => {
        if (state.selected) state.selected.quickServices.push(action.payload);
      })
      .addCase(deleteTowingServiceThunk.fulfilled, (state, action) => {
        if (state.selected)
          state.selected.detailedServices =
            state.selected.detailedServices.filter(
              (s) => s.id !== action.payload,
            );
      })
      .addCase(deleteTowingQuickServiceThunk.fulfilled, (state, action) => {
        if (state.selected)
          state.selected.quickServices = state.selected.quickServices.filter(
            (s) => s.id !== action.payload,
          );
      });
  },
});

export const { clearSelectedTowingProvider } = towingSlice.actions;
export default towingSlice.reducer;
