import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/src/store/slices/authSlice";
import eventsReducer from "@/src/store/slices/eventsSlice";
import bookingReducer from "@/src/store/slices/bookingSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      events: eventsReducer,
      booking: bookingReducer,
    },
  });
}
