import { filterEvents } from "@/src/datas/events";

export function useEvents(filters = {}){
  return {
    events: filterEvents(filters),
    isLoading: false,
    error: null,
  };
}
