"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, Trash2, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/src/context/CartContext";
import { hasSeats, maxTickets, promoCodes, seatPrice } from "@/src/datas/booking";
import { formatDate, formatPrice } from "@/src/utils/formatters";
import { Button, buttonVariants } from "@/src/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/src/ui/card";
import { Input } from "@/src/ui/input";
import { Label } from "@/src/ui/label";
import CartSummary from "@/src/components/CartSummary";
import EmptyState from "@/src/components/shared/EmptyState";
import LoadingSpinner from "@/src/components/shared/LoadingSpinner";

const CartItem = ({line})=>{
  const {remove, changeQuantity, removeSeat} = useCart();
  const {event, seats, quantity, subtotal} = line;
  return (
    <Card className="rounded-2xl border shadow-none">
      <CardContent className="space-y-4">
        <div className="flex items-start gap-4">
          <Link href={`/events/${event.id}`} className="shrink-0">
            <img src={event.image} alt={event.title} className="h-28 w-20 rounded-xl object-cover" />
          </Link>
          <div className="min-w-0 flex-1 space-y-2">
            <p className="text-xs font-semibold text-primary">{event.category}</p>
            <Link href={`/events/${event.id}`} className="text-lg font-bold hover:text-primary">{event.title}</Link>
            <p className="text-sm text-muted-foreground">{formatDate(event.date)} · {event.time}</p>
            <p className="text-sm text-muted-foreground">{event.city}, {event.venue}</p>
          </div>
          <Button type="button" variant="ghost" size="icon" aria-label={`Удалить ${event.title}`} onClick={() => remove(event.id)}>
            <Trash2 className="text-muted-foreground" />
          </Button>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
          {hasSeats(event) ? (
            <div className="flex flex-wrap items-center gap-2">
              {seats.map((seat) => <Button key={seat} type="button" variant="outline" size="sm" title={formatPrice(seatPrice(event,seat))} aria-label={`Удалить место ${seat}`} onClick={() => removeSeat(event.id,seat)}>
                {seat}
                <X className="size-3" />
              </Button>)}
              <Link href={`/events/${event.id}/seats`} className="text-sm font-semibold text-primary hover:underline">Изменить места</Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon-sm" aria-label="Уменьшить" disabled={quantity <= 1} onClick={() => changeQuantity(event.id, quantity - 1)}>
                <Minus />
              </Button>
              <span>{quantity}</span>
              <Button variant="outline" size="icon-sm" aria-label="Увеличить" disabled={quantity >= maxTickets} onClick={() => changeQuantity(event.id, quantity + 1)}>
                <Plus />
              </Button>
            </div>
          )}
          <strong className="text-lg">{formatPrice(subtotal)}</strong>
        </div>
      </CardContent>
    </Card>
  );
};

const Promo = ()=>{
  const {promo, applyPromo} = useCart();
  const [value, setValue] = useState(promo);
  const [error, setError] = useState("");
  const submit = (event)=>{
    event.preventDefault();
    setError(applyPromo(value) ? "" : "Промокод не найден");
  };
  return (
    <form onSubmit={submit} className="space-y-2 border-t pt-4">
      <Label htmlFor="promo">Промокод</Label>
      <div className="flex gap-2">
        <Input id="promo" value={value} onChange={(event) => setValue(event.target.value)} placeholder="TICKET10" className="h-10 rounded-xl" />
        <Button type="submit" variant="outline" className="h-10 rounded-xl">Применить</Button>
      </div>
      {error && <p role="alert" className="text-xs text-primary">{error}</p>}
      {promo && <div className="flex items-center justify-between text-sm text-green-700">
        <span>{promo} · скидка {promoCodes[promo]}%</span>
        <Button type="button" variant="ghost" size="xs" onClick={()=>{applyPromo(""); setValue(""); setError("");}}>Убрать</Button>
      </div>}
      <p className="text-xs text-muted-foreground">Демо-коды: TICKET10 и WELCOME15</p>
    </form>
  );
};

const CartPageBuilder = ()=>{
  const cart = useCart();
  return (
    <section className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/events" className={buttonVariants({variant:"ghost", className:"-ml-3"})}><ArrowLeft /> К афише</Link>
      <div>
        <p className="text-sm font-semibold text-primary">Покупка билетов</p>
        <h1 className="mt-1 flex items-center gap-3 text-3xl font-extrabold tracking-tight"><ShoppingCart className="text-primary" /> Корзина</h1>
      </div>
      {!cart.ready ? <LoadingSpinner /> : !cart.lines.length ? (
        <div className="space-y-4">
          <EmptyState title="Корзина пуста" description="Выберите мероприятие и добавьте билеты." />
          <Link href="/events" className={buttonVariants({size:"lg"})}>Посмотреть афишу</Link>
        </div>
      ) : (
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-3">{cart.lines.map((line) => <CartItem key={line.eventId} line={line} />)}</div>
          <Card className="rounded-2xl border shadow-none lg:sticky lg:top-24">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Ваш заказ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <Promo />
              <CartSummary {...cart} />
              <Link href="/checkout" className={buttonVariants({size:"lg", className:"h-12 w-full rounded-xl"})}>Оформить заказ</Link>
              <p className="text-center text-xs text-muted-foreground">Без реальной оплаты</p>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
}

export default CartPageBuilder;
