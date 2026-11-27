import Link from "next/link";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/src/ui/card";
import { buttonVariants } from "@/src/ui/button";
import { formatDate, formatPrice } from "@/src/utils/formatters";

const EventCard = ({event})=>{
  return (
    <Card className="group h-full gap-0 rounded-2xl border py-0 shadow-none transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/events/${event.id}`} className="relative block aspect-[3/4] overflow-hidden bg-zinc-200">
        <img src={event.image} alt={event.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-black/65 px-2.5 py-1 text-xs font-medium text-white">{event.age}</span>
        <span className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1.5 text-sm font-bold text-zinc-900">от {formatPrice(event.price)}</span>
      </Link>
      <CardContent className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-semibold text-primary">{event.category} · {formatDate(event.date)}</p>
        <Link href={`/events/${event.id}`} className="line-clamp-2 text-base font-bold hover:text-primary">{event.title}</Link>
        <p className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="size-3.5 shrink-0" />{event.city}, {event.venue}</p>
        <Link href={`/events/${event.id}`} className={buttonVariants({variant: "secondary", className: "mt-auto w-full rounded-xl"})}>Подробнее</Link>
      </CardContent>
    </Card>
  );
};

export default EventCard;
