"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/src/ui/button";
import EventCard from "@/src/components/EventCard";

const EventRow = ({title, events, href = "/events"}) => {
  if(!events.length){
    return null
  }
  const row = useRef(null)
  const scroll = (direction) => row.current?.scrollBy({ left: direction * row.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h2>
        <div className="flex items-center gap-2">
          <Link href={href} className="flex items-center gap-1 text-sm font-semibold text-primary">Все <ArrowUpRight className="size-4" /></Link>
          <Button variant="outline" size="icon" aria-label="Назад" onClick={() => scroll(-1)} className="hidden sm:inline-flex"><ChevronLeft /></Button>
          <Button variant="outline" size="icon" aria-label="Вперёд" onClick={() => scroll(1)} className="hidden sm:inline-flex"><ChevronRight /></Button>
        </div>
      </div>
      <div ref={row} className="flex snap-x gap-4 overflow-x-auto px-1 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {events.map((event) =>
          <div key={event.id} className="w-[165px] shrink-0 snap-start sm:w-[215px] lg:w-[228px]">
            <EventCard event={event} />
          </div>
        )}
      </div>
    </section>
  );
};

export default EventRow;
