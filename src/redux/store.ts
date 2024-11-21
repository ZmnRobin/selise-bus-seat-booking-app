import { configureStore } from "@reduxjs/toolkit";
import seatReducer from "./slices/seatSlice";

export const store = configureStore({
  reducer: {
    seats: seatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
