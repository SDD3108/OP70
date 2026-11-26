"use client";

import { useEffect, useState } from "react";
import { eventService } from "@/src/services/eventService";

export function useEvents({ search = "", category = "" } = {}){
  const [retry, setRetry] = useState(0);
  const [result, setResult] = useState(null);
  const key = JSON.stringify([search, category, retry]);

  useEffect(() => {
    let active = true;
    const filters = {};
    if(search){
      filters.search = search;
    }
    if(category){
      filters.category = category;
    }

    eventService.getEvents(filters).then((events) => {
      if(active){
        setResult({ key, events, error: null });
      }
    }).catch((error) => {
      if(active){
        setResult({ key, events: [], error: error.message });
      }
    });

    return () => {
      active = false;
    };
  },[search, category, key]);

  const isLoading = result?.key !== key;

  return {
    events: isLoading ? [] : result.events,
    isLoading,
    error: isLoading ? null : result.error,
    refresh: () => setRetry((value) => value + 1),
  };
}
