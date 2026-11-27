"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Ticket, CheckCircle } from "lucide-react";
import { useAuth } from "@/src/hooks/useAuth";
import { bookingService } from "@/src/services/bookingService";
import { formatPrice } from "@/src/utils/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/ui/card";
import { Button, buttonVariants } from "@/src/ui/button";
import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogDescription,DialogFooter} from "@/src/ui/dialog";

const BookingPanel = ({event}) => {
  const { user, isLoading } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [reservation, setReservation] = useState(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const reserve = async()=>{
    if(!user || pending){
      return;
    }
    setPending(true);
    setError("");
    try{
      const booking = await bookingService.createBooking({
        eventId: event.id,
        quantity,
        email: user.email,
      });
      setReservation(booking);
      setOpen(false);
    }
    catch (error){
      setError(error.message);
    }
    finally{
      setPending(false);
    }
  }
  return (
    <Card className="rounded-2xl border shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <Ticket className="text-primary" />
          Бронирование
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {event.date && event.time} · {event.venue}
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium">Количество билетов</span>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" aria-label="Уменьшить" disabled={quantity <= 1} onClick={() => setQuantity(quantity - 1)}>
              <Minus />
            </Button>
            <span className="font-bold">{quantity}</span>
            <Button variant="outline" size="icon" aria-label="Увеличить" disabled={quantity >= 10} onClick={() => setQuantity(quantity + 1)}>
              <Plus />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between border-t pt-4">
          <span>Итого</span>
          <span className="text-2xl font-extrabold">
            {formatPrice(event.price * quantity)}
          </span>
        </div>
        {isLoading ? (
          <Button disabled className="w-full">
            Загрузка...
          </Button>
        ) : user ? (
          <Button size="lg" className="h-12 w-full rounded-xl" 
            onClick={() => {
              setReservation(null)
              setError("")
              setOpen(true)
            }}
          >
            Забронировать
          </Button>
        ) : (
          <Link href="/signin" className={buttonVariants({size: "lg",className: "h-12 w-full rounded-xl"})}>
            Войти для бронирования
          </Link>
        )}
        {reservation && (
          <div role="status" className="space-y-2 rounded-xl bg-green-50 p-3 text-green-800">
            <p className="flex items-center gap-2 font-medium">
              <CheckCircle className="size-4" />
              Бронирование создано
            </p>
            <Link href="/settings/tickets" className="text-sm underline">
              Перейти к моим билетам
            </Link>
          </div>
        )}
        <p className="text-xs leading-relaxed text-muted-foreground">
          Демо-бронирование. Оплата не производится, билет не является
          действительным.
        </p>
      </CardContent>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Подтвердить бронирование?</DialogTitle>
            <DialogDescription>
              {event.title} · {quantity} шт. ·{" "}
              {formatPrice(event.price * quantity)}. Это демонстрация без
              оплаты.
            </DialogDescription>
          </DialogHeader>
          {error && (
            <p role="alert" className="text-sm text-primary">
              {error}
            </p>
          )}
          <DialogFooter>
            <Button variant="outline" disabled={pending} onClick={() => setOpen(false)}>
              Отмена
            </Button>
            <Button disabled={pending} onClick={reserve}>
              {pending ? "Бронирование..." : "Подтвердить"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default BookingPanel;