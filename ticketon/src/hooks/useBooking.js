"use client";

import { useCart } from "@/src/context/CartContext";

export const useBooking = ()=>{
  return useCart();
}
