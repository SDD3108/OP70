"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/src/ui/input";
import { Button } from "@/src/ui/button";

const SearchBar = ({initialValue = "", className = ""})=>{
  const [query, setQuery] = useState(initialValue)
  const router = useRouter()
  const submit = (event) => {
    event.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <form onSubmit={submit} role="search" className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Мероприятие, город или место" aria-label="Поиск мероприятий" className="h-12 rounded-xl pl-11" />
      </div>
      <Button type="submit" size="lg" className="h-12 rounded-xl px-5">Найти</Button>
    </form>
  );
};

export default SearchBar;
