import api from "@/lib/api";

export const eventService = {
  async getEvents(filters = {}) {
    const { data } = await api.get("/events/", { params: filters });
    const events = Array.isArray(data) ? data : data.results ?? data.events;
    if (!Array.isArray(events)) throw new Error("Неверный формат списка мероприятий");
    return events;
  },
  async getEvent(id) {
    const { data } = await api.get(`/events/${encodeURIComponent(String(id))}/`);
    return data;
  },
};
