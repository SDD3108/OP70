import { CalendarDays, MapPin, TicketCheck } from "lucide-react";
import { formatDate, formatPrice } from "@/src/utils/formatters";

const statusNames = {
  confirmed: "Подтверждён",
  pending: "Ожидает подтверждения",
  cancelled: "Отменён",
};

export default function TicketCard({ booking }) {
  if (!booking) return null;
  const event = booking.event || {};
  const total = booking.total ?? booking.total_price;
  const start = event.starts_at || event.date;

  return (
    <article className="flex flex-col justify-between gap-5 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-accent p-3 text-primary"><TicketCheck className="h-7 w-7" aria-hidden="true" /></div>
        <div>
          <p className="font-bold text-zinc-900">{event.title || booking.event_title || "Билет на мероприятие"}</p>
          <p className="mt-2 flex items-center gap-2 text-sm text-zinc-500"><CalendarDays className="h-4 w-4" /> {formatDate(start)}</p>
          <p className="mt-1 flex items-center gap-2 text-sm text-zinc-500"><MapPin className="h-4 w-4" /> {event.city || "Место уточняется"}</p>
        </div>
      </div>
      <div className="sm:text-right">
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">{statusNames[booking.status] || booking.status || "Статус уточняется"}</span>
        <p className="mt-3 text-sm text-zinc-500">Количество: {booking.quantity ?? 1}</p>
        <p className="mt-1 text-lg font-bold text-zinc-900">{formatPrice(total)}</p>
      </div>
    </article>
  );
}
