import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Mechanic, MechanicService, InsurancePartner } from "@/types";
import * as api from "@/lib/api/mechanicsApi";
import { extractErrorMessage } from "@/lib/apiClient";

interface MechanicsState {
  items: Mechanic[];
  selected: Mechanic | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  mutationStatus: "idle" | "loading" | "succeeded" | "failed";
  mutationError: string | null;
}

const initialState: MechanicsState = {
  items: [],
  selected: null,
  status: "idle",
  error: null,
  mutationStatus: "idle",
  mutationError: null,
};

export const fetchMechanicsThunk = createAsyncThunk(
  "mechanics/fetchAll",
  async (
    params: { search?: string; type?: string } | undefined,
    { rejectWithValue },
  ) => {
    try {
      return await api.fetchMechanics(params);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const fetchMechanicByIdThunk = createAsyncThunk(
  "mechanics/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await api.fetchMechanicById(id);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const createMechanicThunk = createAsyncThunk(
  "mechanics/create",
  async (
    {
      payload,
      photoFile,
    }: { payload: api.CreateMechanicPayload; photoFile: File | null },
    { rejectWithValue },
  ) => {
    try {
      const created = await api.createMechanic(payload);
      if (photoFile) {
        const imageUrl = await api.uploadMechanicPhoto(created.id, photoFile);
        return { ...created, avatarUrl: imageUrl };
      }
      return created;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const updateMechanicThunk = createAsyncThunk(
  "mechanics/update",
  async (
    {
      id,
      payload,
      photoFile,
    }: {
      id: string;
      payload: Partial<api.CreateMechanicPayload>;
      photoFile: File | null;
    },
    { rejectWithValue },
  ) => {
    try {
      let imageUrl: string | undefined;
      if (photoFile) {
        imageUrl = await api.uploadMechanicPhoto(id, photoFile);
      }
      const updated = await api.updateMechanic(id, payload);
      return imageUrl ? { ...updated, avatarUrl: imageUrl } : updated;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const deleteMechanicThunk = createAsyncThunk(
  "mechanics/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.deleteMechanic(id);
      return id;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const addMechanicServiceThunk = createAsyncThunk(
  "mechanics/addService",
  async (
    {
      mechanicId,
      payload,
    }: {
      mechanicId: string;
      payload: {
        label: string;
        description?: string;
        icon?: string;
        highlighted?: boolean;
      };
    },
    { rejectWithValue },
  ) => {
    try {
      const service = await api.addMechanicService(mechanicId, payload);
      return service;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const addInsurancePartnerThunk = createAsyncThunk(
  "mechanics/addInsurancePartner",
  async (
    {
      mechanicId,
      name,
      logoUrl,
    }: { mechanicId: string; name: string; logoUrl?: string },
    { rejectWithValue },
  ) => {
    try {
      const partner = await api.createInsurancePartner({
        name,
        logo_url: logoUrl,
      });
      await api.assignInsurancePartner(mechanicId, partner.id);
      return partner;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const deleteMechanicServiceThunk = createAsyncThunk(
  "mechanics/deleteService",
  async (
    { mechanicId, serviceId }: { mechanicId: string; serviceId: string },
    { rejectWithValue },
  ) => {
    try {
      await api.deleteMechanicService(mechanicId, serviceId);
      return serviceId;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const removeInsurancePartnerThunk = createAsyncThunk(
  "mechanics/removeInsurancePartner",
  async (
    { mechanicId, partnerId }: { mechanicId: string; partnerId: string },
    { rejectWithValue },
  ) => {
    try {
      await api.removeInsurancePartner(mechanicId, partnerId);
      return partnerId;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

const mechanicsSlice = createSlice({
  name: "mechanics",
  initialState,
  reducers: {
    clearSelectedMechanic(state) {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMechanicsThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMechanicsThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchMechanicsThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? "Failed to load mechanics";
      })

      .addCase(fetchMechanicByIdThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMechanicByIdThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selected = action.payload;
      })
      .addCase(fetchMechanicByIdThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? "Failed to load mechanic";
      })

      .addCase(createMechanicThunk.pending, (state) => {
        state.mutationStatus = "loading";
        state.mutationError = null;
      })
      .addCase(createMechanicThunk.fulfilled, (state, action) => {
        state.mutationStatus = "succeeded";
        state.items.unshift(action.payload);
      })
      .addCase(createMechanicThunk.rejected, (state, action) => {
        state.mutationStatus = "failed";
        state.mutationError =
          (action.payload as string) ?? "Failed to create mechanic";
      })

      .addCase(updateMechanicThunk.fulfilled, (state, action) => {
        state.mutationStatus = "succeeded";
        const index = state.items.findIndex((m) => m.id === action.payload.id);
        if (index !== -1)
          state.items[index] = { ...state.items[index], ...action.payload };
        if (state.selected?.id === action.payload.id) {
          state.selected = { ...state.selected, ...action.payload };
        }
      })
      .addCase(updateMechanicThunk.rejected, (state, action) => {
        state.mutationStatus = "failed";
        state.mutationError =
          (action.payload as string) ?? "Failed to update mechanic";
      })

      .addCase(deleteMechanicThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((m) => m.id !== action.payload);
      })
      .addCase(deleteMechanicThunk.rejected, (state, action) => {
        state.mutationError =
          (action.payload as string) ?? "Failed to delete mechanic";
      })

      .addCase(addMechanicServiceThunk.fulfilled, (state, action) => {
        if (state.selected) state.selected.services.push(action.payload);
      })

      .addCase(addInsurancePartnerThunk.fulfilled, (state, action) => {
        if (state.selected)
          state.selected.insurancePartners.push(action.payload);
      })

      .addCase(deleteMechanicServiceThunk.fulfilled, (state, action) => {
        if (state.selected) {
          state.selected.services = state.selected.services.filter(
            (s) => s.id !== action.payload,
          );
        }
      })

      .addCase(removeInsurancePartnerThunk.fulfilled, (state, action) => {
        if (state.selected) {
          state.selected.insurancePartners =
            state.selected.insurancePartners.filter(
              (p) => p.id !== action.payload,
            );
        }
      });
  },
});

export const { clearSelectedMechanic } = mechanicsSlice.actions;
export default mechanicsSlice.reducer;
