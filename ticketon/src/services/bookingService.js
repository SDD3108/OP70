import { events } from "@/src/datas/events";
import { readStorage, writeStorage } from "@/src/utils/localStorage";

const storageKey = (email) => `ticketon-bookings-${email}`;

export const bookingService = {
  async createBooking({eventId, quantity, email}){
    const event = events.find((item) => item.id == eventId);
    if(!email || !event || !Number.isInteger(quantity) || quantity < 1 || quantity > 10){
      throw new Error("Проверьте данные бронирования");
    }
    const key = storageKey(email);
    const booking = {
      id: crypto.randomUUID(),
      eventId,
      quantity,
      total: event.price * quantity,
      status: "confirmed",
    }
    writeStorage(key, [...readStorage(key,[]),booking])
    return booking;
  },
  async getMyBookings(email){
    return readStorage(storageKey(email), []);
  },
  async cancelBooking(id,email){
    const key = storageKey(email);
    const bookings = readStorage(key, []).map((booking) => booking.id == id ? { ...booking, status: "cancelled" } : booking)
    writeStorage(key,bookings)
    return bookings;
  },
}
