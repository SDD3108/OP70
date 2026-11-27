import { events } from "@/src/datas/events";

export const seatRows = ["1", "2", "3", "4", "5", "6", "7",];
export const seatNumbers = [1,2,3,4,5,6,7,8,9,10,11,12];
export const vipRows = ["6", "7"];
export const occupiedSeats = ["A2","A3","B6","C4","C5","D2","E7","F3","G8"];
export const maxTickets = 10;
export const promoCodes = { TICKET10: 10, WELCOME15: 15 };
export const paymentMethods = [
  {
    id: "card",
    title: "Банковская карта",
    description: "Демонстрационная оплата картой",
  },
  {
    id: "kaspi",
    title: "Kaspi QR",
    description: "Демонстрационная оплата через Kaspi",
  },
]

export const getVenues = (city = "", category = "") => [...new Set(events.filter((event) => (!city || event.city == city) && (!category || event.category == category)).map((event) => event.venue))].sort();
export const hasSeats = (event) => event.category != "Выставки";
export const isSeat = (seat) => typeof seat == "string" && seatRows.some((row) => seatNumbers.some((number) => seat == `${row}${number}`));
export const seatPrice = (event, seat) => vipRows.includes(seat[0]) ? Math.round(event.price * 1.5) : event.price;

export const getCartSummary = (items, promo = "")=>{
  const percent = Object.hasOwn(promoCodes, promo) ? promoCodes[promo] : 0
  const lines = items.flatMap((item)=>{
    const event = events.find((event) => event.id == item.eventId)
    if(!event){
      return []
    }
    const subtotal = hasSeats(event) ? item.seats.reduce((sum, seat) => sum + seatPrice(event, seat), 0) : event.price * item.quantity
    const discount = Math.floor(subtotal * percent / 100)
    return [{...item, event, subtotal, discount, total: subtotal - discount}]
  });
  return {
    lines,
    subtotal: lines.reduce((sum, line) => sum + line.subtotal, 0),
    discount: lines.reduce((sum, line) => sum + line.discount, 0),
    total: lines.reduce((sum, line) => sum + line.total, 0),
    count: lines.reduce((sum, line) => sum + line.quantity, 0),
  };
};
