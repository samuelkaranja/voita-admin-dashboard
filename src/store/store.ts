import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import mechanicsReducer from "./slices/mechanicsSlice";
import carWashReducer from "./slices/carWashSlice";
import towingReducer from "./slices/towingSlice";
import scoutsReducer from "./slices/scoutsSlice";
import communityReducer from "./slices/communitySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    mechanics: mechanicsReducer,
    carWash: carWashReducer,
    towing: towingReducer,
    scouts: scoutsReducer,
    community: communityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
