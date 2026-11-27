"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { ArrowLeft, Download, Printer, Ticket } from "lucide-react";
import { useAuth } from "@/src/hooks/useAuth";
import { bookingService } from "@/src/services/bookingService";
import { events } from "@/src/datas/events";
import { formatDate, formatPrice } from "@/src/utils/formatters";
import AccountLayout from "@/src/components/AccountLayout";
import LoadingSpinner from "@/src/components/shared/LoadingSpinner";
import { Button, buttonVariants } from "@/src/ui/button";
import { Card, CardContent } from "@/src/ui/card";

const escapeXml = (value) => String(value).replace(/[&<>"']/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"})[char]);

const TicketDetails = ({booking, event})=>{
  const [qr, setQr] = useState("");
  const [qrError, setQrError] = useState("");
  const cancelled = booking.status == "cancelled";
  const seatLabel = booking.seats?.length ? booking.seats.join(", ") : "Без указания мест";

  useEffect(()=>{
    if(cancelled){
      return;
    }
    let active = true;
    QRCode.toDataURL(`TICKETON-DEMO:${booking.id}`, {width:240, margin:3}).then((data)=>{
      if(active){
        setQr(data);
      }
    }).catch(()=>{
      if(active){
        setQrError("Не удалось создать QR-код");
      }
    });
    return ()=>{active = false;};
  },[booking.id,cancelled]);

  const download = ()=>{
    const lines = [event.title, `${formatDate(event.date)} · ${event.time}`, `${event.city}, ${event.venue}`, `Билетов: ${booking.quantity} · Места: ${seatLabel}`, `Сумма: ${formatPrice(booking.total)}`, `Номер: ${booking.id}`];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="410" viewBox="0 0 900 410"><rect width="900" height="410" rx="20" fill="#fff" stroke="#ddd"/><path d="M20 0H880Q900 0 900 20V76H0V20Q0 0 20 0" fill="#E53935"/><text x="32" y="48" font-family="Arial,sans-serif" font-size="30" font-weight="bold" fill="white">Ticketon · ${cancelled ? "ОТМЕНЁН" : "ДЕМО-БИЛЕТ"}</text>${lines.map((line,i) => `<text x="32" y="${116+i*42}" font-family="Arial,sans-serif" font-size="${i==0?23:16}" font-weight="${i==0?700:400}" fill="#202124">${escapeXml(line)}</text>`).join("")}${!cancelled && qr ? `<image href="${qr}" x="665" y="102" width="208" height="208"/>` : ""}<text x="32" y="382" font-family="Arial,sans-serif" font-size="14" fill="#777">Учебный проект. Не является действительным билетом.</text></svg>`;
    const url = URL.createObjectURL(new Blob([svg], {type:"image/svg+xml;charset=utf-8"}));
    const link = document.createElement("a");
    link.href = url;
    link.download = `ticketon-${booking.id}.svg`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="space-y-5">
      <Link href="/settings/tickets" className={buttonVariants({variant:"ghost", className:"-ml-3"})}><ArrowLeft /> Все билеты</Link>
      <Card id="print-ticket" className="overflow-hidden rounded-3xl border py-0 shadow-none">
        <div className="flex flex-wrap items-center justify-between gap-2 bg-primary p-5 text-white">
          <div className="flex items-center gap-2 text-xl font-bold"><Ticket /> Ticketon</div>
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold">{cancelled ? "ОТМЕНЁН" : "ДЕМО-БИЛЕТ"}</span>
        </div>
        <CardContent className="grid gap-6 p-5 sm:grid-cols-[1fr_190px] sm:p-6">
          <div className="min-w-0 space-y-4">
            <div>
              <p className="text-sm font-semibold text-primary">{event.category}</p>
              <h2 className="mt-1 text-2xl font-extrabold">{event.title}</h2>
            </div>
            <div className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <p className="text-muted-foreground">Дата и время</p>
                <p className="font-semibold">{formatDate(event.date)} · {event.time}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Площадка</p>
                <p className="font-semibold">{event.city}, {event.venue}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Количество</p>
                <p className="font-semibold">{booking.quantity}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Места</p>
                <p className="font-semibold">{seatLabel}</p>
              </div>
            </div>
            <div className="space-y-1 border-t pt-3">
              <p className="text-xs text-muted-foreground">Номер билета</p>
              <p className="break-all font-mono text-xs">{booking.id}</p>
              {booking.orderId && <p className="break-all text-xs text-muted-foreground">Заказ: {booking.orderId}</p>}
            </div>
            <p className="text-xl font-bold">{formatPrice(booking.total)}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed p-3 text-center">
            {cancelled ? <p className="text-sm font-semibold text-muted-foreground">Билет отменён. QR недоступен.</p> : qr ? <img src={qr} alt="QR-код демонстрационного билета" className="size-40 object-contain" /> : <p className="text-sm text-muted-foreground">{qrError || "Создаём QR-код..."}</p>}
            <p className="text-xs font-medium text-muted-foreground">Только для демонстрации</p>
          </div>
          <p className="border-t pt-3 text-xs text-muted-foreground sm:col-span-2">Этот билет не действует на реальном мероприятии. QR содержит только демонстрационный идентификатор, а не персональные данные.</p>
        </CardContent>
      </Card>
      <div className="flex flex-wrap gap-3 print:hidden">
        <Button onClick={download} disabled={!cancelled && !qr}><Download /> Скачать SVG</Button>
        <Button variant="outline" onClick={() => window.print()} disabled={!cancelled && !qr}><Printer /> Печать / PDF</Button>
      </div>
      <style>{`@media print { body * { visibility: hidden !important; } #print-ticket, #print-ticket * { visibility: visible !important; } #print-ticket { position: absolute !important; inset: 0 auto auto 0 !important; width: 100% !important; max-width: none !important; margin: 0 !important; box-shadow: none !important; print-color-adjust: exact; -webkit-print-color-adjust: exact; } }`}</style>
    </div>
  );
};

const TicketLoader = ({id, email})=>{
  const [booking, setBooking] = useState(undefined);
  useEffect(()=>{
    let active = true;
    bookingService.getBooking(id,email).then((data)=>{
      if(active){
        setBooking(data)
      }
    }).catch(()=>{
      if(active){
        setBooking(null)
      }
    })
    return ()=>{
      active = false
    }
  },[id,email]);
  if(typeof booking == "undefined"){
    return <LoadingSpinner />;
  }
  const event = booking && events.find((item) => item.id == booking.eventId);
  if(!event){
    return <div className="space-y-4">
      <h2 className="text-xl font-bold">Билет не найден</h2>
      <Link href="/settings/tickets" className={buttonVariants()}>Мои билеты</Link>
    </div>;
  }
  return <TicketDetails key={booking.id} booking={booking} event={event} />;
};

const TicketPageBuilder = ({id})=>{
  const {user} = useAuth();
  return (
    <AccountLayout title="Электронный билет">
      {user && <TicketLoader key={`${user.email}-${id}`} id={id} email={user.email} />}
    </AccountLayout>
  )
}

export default TicketPageBuilder;
