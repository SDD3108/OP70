import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bookingService } from "@/src/services/bookingService";

export const createReservation = createAsyncThunk("booking/create", (values) => bookingService.createBooking(values));

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    eventId: null,
    quantity: 1,
    seatIds: [],
    reservation: null,
    status: "idle",
    error: null,
  },
  reducers: {
    selectEvent(state, action){
      if(state.eventId !== action.payload){
        state.eventId = action.payload;
        state.quantity = 1;
        state.seatIds = [];
        state.reservation = null;
        state.status = "idle";
        state.error = null;
      }
    },
    setQuantity(state, action){
      const value = Number(action.payload);
      if(Number.isInteger(value)){
        state.quantity = Math.max(1, Math.min(10, value));
      }
    },
    setSeatIds(state, action){
      state.seatIds = [...new Set(action.payload)]
    },
    clearBooking(state){
      state.eventId = null
      state.quantity = 1
      state.seatIds = [];
      state.reservation = null
      state.status = "idle"
      state.error = null
    },
  },
  extraReducers(builder){
    builder
      .addCase(createReservation.pending, (state) => {
        state.status = "loading"
        state.error = null;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.reservation = action.payload
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error?.message || "Ошибка бронирования"
      });
  },
});

export const { selectEvent, setQuantity, setSeatIds, clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
