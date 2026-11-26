"use client";

import { useState } from "react";
import { Minus, Plus, Ticket } from "lucide-react";
import { bookingService } from "@/src/services/bookingService";
import { formatPrice } from "@/src/utils/formatters";

export default function BookingPanel({ event }){
  const id = event?.id ?? event?._id;
  if (!event || id == null){
    return null;
  }

  return <BookingForm key={id} event={event} id={id} />;
}

const BookingForm = ({ event, id })=>{
  const [quantity, setQuantity] = useState(1);
  const [reservation, setReservation] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const unitPrice = Number(event.price ?? event.min_price);

  const handleBooking = async()=>{
    if(status == "loading"){
      return;
    }
    setStatus("loading");
    setError(null);
    setReservation(null);

    try{
      const data = await bookingService.createBooking({
        eventId: id,
        quantity,
      });
      setReservation(data);
      setStatus("succeeded");
    }
    catch(error){
      setError(error.message);
      setStatus("failed");
    }
  }

  return (
    <aside className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="flex items-center gap-2 text-xl font-bold text-zinc-900">
        <Ticket className="h-6 w-6 text-primary" /> Бронирование
      </h2>
      <p className="mt-2 text-sm text-zinc-500">{event.title || event.name}</p>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm font-semibold text-zinc-700">
          Количество билетов
        </span>
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Уменьшить количество"
            disabled={quantity <= 1}
            onClick={() => setQuantity(quantity - 1)}
            className="rounded-lg border p-2 disabled:opacity-30"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-5 text-center font-bold">{quantity}</span>
          <button
            type="button"
            aria-label="Увеличить количество"
            disabled={quantity >= 10}
            onClick={() => setQuantity(quantity + 1)}
            className="rounded-lg border p-2 disabled:opacity-30"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-5">
        <span className="font-semibold text-zinc-700">Примерная стоимость</span>
        <strong className="text-xl text-zinc-900">
          {Number.isFinite(unitPrice)
            ? formatPrice(unitPrice * quantity)
            : "Уточняется"}
        </strong>
      </div>
      <p className="mt-2 text-xs text-zinc-500">
        Окончательную стоимость и доступность билетов проверяет сервер.
      </p>
      {error && (
        <p
          role="alert"
          className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}
      {status === "succeeded" && reservation && (
        <p
          role="status"
          className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-800"
        >
          Запрос на бронирование отправлен. Проверьте его статус в личном
          кабинете.
        </p>
      )}
      <button
        type="button"
        onClick={handleBooking}
        disabled={status === "loading"}
        className="mt-5 w-full rounded-lg bg-primary px-5 py-3 font-bold text-primary-foreground hover:bg-accent-foreground disabled:opacity-50"
      >
        {status === "loading" ? "Отправка..." : "Забронировать"}
      </button>
    </aside>
  );
}
