"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin, ShoppingCart } from "lucide-react";
import { useCart } from "@/src/context/CartContext";
import { seatRows, seatNumbers, vipRows, seatPrice, maxTickets, occupiedSeats } from "@/src/datas/booking";
import { getOccupiedSeats } from "@/src/services/bookingService";
import { formatDate, formatPrice } from "@/src/utils/formatters";
import { Button, buttonVariants } from "@/src/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/ui/card";
import LoadingSpinner from "@/src/components/shared/LoadingSpinner";

const SeatSelection = ({event, initialSeats})=>{
  const router = useRouter();
  const {add} = useCart();
  const [selected, setSelected] = useState(initialSeats);
  const [occupied, setOccupied] = useState(occupiedSeats);
  const [error, setError] = useState("");

  useEffect(()=>{
    const refresh = () => setOccupied(getOccupiedSeats(event.id));
    Promise.resolve().then(refresh);
    window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
  },[event.id]);

  const seats = selected.filter((seat) => !occupied.includes(seat));
  const total = seats.reduce((sum, seat) => sum + seatPrice(event, seat), 0);
  const toggle = (seat)=>{
    setError("");
    if(seats.includes(seat)){
      setSelected(seats.filter((item) => item != seat));
    }
    else if(seats.length < maxTickets){
      setSelected([...seats, seat]);
    }
    else setError(`Можно выбрать не более ${maxTickets} мест`);
  };
  const submit = ()=>{
    try{
      const unavailable = getOccupiedSeats(event.id);
      if(seats.some((seat) => unavailable.includes(seat))){
        setOccupied(unavailable);
        setError("Некоторые места уже заняты. Выберите другие.");
        return;
      }
      add(event.id, seats.length, seats);
      router.push("/cart");
    }catch(error){
      setError(error.message);
    }
  };

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px]">
      <Card className="rounded-2xl border shadow-none">
        <CardContent className="space-y-7 pt-6">
          <div className="mx-auto max-w-lg text-center">
            <div className="h-5 rounded-[50%] border-t-4 border-primary bg-gradient-to-b from-red-100 to-transparent" />
            <span className="text-xs font-semibold tracking-[.3em] text-muted-foreground">{event.category == "Кино" ? "ЭКРАН" : "СЦЕНА / ПЛОЩАДКА"}</span>
          </div>
          <div className="overflow-x-auto pb-2">
            <div className="mx-auto w-fit min-w-[340px] space-y-2">
              {seatRows.map((row) => (
                <div key={row} className="flex items-center justify-center gap-1.5 sm:gap-2">
                  <span className="w-5 text-center text-xs text-muted-foreground">{row}</span>
                  {seatNumbers.map((number)=>{
                    const seat = `${row}${number}`;
                    const taken = occupied.includes(seat);
                    const active = seats.includes(seat);
                    const vip = vipRows.includes(row);
                    return <Button key={seat} type="button" size="icon-sm" variant={active ? "default" : "outline"} disabled={taken} aria-label={`Ряд ${row}, место ${number}, ${taken ? "занято" : formatPrice(seatPrice(event, seat))}`} aria-pressed={active} onClick={() => toggle(seat)} className={`size-7 rounded-md p-0 text-xs sm:size-9 ${number == 6 ? "ml-3" : ""} ${taken ? "bg-zinc-300 text-zinc-600 opacity-70" : active ? "bg-primary text-white" : vip ? "border-amber-300 bg-amber-100 text-amber-900 hover:bg-amber-200" : "bg-secondary"}`}>{number}</Button>;
                  })}
                  <span className="w-5 text-center text-xs text-muted-foreground">{row}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
            {[['bg-secondary border','Свободно'],['bg-amber-100 border-amber-300 border','VIP'],['bg-primary','Выбрано'],['bg-zinc-300','Занято']].map(([color,label]) => <span key={label} className="flex items-center gap-2">
              <i className={`size-4 rounded ${color}`} />
              {label}
            </span>)}
          </div>
          <p className="text-center text-xs text-muted-foreground">Демонстрационная схема зала, не реальное расположение мест.</p>
        </CardContent>
      </Card>
      <Card className="rounded-2xl border shadow-none lg:sticky lg:top-24">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Ваши места</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">Обычные — {formatPrice(event.price)} · VIP — {formatPrice(seatPrice(event,"G1"))}</p>
          {!seats.length && <p className="rounded-xl bg-secondary p-4 text-sm text-muted-foreground">Выберите места на схеме.</p>}
          {seats.map((seat) => <div key={seat} className="flex items-center justify-between border-b pb-2 text-sm">
            <span>Ряд {seat[0]}, место {seat.slice(1)} {vipRows.includes(seat[0]) && "· VIP"}</span>
            <span className="font-semibold">{formatPrice(seatPrice(event,seat))}</span>
          </div>)}
          <div className="flex justify-between border-t pt-4">
            <span>{seats.length} билет(ов)</span>
            <strong className="text-xl">{formatPrice(total)}</strong>
          </div>
          {error && <p role="alert" className="text-sm text-primary">{error}</p>}
          <Button disabled={!seats.length} onClick={submit} className="h-12 w-full rounded-xl"><ShoppingCart /> В корзину</Button>
          <Button variant="ghost" onClick={() => setSelected([])} disabled={!seats.length} className="w-full">Очистить выбор</Button>
        </CardContent>
      </Card>
    </div>
  );
};

const SeatsPageBuilder = ({event})=>{
  const {items, ready} = useCart();
  return (
    <section className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <Link href={`/events/${event.id}`} className={buttonVariants({variant:"ghost", className:"-ml-3"})}><ArrowLeft /> К мероприятию</Link>
      <div className="flex flex-wrap items-center gap-4">
        <img src={event.image} alt={event.title} className="h-24 w-20 rounded-xl object-cover" />
        <div className="space-y-2">
          <p className="text-sm font-semibold text-primary">Выбор мест</p>
          <h1 className="text-3xl font-extrabold">{event.title}</h1>
          <p className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><CalendarDays className="size-4" />{formatDate(event.date)} · {event.time}</span>
            <span className="flex items-center gap-1"><MapPin className="size-4" />{event.city}, {event.venue}</span>
          </p>
        </div>
      </div>
      {ready ? <SeatSelection key={event.id} event={event} initialSeats={items.find((item) => item.eventId == event.id)?.seats || []} /> : <LoadingSpinner />}
    </section>
  );
}

export default SeatsPageBuilder;
