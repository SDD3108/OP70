"use client";

import EventCard from "@/src/components/EventCard";
import SearchBar from "@/src/components/SearchBar";
import EmptyState from "@/src/components/shared/EmptyState";
import ErrorMessage from "@/src/components/shared/ErrorMessage";
import LoadingSpinner from "@/src/components/shared/LoadingSpinner";
import { useEvents } from "@/src/hooks/useEvents";

export default function EventsCatalog({ search = "", category = "" }) {
  const { events, isLoading, error, refresh } = useEvents({ search, category });

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900">Мероприятия</h1>
          <p className="mt-2 text-zinc-500">Найдите событие, которое запомнится надолго.</p>
        </div>
        <SearchBar initialValue={search} className="w-full sm:max-w-md" />
      </div>

      {isLoading ? <LoadingSpinner label="Загружаем мероприятия..." /> : error ? (
        <ErrorMessage message={error} onRetry={refresh} />
      ) : events.length === 0 ? (
        <EmptyState title="Мероприятий пока нет" description="Попробуйте изменить поиск или вернитесь позже." />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => <EventCard key={event.id ?? event._id} event={event} />)}
        </div>
      )}
    </section>
  );
}
