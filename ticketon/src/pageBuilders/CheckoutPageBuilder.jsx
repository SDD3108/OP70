"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, CreditCard, QrCode } from "lucide-react";
import { useAuth } from "@/src/hooks/useAuth";
import { useCart } from "@/src/context/CartContext";
import { bookingService } from "@/src/services/bookingService";
import { paymentMethods } from "@/src/datas/booking";
import { formatDate, formatPrice } from "@/src/utils/formatters";
import { isValidEmail } from "@/src/utils/validators";
import { Button, buttonVariants } from "@/src/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/src/ui/card";
import { Input } from "@/src/ui/input";
import { Label } from "@/src/ui/label";
import CartSummary from "@/src/components/CartSummary";
import LoadingSpinner from "@/src/components/shared/LoadingSpinner";

const CheckoutForm = ({user, onSuccess})=>{
  const cart = useCart();
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [payment, setPayment] = useState(paymentMethods[0].id);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const submit = async(event)=>{
    event.preventDefault();
    if(pending){
      return;
    }
    if(!name.trim() || !isValidEmail(email)){
      setError("Введите имя и корректный email");
      return;
    }
    setPending(true);
    setError("");
    try{
      const order = await bookingService.createOrder({items:cart.items, promo:cart.promo, email:user.email, name, contactEmail:email, payment});
      onSuccess(order);
      cart.clear();
    }catch(error){
      setError(error.message);
    }finally{
      setPending(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="grid items-start gap-6 lg:grid-cols-[1fr_380px]">
      <div className="space-y-5">
        <Card className="rounded-2xl border shadow-none">
          <CardHeader>
            <CardTitle className="text-xl font-bold">1. Контактные данные</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Имя</Label>
              <Input id="contact-name" value={name} onChange={(event) => setName(event.target.value)} required className="h-11 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input id="contact-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="h-11 rounded-xl" />
            </div>
            <p className="text-xs text-muted-foreground sm:col-span-2">Это учебный проект. Письма не отправляются; используйте вымышленные данные.</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border shadow-none">
          <CardHeader>
            <CardTitle className="text-xl font-bold">2. Способ оплаты</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {paymentMethods.map((method)=>{
              const Icon = method.id == "card" ? CreditCard : QrCode;
              return <Button key={method.id} type="button" variant="outline" aria-pressed={payment == method.id} onClick={() => setPayment(method.id)} className={`h-auto w-full justify-start gap-3 rounded-xl p-4 text-left whitespace-normal ${payment == method.id ? "border-primary bg-accent" : ""}`}>
                <Icon className="size-6 text-primary" />
                <span className="flex-1">
                  <span className="block font-semibold">{method.title}</span>
                  <span className="block text-xs font-normal text-muted-foreground">{method.description}</span>
                </span>
                {payment == method.id && <CheckCircle className="text-primary" />}
              </Button>;
            })}
            <p className="rounded-xl bg-secondary p-3 text-sm text-muted-foreground">Оплата симулируется. Номер карты, CVV и банковские данные не требуются.</p>
          </CardContent>
        </Card>
      </div>
      <Card className="rounded-2xl border shadow-none lg:sticky lg:top-24">
        <CardHeader>
          <CardTitle className="text-xl font-bold">3. Подтверждение заказа</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {cart.lines.map((line) => <div key={line.eventId} className="space-y-1 border-b pb-3">
            <div className="flex justify-between gap-3 text-sm font-semibold">
              <span>{line.event.title}</span>
              <span className="shrink-0">{formatPrice(line.total)}</span>
            </div>
            <p className="text-xs text-muted-foreground">{formatDate(line.event.date)} · {line.event.time} · {line.quantity} шт.</p>
            {line.seats.length > 0 && <p className="text-xs text-muted-foreground">Места: {line.seats.join(", ")}</p>}
          </div>)}
          {cart.promo && <p className="text-sm text-green-700">Промокод: {cart.promo}</p>}
          <CartSummary {...cart} />
          {error && <p role="alert" className="rounded-xl bg-accent p-3 text-sm text-primary">{error}</p>}
          <Button type="submit" disabled={pending} className="h-12 w-full rounded-xl">{pending ? "Оформляем..." : "Подтвердить демо-оплату"}</Button>
          <p className="text-center text-xs text-muted-foreground">Билеты сохранятся в личном кабинете.</p>
        </CardContent>
      </Card>
    </form>
  );
};

const CheckoutPageBuilder = ()=>{
  const {user, isLoading} = useAuth();
  const cart = useCart();
  const [order, setOrder] = useState(null);

  if(order) return (
    <section className="mx-auto max-w-xl px-4 py-16 text-center">
      <Card className="rounded-3xl border shadow-none">
        <CardContent className="space-y-5 pt-6">
          <CheckCircle className="mx-auto size-16 text-green-600" />
          <h1 className="text-3xl font-extrabold">Заказ оформлен!</h1>
          <p className="text-muted-foreground">Демонстрационная покупка на сумму {formatPrice(order.total)} завершена. Реальные средства не списаны.</p>
          <p className="break-all rounded-xl bg-secondary p-3 font-mono text-xs">Заказ № {order.id}</p>
          <Link href="/settings/tickets" className={buttonVariants({size:"lg", className:"h-12 w-full rounded-xl"})}>Мои билеты</Link>
          <Link href="/events" className="text-sm font-medium text-primary hover:underline">Вернуться в афишу</Link>
        </CardContent>
      </Card>
    </section>
  );
  return (
    <section className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/cart" className={buttonVariants({variant:"ghost", className:"-ml-3"})}><ArrowLeft /> В корзину</Link>
      <h1 className="text-3xl font-extrabold tracking-tight">Оформление заказа</h1>
      {isLoading || !cart.ready ? <LoadingSpinner /> : !cart.lines.length ? (
        <Card className="rounded-2xl border shadow-none">
          <CardContent className="space-y-4">
            <p>В корзине нет билетов.</p>
            <Link href="/events" className={buttonVariants()}>Открыть афишу</Link>
          </CardContent>
        </Card>
      ) : !user ? (
        <Card className="max-w-lg rounded-2xl border shadow-none">
          <CardContent className="space-y-4">
            <h2 className="text-xl font-bold">Войдите, чтобы оформить заказ</h2>
            <p className="text-muted-foreground">Корзина сохранится. После входа можно продолжить оформление.</p>
            <Link href="/signin?next=/checkout" className={buttonVariants({size:"lg"})}>Войти</Link>
          </CardContent>
        </Card>
      ) : <CheckoutForm key={user.email} user={user} onSuccess={setOrder} />}
    </section>
  );
}

export default CheckoutPageBuilder;
