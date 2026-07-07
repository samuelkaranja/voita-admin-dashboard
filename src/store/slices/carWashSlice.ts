import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CarWash, CarWashService } from "@/types";
import * as api from "@/lib/api/carWashApi";
import { extractErrorMessage } from "@/lib/apiClient";

interface CarWashState {
  items: CarWash[];
  selected: CarWash | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  mutationStatus: "idle" | "loading" | "succeeded" | "failed";
  mutationError: string | null;
}

const initialState: CarWashState = {
  items: [],
  selected: null,
  status: "idle",
  error: null,
  mutationStatus: "idle",
  mutationError: null,
};

export const fetchCarWashesThunk = createAsyncThunk(
  "carWash/fetchAll",
  async (_: void, { rejectWithValue }) => {
    try {
      return await api.fetchCarWashes();
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const fetchCarWashByIdThunk = createAsyncThunk(
  "carWash/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await api.fetchCarWashById(id);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const createCarWashThunk = createAsyncThunk(
  "carWash/create",
  async (
    {
      payload,
      photoFile,
    }: { payload: api.CreateCarWashPayload; photoFile: File | null },
    { rejectWithValue },
  ) => {
    try {
      const created = await api.createCarWash(payload);
      if (photoFile) {
        const imageUrl = await api.uploadCarWashPhoto(created.id, photoFile);
        return { ...created, avatarUrl: imageUrl };
      }
      return created;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const updateCarWashThunk = createAsyncThunk(
  "carWash/update",
  async (
    {
      id,
      payload,
      photoFile,
    }: {
      id: string;
      payload: Partial<api.CreateCarWashPayload>;
      photoFile: File | null;
    },
    { rejectWithValue },
  ) => {
    try {
      let imageUrl: string | undefined;
      if (photoFile) imageUrl = await api.uploadCarWashPhoto(id, photoFile);
      const updated = await api.updateCarWash(id, payload);
      return imageUrl ? { ...updated, avatarUrl: imageUrl } : updated;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const deleteCarWashThunk = createAsyncThunk(
  "carWash/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.deleteCarWash(id);
      return id;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const addCarWashServiceThunk = createAsyncThunk(
  "carWash/addService",
  async (
    {
      carWashId,
      payload,
    }: {
      carWashId: string;
      payload: {
        label: string;
        description?: string;
        price?: string;
        icon?: string;
        is_premium?: boolean;
      };
    },
    { rejectWithValue },
  ) => {
    try {
      return await api.addCarWashService(carWashId, payload);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const deleteCarWashServiceThunk = createAsyncThunk(
  "carWash/deleteService",
  async (
    { carWashId, serviceId }: { carWashId: string; serviceId: string },
    { rejectWithValue },
  ) => {
    try {
      await api.deleteCarWashService(carWashId, serviceId);
      return serviceId;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

const carWashSlice = createSlice({
  name: "carWash",
  initialState,
  reducers: {
    clearSelectedCarWash(state) {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarWashesThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCarWashesThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCarWashesThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      .addCase(fetchCarWashByIdThunk.fulfilled, (state, action) => {
        state.selected = action.payload;
      })

      .addCase(createCarWashThunk.pending, (state) => {
        state.mutationStatus = "loading";
        state.mutationError = null;
      })
      .addCase(createCarWashThunk.fulfilled, (state, action) => {
        state.mutationStatus = "succeeded";
        state.items.unshift(action.payload);
      })
      .addCase(createCarWashThunk.rejected, (state, action) => {
        state.mutationStatus = "failed";
        state.mutationError = action.payload as string;
      })

      .addCase(updateCarWashThunk.fulfilled, (state, action) => {
        const index = state.items.findIndex((c) => c.id === action.payload.id);
        if (index !== -1)
          state.items[index] = { ...state.items[index], ...action.payload };
        if (state.selected?.id === action.payload.id)
          state.selected = { ...state.selected, ...action.payload };
      })

      .addCase(deleteCarWashThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c.id !== action.payload);
      })

      .addCase(addCarWashServiceThunk.fulfilled, (state, action) => {
        if (state.selected) state.selected.services.push(action.payload);
      })

      .addCase(deleteCarWashServiceThunk.fulfilled, (state, action) => {
        if (state.selected) {
          state.selected.services = state.selected.services.filter(
            (s) => s.id !== action.payload,
          );
        }
      });
  },
});

export const { clearSelectedCarWash } = carWashSlice.actions;
export default carWashSlice.reducer;
