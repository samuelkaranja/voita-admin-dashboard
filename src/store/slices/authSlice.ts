import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthUser } from "@/types";
import * as api from "@/lib/api/authApi";
import { extractErrorMessage } from "@/lib/apiClient";

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  status: "idle",
  error: null,
};

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (
    { phone, password }: { phone: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const { access_token, driver_info } = await api.login(phone, password);

      if (!api.isAdminRole(driver_info.role)) {
        throw new Error("This account does not have admin access.");
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("voita_admin_token", access_token);
        localStorage.setItem("voita_admin_user", JSON.stringify(driver_info));
      }

      return { token: access_token, user: driver_info };
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateFromStorage(state) {
      if (typeof window === "undefined") return;
      const token = localStorage.getItem("voita_admin_token");
      const rawUser = localStorage.getItem("voita_admin_user");
      if (token && rawUser) {
        state.token = token;
        state.user = JSON.parse(rawUser);
        state.status = "succeeded";
      }
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.status = "idle";
      if (typeof window !== "undefined") {
        localStorage.removeItem("voita_admin_token");
        localStorage.removeItem("voita_admin_user");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { hydrateFromStorage, logout } = authSlice.actions;
export default authSlice.reducer;
