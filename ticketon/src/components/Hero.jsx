"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin, CalendarDays, Ticket } from "lucide-react";
import { Button, buttonVariants } from "@/src/ui/button";
import { formatDate, formatPrice } from "@/src/utils/formatters";

const Hero = ({slides})=>{
  const [index, setIndex] = useState(0);
  const event = slides[index];
  const move = (direction) => setIndex((value) => (value + direction + slides.length) % slides.length);

  return (
    <section className="relative isolate flex min-h-[420px] items-end overflow-hidden rounded-3xl bg-zinc-900 text-white md:min-h-[480px]">
      <img src={event.banner || event.image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" fetchPriority="high" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/55 to-black/10"></div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="max-w-2xl space-y-4 p-6 pb-16 sm:p-12 sm:pb-20">
        <span className="inline-flex rounded-full bg-primary px-3 py-1 text-xs font-bold tracking-wider">ВЫБОР TICKETON</span>
        <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-white/85">
          <span>{event.category}</span>
          <span>·</span>
          <span>{event.age}</span>
          <span>·</span>
          <span>{formatDate(event.date)}</span>
        </div>
        <h1 className="text-4xl font-black leading-none tracking-tight sm:text-6xl lg:text-7xl">{event.title}</h1>
        <p className="max-w-lg text-sm leading-relaxed text-white/85 sm:text-base">{event.description}</p>
        <div className="flex flex-wrap gap-4 text-sm text-white/90">
          <span className="flex items-center gap-1.5">
            <MapPin className="size-4" />
            {event.city}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-4" />
            {event.time}
          </span>
          <span>от {formatPrice(event.price)}</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <Link href={`/events/${event.id}`} className={buttonVariants({size: "lg", className: "h-12 rounded-xl px-6 font-bold"})}>
            <Ticket />Купить билет
          </Link>
          <Link href="/events" className={buttonVariants({variant: "secondary", size: "lg", className: "h-12 rounded-xl px-6"})}>Вся афиша</Link>
        </div>
      </div>
      <div className="absolute bottom-5 left-6 flex items-center gap-2 sm:left-12">
        {slides.map((slide, i) =>
        <Button key={slide.id} variant="ghost" size="icon-xs" aria-label={`Слайд ${i+1}`} aria-pressed={index == i} onClick={() => setIndex(i)} className={`h-2.5 rounded-full p-0 ${index == i ? "w-8 bg-primary" : "w-2.5 bg-white/50"}`}></Button>)}
      </div>
      <div className="absolute bottom-5 right-5 flex gap-2">
        <Button variant="outline" size="icon" aria-label="Предыдущий слайд" onClick={() => move(-1)} className="border-white/30 bg-black/30 text-white hover:bg-white/20 hover:text-white"><ChevronLeft /></Button>
        <Button variant="outline" size="icon" aria-label="Следующий слайд" onClick={() => move(1)} className="border-white/30 bg-black/30 text-white hover:bg-white/20 hover:text-white"><ChevronRight /></Button>
      </div>
    </section>
  );
};

export default Hero;
