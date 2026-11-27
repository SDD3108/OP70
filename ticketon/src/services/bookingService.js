import { events } from "@/src/datas/events";
import { getCartSummary, hasSeats, isSeat, maxTickets, occupiedSeats, paymentMethods, promoCodes } from "@/src/datas/booking";
import { readStorage, writeStorage } from "@/src/utils/localStorage";

const prefix = "ticketon-bookings-";
const storageKey = (email) => `${prefix}${email}`;

export const getOccupiedSeats = (eventId)=>{
  const seats = [...occupiedSeats];
  for(let i = 0; i < localStorage.length; i++){
    const key = localStorage.key(i);
    if(!key?.startsWith(prefix)){
      continue;
    }
    const bookings = readStorage(key, []);
    bookings.filter((booking) => booking.eventId == eventId && booking.status != "cancelled").forEach((booking) => seats.push(...(booking.seats || [])));
  }
  return [...new Set(seats)];
};

export const validateCart = (items)=>{
  if(!Array.isArray(items) || !items.length){
    throw new Error("Корзина пуста");
  }
  if(new Set(items.map((item) => item.eventId)).size != items.length){
    throw new Error("Повторяющиеся мероприятия в корзине");
  }
  for(const item of items){
    const event = events.find((event) => event.id == item.eventId);
    if(!event || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > maxTickets){
      throw new Error("Проверьте количество билетов");
    }
    if(!Array.isArray(item.seats)){
      throw new Error("Проверьте места");
    }
    if(hasSeats(event)){
      if(item.seats.length != item.quantity || new Set(item.seats).size != item.seats.length || item.seats.some((seat) => !isSeat(seat))){
        throw new Error(`Выберите места: ${event.title}`);
      }
      const occupied = getOccupiedSeats(event.id);
      if(item.seats.some((seat) => occupied.includes(seat))){
        throw new Error(`Некоторые места уже заняты: ${event.title}. Измените выбор в корзине.`);
      }
    }
    else if(item.seats.length){
      throw new Error("Для этого мероприятия места не предусмотрены");
    }
  }
};

const createOrder = async({items, promo = "", email, name, contactEmail, payment})=>{
  if(!email || !name?.trim() || !contactEmail?.trim()){
    throw new Error("Заполните контактные данные");
  }
  if(promo && !Object.hasOwn(promoCodes, promo)){
    throw new Error("Промокод недействителен");
  }
  if(!paymentMethods.some((method) => method.id == payment)){
    throw new Error("Выберите способ оплаты");
  }
  validateCart(items);
  const summary = getCartSummary(items, promo);
  const orderId = crypto.randomUUID();
  const bookings = summary.lines.map((line) => ({
    id: crypto.randomUUID(),
    orderId,
    eventId: line.eventId,
    quantity: line.quantity,
    seats: [...line.seats],
    subtotal: line.subtotal,
    discount: line.discount,
    total: line.total,
    promo,
    payment,
    contactName: name.trim(),
    contactEmail: contactEmail.trim(),
    status: "confirmed",
  }));
  const key = storageKey(email);
  writeStorage(key, [...readStorage(key, []), ...bookings]);
  return {id: orderId, bookings, total: summary.total};
}

const getMyBookings = async(email)=>{
  return readStorage(storageKey(email), []);
}

const getBooking = async(id, email)=>{
  return readStorage(storageKey(email), []).find((booking) => booking.id == id) || null;
}

const cancelBooking = async(id, email)=>{
  const key = storageKey(email);
  const bookings = readStorage(key, []).map((booking) => booking.id == id ? {...booking, status: "cancelled"} : booking);
  writeStorage(key, bookings);
  return bookings;
}

export const bookingService = { createOrder, getMyBookings, getBooking, cancelBooking };
