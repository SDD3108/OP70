import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { eventService } from "@/src/services/eventService";

export const fetchEvents = createAsyncThunk("events/fetch", (filters = {}) => eventService.getEvents(filters));

const eventsSlice = createSlice({
  name: "events",
  initialState: { items: [], status: "idle", error: null },
  reducers: { clearEvents(state) { state.items = []; state.status = "idle"; state.error = null; } },
  extraReducers(builder) {
    builder
      .addCase(fetchEvents.pending, (state) => { state.status = "loading"; state.error = null; })
      .addCase(fetchEvents.fulfilled, (state, action) => { state.items = action.payload; state.status = "succeeded"; })
      .addCase(fetchEvents.rejected, (state, action) => { state.status = "failed"; state.error = action.error?.message || "Ошибка запроса"; });
  },
});

export const { clearEvents } = eventsSlice.actions;
export default eventsSlice.reducer;
