"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Minus, Plus, Ticket } from "lucide-react";
import { useBooking } from "@/src/hooks/useBooking";
import { selectEvent } from "@/src/store/slices/bookingSlice";
import { formatPrice } from "@/src/utils/formatters";

export default function BookingPanel({ event }) {
  const dispatch = useDispatch();
  const { quantity, seatIds, status, error, reservation, changeQuantity, reserve } = useBooking();
  const id = event?.id ?? event?._id;
  const unitPrice = Number(event?.price ?? event?.min_price);

  useEffect(() => {
    if (id != null) dispatch(selectEvent(id));
  }, [id, dispatch]);

  if (!event || id == null) return null;

  function handleBooking() {
    if (status == "loading") return;
    reserve({ eventId: id, quantity, seatIds }).catch(console.error);
  }

  return (
    <aside className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="flex items-center gap-2 text-xl font-bold text-zinc-900"><Ticket className="h-6 w-6 text-emerald-600" /> Бронирование</h2>
      <p className="mt-2 text-sm text-zinc-500">{event.title || event.name}</p>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm font-semibold text-zinc-700">Количество билетов</span>
        <div className="flex items-center gap-4">
          <button type="button" aria-label="Уменьшить количество" disabled={quantity <= 1} onClick={() => changeQuantity(quantity - 1)} className="rounded-lg border p-2 disabled:opacity-30"><Minus className="h-4 w-4" /></button>
          <span className="w-5 text-center font-bold">{quantity}</span>
          <button type="button" aria-label="Увеличить количество" disabled={quantity >= 10} onClick={() => changeQuantity(quantity + 1)} className="rounded-lg border p-2 disabled:opacity-30"><Plus className="h-4 w-4" /></button>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-5">
        <span className="font-semibold text-zinc-700">Примерная стоимость</span>
        <strong className="text-xl text-zinc-900">{Number.isFinite(unitPrice) ? formatPrice(unitPrice * quantity) : "Уточняется"}</strong>
      </div>
      <p className="mt-2 text-xs text-zinc-500">Окончательную стоимость и доступность билетов проверяет сервер.</p>
      {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {status == "succeeded" && reservation && <p role="status" className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-800">Запрос на бронирование отправлен. Проверьте его статус в личном кабинете.</p>}
      <button type="button" onClick={handleBooking} disabled={status == "loading"} className="mt-5 w-full rounded-lg bg-[#00e35b] px-5 py-3 font-bold text-zinc-950 hover:bg-[#00c94f] disabled:opacity-50">
        {status == "loading" ? "Отправка..." : "Забронировать"}
      </button>
    </aside>
  );
}
