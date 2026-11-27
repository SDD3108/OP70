"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/src/hooks/useAuth";
import { bookingService } from "@/src/services/bookingService";
import AccountLayout from "@/src/components/AccountLayout";
import TicketCard from "@/src/components/TicketCard";
import EmptyState from "@/src/components/shared/EmptyState";
import { Button, buttonVariants } from "@/src/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/src/ui/dialog";

const Tickets = ({ email }) => {
  const [bookings, setBookings] = useState(null);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    bookingService.getMyBookings(email).then((data)=>{
      if(active){
        setBookings(data)
      }
    });
    return ()=>{
      active = false  
    }
  },[email]);

  const cancel = async()=>{
    try{
      setBookings(await bookingService.cancelBooking(selected, email));
      setSelected(null);
    }
    catch(error){
      setError(error.message);
    }
  }
  if(!bookings){
    return <p className="text-muted-foreground">Загрузка...</p>;
  }
  if(!bookings.length){
    return (
      <div className="space-y-4">
        <EmptyState title="У вас пока нет билетов" description="Забронируйте первое мероприятие в афише." />
        <Link href="/events" className={buttonVariants()}>
          Открыть афишу
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {[...bookings].reverse().map((booking) => (
        <TicketCard key={booking.id} booking={booking} onCancel={(id) => {
          setSelected(id);
          setError("");
        }} />
      ))}

      <Dialog open={Boolean(selected)} onOpenChange={(open) => {
        if (!open) {
          setSelected(null);
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Отменить бронирование?</DialogTitle>
            <DialogDescription>
              Билет будет отмечен как отменённый в вашей истории.
            </DialogDescription>
          </DialogHeader>
          {error && <p role="alert" className="text-primary">{error}</p>}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelected(null)}>
              Назад
            </Button>
            <Button variant="destructive" onClick={cancel}>
              Отменить билет
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const TicketsPageBuilder = () => {
  const { user } = useAuth();

  return (
    <AccountLayout title="Мои билеты">
      {user && <Tickets key={user.email} email={user.email} />}
    </AccountLayout>
  );
};

export default TicketsPageBuilder;