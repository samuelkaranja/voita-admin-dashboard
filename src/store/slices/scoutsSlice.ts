import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Scout } from "@/types";
import * as api from "@/lib/api/scoutsApi";
import { extractErrorMessage } from "@/lib/apiClient";

interface ScoutsState {
  items: Scout[];
  selected: Scout | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  mutationStatus: "idle" | "loading" | "succeeded" | "failed";
  mutationError: string | null;
}

const initialState: ScoutsState = {
  items: [],
  selected: null,
  status: "idle",
  error: null,
  mutationStatus: "idle",
  mutationError: null,
};

export const fetchScoutsThunk = createAsyncThunk(
  "scouts/fetchAll",
  async (_: void, { rejectWithValue }) => {
    try {
      return await api.fetchScouts();
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const fetchScoutByIdThunk = createAsyncThunk(
  "scouts/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await api.fetchScoutById(id);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const createScoutThunk = createAsyncThunk(
  "scouts/create",
  async (
    {
      payload,
      photoFile,
    }: { payload: api.CreateScoutPayload; photoFile: File | null },
    { rejectWithValue },
  ) => {
    try {
      const created = await api.createScout(payload);
      if (photoFile) {
        const avatarUrl = await api.uploadScoutPhoto(created.id, photoFile);
        return { ...created, avatarUrl };
      }
      return created;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const updateScoutThunk = createAsyncThunk(
  "scouts/update",
  async (
    {
      id,
      payload,
      photoFile,
    }: {
      id: string;
      payload: Partial<api.CreateScoutPayload>;
      photoFile: File | null;
    },
    { rejectWithValue },
  ) => {
    try {
      let avatarUrl: string | undefined;
      if (photoFile) avatarUrl = await api.uploadScoutPhoto(id, photoFile);
      const updated = await api.updateScout(id, payload);
      return avatarUrl ? { ...updated, avatarUrl } : updated;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const deleteScoutThunk = createAsyncThunk(
  "scouts/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.deleteScout(id);
      return id;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const addScoutSkillThunk = createAsyncThunk(
  "scouts/addSkill",
  async (
    {
      scoutId,
      payload,
    }: {
      scoutId: string;
      payload: { label: string; subtitle?: string; icon?: string };
    },
    { rejectWithValue },
  ) => {
    try {
      return await api.addScoutSkill(scoutId, payload);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const addScoutTagThunk = createAsyncThunk(
  "scouts/addTag",
  async (
    { scoutId, label }: { scoutId: string; label: string },
    { rejectWithValue },
  ) => {
    try {
      return await api.addScoutTag(scoutId, label);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const addScoutReviewThunk = createAsyncThunk(
  "scouts/addReview",
  async (
    {
      scoutId,
      payload,
    }: {
      scoutId: string;
      payload: {
        name: string;
        avatar_url?: string;
        rating: number;
        comment?: string;
      };
    },
    { rejectWithValue },
  ) => {
    try {
      return await api.addScoutReview(scoutId, payload);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const deleteScoutSkillThunk = createAsyncThunk(
  "scouts/deleteSkill",
  async (
    { scoutId, skillId }: { scoutId: string; skillId: string },
    { rejectWithValue },
  ) => {
    try {
      await api.deleteScoutSkill(scoutId, skillId);
      return skillId;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const deleteScoutTagThunk = createAsyncThunk(
  "scouts/deleteTag",
  async (
    { scoutId, tagId }: { scoutId: string; tagId: string },
    { rejectWithValue },
  ) => {
    try {
      await api.deleteScoutTag(scoutId, tagId);
      return tagId;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const deleteScoutReviewThunk = createAsyncThunk(
  "scouts/deleteReview",
  async (
    { scoutId, reviewId }: { scoutId: string; reviewId: string },
    { rejectWithValue },
  ) => {
    try {
      await api.deleteScoutReview(scoutId, reviewId);
      return reviewId;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

const scoutsSlice = createSlice({
  name: "scouts",
  initialState,
  reducers: {
    clearSelectedScout(state) {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchScoutsThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchScoutsThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchScoutsThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      .addCase(fetchScoutByIdThunk.fulfilled, (state, action) => {
        state.selected = action.payload;
      })

      .addCase(createScoutThunk.pending, (state) => {
        state.mutationStatus = "loading";
        state.mutationError = null;
      })
      .addCase(createScoutThunk.fulfilled, (state, action) => {
        state.mutationStatus = "succeeded";
        state.items.unshift(action.payload);
      })
      .addCase(createScoutThunk.rejected, (state, action) => {
        state.mutationStatus = "failed";
        state.mutationError = action.payload as string;
      })

      .addCase(updateScoutThunk.fulfilled, (state, action) => {
        const index = state.items.findIndex((s) => s.id === action.payload.id);
        if (index !== -1)
          state.items[index] = { ...state.items[index], ...action.payload };
        if (state.selected?.id === action.payload.id)
          state.selected = { ...state.selected, ...action.payload };
      })

      .addCase(deleteScoutThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((s) => s.id !== action.payload);
      })

      .addCase(addScoutSkillThunk.fulfilled, (state, action) => {
        if (state.selected) state.selected.skills.push(action.payload);
      })
      .addCase(addScoutTagThunk.fulfilled, (state, action) => {
        if (state.selected) state.selected.tags.push(action.payload);
      })
      .addCase(addScoutReviewThunk.fulfilled, (state, action) => {
        if (state.selected) state.selected.reviews.push(action.payload);
      })

      .addCase(deleteScoutSkillThunk.fulfilled, (state, action) => {
        if (state.selected)
          state.selected.skills = state.selected.skills.filter(
            (s) => s.id !== action.payload,
          );
      })

      .addCase(deleteScoutTagThunk.fulfilled, (state, action) => {
        if (state.selected)
          state.selected.tags = state.selected.tags.filter(
            (t) => t.id !== action.payload,
          );
      })

      .addCase(deleteScoutReviewThunk.fulfilled, (state, action) => {
        if (state.selected)
          state.selected.reviews = state.selected.reviews.filter(
            (r) => r.id !== action.payload,
          );
      });
  },
});

export const { clearSelectedScout } = scoutsSlice.actions;
export default scoutsSlice.reducer;
