"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCartSummary, hasSeats, maxTickets, promoCodes } from "@/src/datas/booking";
import { events } from "@/src/datas/events";
import { readStorage, writeStorage } from "@/src/utils/localStorage";

const CartContext = createContext(null)
const key = "ticketon-cart"
const initial = {items: [], promo: ""}

export const useCart = () => useContext(CartContext)

const CartProvider = ({children})=>{
    const [cart, setCart] = useState(initial);
    const [ready, setReady] = useState(false);
    useEffect(()=>{
        const load = ()=>{
            const data = readStorage(key, initial);
            setCart(data && Array.isArray(data.items) ? data : initial);
            setReady(true);
        }
        Promise.resolve().then(load)
        const sync = (event)=>{
            if(event.key == key || event.key == null){
                load()
            }
        }
        window.addEventListener("storage",sync)
        return () => window.removeEventListener("storage",sync)
    },[])
    const update = (data)=>{
        writeStorage(key,data)
        setCart(data)
    }
    const add = (eventId, quantity, seats = [])=>{
        const item = {eventId, quantity, seats}
        update({...cart, items: [...cart.items.filter((item) => item.eventId != eventId), item]})
    }
    const remove = (eventId) => update({...cart, items: cart.items.filter((item) => item.eventId != eventId)})
    const changeQuantity = (eventId, quantity)=>{
        const event = events.find((item) => item.id == eventId)
        if(!event || hasSeats(event) || !Number.isInteger(quantity) || quantity < 1 || quantity > maxTickets){
            return
        }
        update({...cart, items: cart.items.map((item) => item.eventId == eventId ? {...item, quantity} : item)});
    }
    const removeSeat = (eventId, seat)=>{
        const item = cart.items.find((item) => item.eventId == eventId);
        if(!item){
            return
        }
        const seats = item.seats.filter((value) => value != seat);
        if(!seats.length){
            remove(eventId);
        }
        else{
            add(eventId, seats.length, seats)
        }
    }
    const applyPromo = (value)=>{
        const promo = value.trim().toUpperCase()
        if(promo && !Object.hasOwn(promoCodes, promo)){
            return false;
        }
        update({...cart, promo});
        return true
    }
    const clear = () => update(initial)
    const summary = getCartSummary(cart.items,cart.promo)

    return (
        <CartContext.Provider value={{...cart, ...summary, ready, add, remove, changeQuantity, removeSeat, applyPromo, clear}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider