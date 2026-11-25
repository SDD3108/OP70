"use client";

import { useDispatch, useSelector } from "react-redux";
import { createReservation, selectEvent, setQuantity, setSeatIds, clearBooking } from "@/src/store/slices/bookingSlice";

export function useBooking() {
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.booking);
  return {
    ...booking,
    chooseEvent: (id) => dispatch(selectEvent(id)),
    changeQuantity: (quantity) => dispatch(setQuantity(quantity)),
    changeSeats: (ids) => dispatch(setSeatIds(ids)),
    reserve: (values) => dispatch(createReservation(values)).unwrap(),
    reset: () => dispatch(clearBooking()),
  };
}
