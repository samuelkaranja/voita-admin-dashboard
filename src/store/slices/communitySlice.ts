import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CommunityRoom, JoinRequest, RoomMember } from "@/types";
import * as api from "@/lib/api/communityApi";
import { extractErrorMessage } from "@/lib/apiClient";

interface CommunityState {
  rooms: CommunityRoom[];
  roomsStatus: "idle" | "loading" | "succeeded" | "failed";
  roomsError: string | null;
  mutationStatus: "idle" | "loading" | "succeeded" | "failed";
  mutationError: string | null;

  selectedRoom: CommunityRoom | null;
  selectedRoomStatus: "idle" | "loading" | "succeeded" | "failed";

  members: RoomMember[];
  membersTotal: number;
  membersPage: number;
  membersPageSize: number;
  membersStatus: "idle" | "loading" | "succeeded" | "failed";

  joinRequests: JoinRequest[];
  requestsStatus: "idle" | "loading" | "succeeded" | "failed";
  requestsError: string | null;
}

const initialState: CommunityState = {
  rooms: [],
  roomsStatus: "idle",
  roomsError: null,
  mutationStatus: "idle",
  mutationError: null,
  selectedRoom: null,
  selectedRoomStatus: "idle",
  members: [],
  membersTotal: 0,
  membersPage: 1,
  membersPageSize: 20,
  membersStatus: "idle",
  joinRequests: [],
  requestsStatus: "idle",
  requestsError: null,
};

export const fetchRoomsThunk = createAsyncThunk(
  "community/fetchRooms",
  async (_: void, { rejectWithValue }) => {
    try {
      return await api.fetchRooms();
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const fetchRoomByIdThunk = createAsyncThunk(
  "community/fetchRoomById",
  async (roomId: string, { rejectWithValue }) => {
    try {
      return await api.fetchRoomById(roomId);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const createRoomThunk = createAsyncThunk(
  "community/createRoom",
  async (payload: api.CreateRoomPayload, { rejectWithValue }) => {
    try {
      return await api.createRoom(payload);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const updateRoomThunk = createAsyncThunk(
  "community/updateRoom",
  async (
    { roomId, payload }: { roomId: string; payload: api.UpdateRoomPayload },
    { rejectWithValue },
  ) => {
    try {
      return await api.updateRoom(roomId, payload);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const deleteRoomThunk = createAsyncThunk(
  "community/deleteRoom",
  async (roomId: string, { rejectWithValue }) => {
    try {
      await api.deleteRoom(roomId);
      return roomId;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const fetchRoomMembersThunk = createAsyncThunk(
  "community/fetchRoomMembers",
  async (
    {
      roomId,
      page,
      pageSize,
    }: { roomId: string; page: number; pageSize: number },
    { rejectWithValue },
  ) => {
    try {
      return await api.fetchRoomMembers(roomId, page, pageSize);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const removeRoomMemberThunk = createAsyncThunk(
  "community/removeRoomMember",
  async (
    { roomId, userId }: { roomId: string; userId: string },
    { rejectWithValue },
  ) => {
    try {
      await api.removeRoomMember(roomId, userId);
      return userId;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const fetchJoinRequestsThunk = createAsyncThunk(
  "community/fetchJoinRequests",
  async (_: void, { rejectWithValue }) => {
    try {
      return await api.fetchJoinRequests();
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const approveJoinRequestThunk = createAsyncThunk(
  "community/approveJoinRequest",
  async (requestId: string, { rejectWithValue }) => {
    try {
      await api.approveJoinRequest(requestId);
      return requestId;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const rejectJoinRequestThunk = createAsyncThunk(
  "community/rejectJoinRequest",
  async (requestId: string, { rejectWithValue }) => {
    try {
      await api.rejectJoinRequest(requestId);
      return requestId;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    clearSelectedRoom(state) {
      state.selectedRoom = null;
      state.members = [];
      state.membersTotal = 0;
      state.membersPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoomsThunk.pending, (state) => {
        state.roomsStatus = "loading";
        state.roomsError = null;
      })
      .addCase(fetchRoomsThunk.fulfilled, (state, action) => {
        state.roomsStatus = "succeeded";
        state.rooms = action.payload;
      })
      .addCase(fetchRoomsThunk.rejected, (state, action) => {
        state.roomsStatus = "failed";
        state.roomsError = action.payload as string;
      })

      .addCase(fetchRoomByIdThunk.pending, (state) => {
        state.selectedRoomStatus = "loading";
      })
      .addCase(fetchRoomByIdThunk.fulfilled, (state, action) => {
        state.selectedRoomStatus = "succeeded";
        state.selectedRoom = action.payload;
      })
      .addCase(fetchRoomByIdThunk.rejected, (state) => {
        state.selectedRoomStatus = "failed";
      })

      .addCase(createRoomThunk.pending, (state) => {
        state.mutationStatus = "loading";
        state.mutationError = null;
      })
      .addCase(createRoomThunk.fulfilled, (state, action) => {
        state.mutationStatus = "succeeded";
        state.rooms.push(action.payload);
      })
      .addCase(createRoomThunk.rejected, (state, action) => {
        state.mutationStatus = "failed";
        state.mutationError = action.payload as string;
      })

      .addCase(updateRoomThunk.pending, (state) => {
        state.mutationStatus = "loading";
        state.mutationError = null;
      })
      .addCase(updateRoomThunk.fulfilled, (state, action) => {
        state.mutationStatus = "succeeded";
        const index = state.rooms.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) state.rooms[index] = action.payload;
        if (state.selectedRoom?.id === action.payload.id)
          state.selectedRoom = action.payload;
      })
      .addCase(updateRoomThunk.rejected, (state, action) => {
        state.mutationStatus = "failed";
        state.mutationError = action.payload as string;
      })

      .addCase(deleteRoomThunk.fulfilled, (state, action) => {
        state.rooms = state.rooms.filter((r) => r.id !== action.payload);
      })

      .addCase(fetchRoomMembersThunk.pending, (state) => {
        state.membersStatus = "loading";
      })
      .addCase(fetchRoomMembersThunk.fulfilled, (state, action) => {
        state.membersStatus = "succeeded";
        state.members = action.payload.members;
        state.membersTotal = action.payload.total;
        state.membersPage = action.payload.page;
        state.membersPageSize = action.payload.pageSize;
      })
      .addCase(fetchRoomMembersThunk.rejected, (state) => {
        state.membersStatus = "failed";
      })

      .addCase(removeRoomMemberThunk.fulfilled, (state, action) => {
        state.members = state.members.filter(
          (m) => m.userId !== action.payload,
        );
        state.membersTotal = Math.max(0, state.membersTotal - 1);
        if (state.selectedRoom)
          state.selectedRoom.memberCount = Math.max(
            0,
            state.selectedRoom.memberCount - 1,
          );
      })

      .addCase(fetchJoinRequestsThunk.pending, (state) => {
        state.requestsStatus = "loading";
        state.requestsError = null;
      })
      .addCase(fetchJoinRequestsThunk.fulfilled, (state, action) => {
        state.requestsStatus = "succeeded";
        state.joinRequests = action.payload;
      })
      .addCase(fetchJoinRequestsThunk.rejected, (state, action) => {
        state.requestsStatus = "failed";
        state.requestsError = action.payload as string;
      })

      .addCase(approveJoinRequestThunk.fulfilled, (state, action) => {
        const approved = state.joinRequests.find(
          (r) => r.id === action.payload,
        );
        state.joinRequests = state.joinRequests.filter(
          (r) => r.id !== action.payload,
        );
        if (approved) {
          const room = state.rooms.find((r) => r.id === approved.roomId);
          if (room) {
            room.memberCount += 1;
            room.pendingRequestCount = Math.max(
              0,
              room.pendingRequestCount - 1,
            );
          }
        }
      })

      .addCase(rejectJoinRequestThunk.fulfilled, (state, action) => {
        const rejected = state.joinRequests.find(
          (r) => r.id === action.payload,
        );
        state.joinRequests = state.joinRequests.filter(
          (r) => r.id !== action.payload,
        );
        if (rejected) {
          const room = state.rooms.find((r) => r.id === rejected.roomId);
          if (room)
            room.pendingRequestCount = Math.max(
              0,
              room.pendingRequestCount - 1,
            );
        }
      });
  },
});

export const { clearSelectedRoom } = communitySlice.actions;
export default communitySlice.reducer;
