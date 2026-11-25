"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "@/src/store/slices/eventsSlice";

export function useEvents({ search = "", category = "" } = {}) {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.events);

  useEffect(() => {
    const filters = {};
    if (search) filters.search = search;
    if (category) filters.category = category;
    dispatch(fetchEvents(filters)).unwrap().catch(console.error);
  }, [dispatch, search, category]);

  return {
    events: items,
    isLoading: status === "loading" || status === "idle",
    error,
    refresh: () => dispatch(fetchEvents({ ...(search && { search }), ...(category && { category }) })).unwrap().catch(console.error),
  };
}
