import React from 'react'
import EventsPageBuilder from '@/src/pageBuilders/EventsPageBuilder'
import { categories, dates } from "@/src/datas/events";

const EventsPage = async({searchParams}) => {
  const { category, date } = await searchParams;
  return (
    <>
      <EventsPageBuilder category={categories.includes(category) ? category : ""} date={dates.includes(date) ? date : ""}/>
    </>
  )
}

export default EventsPage
