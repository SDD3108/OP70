import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Ticket } from "lucide-react";
import { formatDate, formatPrice, formatTime } from "@/src/utils/formatters";

export default function EventCard({ event }) {
  if (!event) return null;

  const id = event.id ?? event._id;
  const title = event.title || event.name || "Мероприятие";
  const start = event.starts_at || event.startsAt || event.date;
  const price = event.min_price ?? event.price;
  const city = event.city || event.location?.city || "Место уточняется";
  const category = typeof event.category === "object" ? event.category?.name : event.category;

  return (
    <article className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="flex h-48 items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-red-900 text-primary">
        <Ticket className="h-16 w-16 opacity-80 transition-transform group-hover:rotate-[-12deg] group-hover:scale-110" aria-hidden="true" />
      </div>
      <div className="p-5">
        {category && <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">{category}</span>}
        <h3 className="mt-3 line-clamp-2 min-h-14 text-xl font-bold text-zinc-900">{title}</h3>
        <div className="mt-3 space-y-2 text-sm text-zinc-500">
          <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4 shrink-0" /> {formatDate(start)}{formatTime(start) ? `, ${formatTime(start)}` : ""}</p>
          <p className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" /> {city}</p>
        </div>
        <div className="mt-5 flex items-end justify-between border-t border-zinc-100 pt-4">
          <div><span className="text-xs text-zinc-500">От</span><p className="text-lg font-extrabold text-zinc-900">{formatPrice(price)}</p></div>
          {id != null ? (
            <Link href={`/events/${encodeURIComponent(String(id))}`} className="inline-flex items-center gap-1 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-foreground">
              Подробнее <ArrowUpRight className="h-4 w-4" />
            </Link>
          ) : (
            <span className="text-sm text-zinc-400">Скоро</span>
          )}
        </div>
      </div>
    </article>
  );
}
