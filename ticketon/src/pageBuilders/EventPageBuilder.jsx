import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock, MapPin } from "lucide-react";
import { events } from "@/src/datas/events";
import BookingPanel from "@/src/feature/booking/BookingPanel";
import EventRow from "@/src/components/EventRow";
import { formatDate, formatPrice } from "@/src/utils/formatters";

const EventPageBuilder = ({ event }) => (
  <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
    <Link href="/events" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
      <ArrowLeft className="size-4" />
      Назад к афише
    </Link>
    <section className="relative isolate overflow-hidden rounded-3xl bg-zinc-900 text-white">
      <img src={event.banner || event.image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-60"/>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 to-black/35"></div>
      <div className="flex flex-col items-start gap-6 p-6 sm:flex-row sm:items-center sm:p-10">
        <img src={event.image} alt={event.title} className="aspect-[3/4] w-36 shrink-0 rounded-2xl object-cover shadow-xl sm:w-52"/>
        <div className="space-y-4">
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold">{event.category} · {event.age}</span>
          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">{event.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-white/90">
            <span className="flex items-center gap-2">
              <CalendarDays className="size-4" />
              {formatDate(event.date)}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="size-4" />
              {event.time}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="size-4" />
              {event.city}, {event.venue}
            </span>
          </div>
          <p className="text-xl font-bold">от {formatPrice(event.price)}</p>
        </div>
      </div>
    </section>
    <div className="grid items-start gap-8 lg:grid-cols-[1fr_370px]">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">О мероприятии</h2>
        <p className="max-w-2xl text-base leading-8 text-muted-foreground">{event.description}</p>
        <div className="rounded-2xl border p-5">
          <h3 className="font-bold">Место проведения</h3>
          <p className="mt-2 text-muted-foreground">{event.venue}, {event.city}</p>
          <p className="mt-1 text-muted-foreground">{formatDate(event.date)}, {event.time}</p>
        </div>
      </section>
      <BookingPanel key={event.id} event={event} />
    </div>
    <EventRow title="Вам может понравиться" events={events.filter((item) => item.category === event.category && item.id !== event.id)} href={`/events?category=${encodeURIComponent(event.category)}`}/>
  </div>
);

export default EventPageBuilder;
