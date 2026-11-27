"use client";
import { useState } from "react";

export function useBooking() {
  const [quantity, setQuantity] = useState(1)
  return { quantity, setQuantity }
}
