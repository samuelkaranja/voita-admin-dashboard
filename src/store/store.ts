import { configureStore } from "@reduxjs/toolkit";
import mechanicsReducer from "./slices/mechanicsSlice";
import carWashReducer from "./slices/carWashSlice";
import towingReducer from "./slices/towingSlice";
import scoutsReducer from "./slices/scoutsSlice";

export const store = configureStore({
  reducer: {
    mechanics: mechanicsReducer,
    carWash: carWashReducer,
    towing: towingReducer,
    scouts: scoutsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
