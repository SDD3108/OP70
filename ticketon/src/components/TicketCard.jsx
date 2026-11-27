import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { events } from "@/src/datas/events";
import { Card, CardContent } from "@/src/ui/card";
import { Button } from "@/src/ui/button";
import { formatDate, formatPrice } from "@/src/utils/formatters";

const TicketCard = ({ booking, onCancel }) => {
  const event = events.find((item) => item.id == booking.eventId);
  if(!event){
    return null;
  }
  const cancelled = booking.status == "cancelled";

  return (
    <Card className="rounded-2xl border py-0 shadow-none"><CardContent className="flex flex-wrap items-center gap-4 p-4 sm:flex-nowrap">
      <img src={event.image} alt={event.title} className="h-28 w-20 shrink-0 rounded-xl object-cover" />
      <div className="min-w-0 flex-1 space-y-2">
        <Link href={`/events/${event.id}`} className="font-bold hover:text-primary">
          {event.title}
        </Link>
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <CalendarDays className="size-4" />
          {formatDate(event.date)} · {event.time}
        </p>
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="size-4" />{event.city}, {event.venue}
        </p>
        <p className="text-xs text-muted-foreground">
          Демо-билет · {booking.quantity} шт.
        </p>
      </div>
      <div className="space-y-2 sm:text-right">
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${cancelled ? "bg-secondary text-muted-foreground" : "bg-green-50 text-green-800"}`}>{cancelled ? "Отменён" : "Забронирован"}</span>
        <p className="text-lg font-bold">{formatPrice(booking.total)}</p>
        {!cancelled && <Button variant="outline" size="sm" onClick={() => onCancel(booking.id)}>Отменить</Button>}
      </div>
    </CardContent></Card>
  );
};

export default TicketCard;
