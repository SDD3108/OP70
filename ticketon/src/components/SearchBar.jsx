"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar({ initialValue = "", placeholder = "Название мероприятия или город", className = "" }) {
  const [query, setQuery] = useState(initialValue);
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    const search = query.trim();
    router.push(search ? `/search?q=${encodeURIComponent(search)}` : "/events");
  }

  return (
    <form role="search" onSubmit={handleSubmit} className={`flex items-center gap-2 rounded-xl border border-zinc-200 bg-white p-2 shadow-sm ${className}`}>
      <Search className="ml-3 h-5 w-5 shrink-0 text-zinc-400" aria-hidden="true" />
      <input
        aria-label="Поиск мероприятий"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
      />
      <button type="submit" className="shrink-0 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-accent-foreground">Найти</button>
    </form>
  );
}
