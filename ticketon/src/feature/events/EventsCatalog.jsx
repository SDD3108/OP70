"use client";

import { useState } from "react";
import { categories, cities, dates, filterEvents } from "@/src/datas/events";
import { Button } from "@/src/ui/button";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/src/ui/select";
import EventCard from "@/src/components/EventCard";
import SearchBar from "@/src/components/SearchBar";
import EmptyState from "@/src/components/shared/EmptyState";
import { formatDate } from "@/src/utils/formatters";

const EventsCatalog = ({search = "",category: initialCategory = "",initialDate = "",title = "Все мероприятия",})=>{
  const [category, setCategory] = useState(initialCategory);
  const [city, setCity] = useState("");
  const [date, setDate] = useState(initialDate);
  const [sort, setSort] = useState("date");
  const events = filterEvents({ search, category, city, date });
  if(sort == "price"){
    events.sort((a, b) => a.price - b.price)
  }
  else if(sort == "expensive"){
    events.sort((a, b) => b.price - a.price)
  }
  else{
    events.sort((a, b) => a.date.localeCompare(b.date))
  }

  const reset = ()=>{
    setCategory("")
    setCity("")
    setDate("")
    setSort("date")
  }
  return (
    <section className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary">Афиша</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {search ? `Результаты по запросу «${search}»` : "Выбирайте события по интересам, дате и городу."}
          </p>
        </div>
        <SearchBar key={search} initialValue={search} className="w-full sm:max-w-md"/>
      </div>
      <div className="flex flex-wrap gap-2">
        {["", ...categories].map((item) => (
          <Button key={item} variant={category == item ? "default" : "outline"} onClick={() => setCategory(item)}>
            {item || "Все"}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border bg-white p-4">
        <Select value={city || "all"} onValueChange={(value) => setCity(value == "all" ? "" : value)}>
          <SelectTrigger aria-label="Город" className="min-w-36">
            <SelectValue>{city || "Все города"}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все города</SelectItem>
            {cities.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger aria-label="Сортировка" className="min-w-36">
            <SelectValue>
              {sort == "price" ? "Сначала дешевле" : sort == "expensive" ? "Сначала дороже" : "По дате"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">По дате</SelectItem>
            <SelectItem value="price">Сначала дешевле</SelectItem>
            <SelectItem value="expensive">Сначала дороже</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="ghost" onClick={reset}>
          Сбросить фильтры
        </Button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button variant={!date ? "default" : "outline"} onClick={() => setDate("")} className="h-16 shrink-0 rounded-xl">
          Все даты
        </Button>
        {dates.map((item) => (
          <Button key={item} variant={date === item ? "default" : "outline"} onClick={() => setDate(item)} className="h-16 min-w-20 shrink-0 flex-col rounded-xl">
            <span className="text-xs">
              {formatDate(item, {weekday: "short",day: undefined,month: undefined})}
            </span>
            <span className="text-base font-bold">{formatDate(item)}</span>
          </Button>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">Найдено: {events.length}</p>
      {events.length ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Ничего не найдено"
          description="Попробуйте изменить поиск или фильтры."
        />
      )}
    </section>
  );
};

export default EventsCatalog;
