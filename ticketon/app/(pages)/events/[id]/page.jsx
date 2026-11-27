import React from 'react'
import EventPageBuilder from '@/src/pageBuilders/EventPageBuilder'
import { notFound } from "next/navigation";
import { events } from "@/src/datas/events";

export const generateStaticParams = ()=>{
  return events.map((event) => ({ id: event.id }));
}

const EventPage = async({params}) => {
  const { id } = await params;
  const event = events.find((item) => item.id == id);
  if(!event){
    notFound();
  }

  return (
    <>
      <EventPageBuilder event={event}/>
    </>
  )
}

export default EventPage
