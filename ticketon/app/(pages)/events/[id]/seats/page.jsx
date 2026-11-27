import { notFound } from "next/navigation";
import { events } from "@/src/datas/events";
import { hasSeats } from "@/src/datas/booking";
import SeatsPageBuilder from "@/src/pageBuilders/SeatsPageBuilder";

export const generateStaticParams = () => events.filter(hasSeats).map((event) => ({id:event.id}));

const SeatsPage = async({params})=>{
  const {id} = await params;
  const event = events.find((item) => item.id == id);
  if(!event || !hasSeats(event)){
    notFound();
  }
  return <SeatsPageBuilder event={event} />;
}

export default SeatsPage;
