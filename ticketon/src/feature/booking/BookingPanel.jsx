"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Ticket, ShoppingCart } from "lucide-react";
import { useCart } from "@/src/context/CartContext";
import { hasSeats, maxTickets } from "@/src/datas/booking";
import { formatPrice } from "@/src/utils/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/ui/card";
import { Button, buttonVariants } from "@/src/ui/button";

const BookingPanel = ({event})=>{
  const { add, items, ready } = useCart();
  const [selectedQuantity, setQuantity] = useState(null);
  const [error, setError] = useState("");
  const existing = items.find((item) => item.eventId == event.id);
  const seated = hasSeats(event);
  const quantity = selectedQuantity ?? existing?.quantity ?? 1;

  const addTickets = ()=>{
    try{
      add(event.id, quantity);
      setError("");
    }catch(error){
      setError(error.message);
    }
  };

  return (
    <Card className="rounded-2xl border shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold"><Ticket className="text-primary" /> Билеты</CardTitle>
        <p className="text-sm text-muted-foreground">{event.time} · {event.venue}</p>
      </CardHeader>
      <CardContent className="space-y-5">
        {seated ? (
          <>
            <div className="flex items-center justify-between border-b pb-4">
              <span>Цена от</span>
              <strong className="text-2xl">{formatPrice(event.price)}</strong>
            </div>
            <Link href={`/events/${event.id}/seats`} className={buttonVariants({size:"lg", className:"h-12 w-full rounded-xl"})}>{existing ? "Изменить места" : "Выбрать места"}</Link>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between gap-2">
              <span>Количество билетов</span>
              <div className="flex items-center gap-3">
                <Button type="button" variant="outline" size="icon" aria-label="Уменьшить" disabled={quantity <= 1} onClick={() => setQuantity(quantity - 1)}>
                  <Minus />
                </Button>
                <strong>{quantity}</strong>
                <Button type="button" variant="outline" size="icon" aria-label="Увеличить" disabled={quantity >= maxTickets} onClick={() => setQuantity(quantity + 1)}>
                  <Plus />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between border-t pt-4">
              <span>Итого</span>
              <strong className="text-2xl">{formatPrice(event.price * quantity)}</strong>
            </div>
            <Button disabled={!ready} className="h-12 w-full rounded-xl" onClick={addTickets}>
              <ShoppingCart />
              {existing ? "Обновить корзину" : "В корзину"}
            </Button>
          </>
        )}
        {existing && <Link href="/cart" className={buttonVariants({variant:"outline", className:"w-full rounded-xl"})}>В корзине: {existing.quantity} шт. · Открыть</Link>}
        {error && <p role="alert" className="text-sm text-primary">{error}</p>}
        <p className="text-xs text-muted-foreground">Демо-режим. Реальная оплата не производится.</p>
      </CardContent>
    </Card>
  );
};

export default BookingPanel;
