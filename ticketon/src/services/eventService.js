import { events, filterEvents } from "@/src/datas/events";

export const eventService = {
  getEvents: async (filters = {}) => filterEvents(filters),
  getEvent: async (id) => events.find((event) => event.id == id),
};
