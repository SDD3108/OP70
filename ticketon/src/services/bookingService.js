import api from "@/lib/api";

export const bookingService = {
  async createBooking({ eventId, quantity, seatIds = [] }) {
    const { data } = await api.post("/bookings/", {
      event_id: eventId,
      quantity,
      seat_ids: seatIds,
    });
    return data;
  },
  async getMyBookings() {
    const { data } = await api.get("/bookings/my/");
    const bookings = Array.isArray(data) ? data : data.results ?? data.bookings;
    if (!Array.isArray(bookings)) throw new Error("Неверный формат списка билетов");
    return bookings;
  },
  async cancelBooking(id) {
    const { data } = await api.post(`/bookings/${encodeURIComponent(String(id))}/cancel/`);
    return data;
  },
};
