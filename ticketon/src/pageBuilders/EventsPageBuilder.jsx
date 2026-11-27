import EventsCatalog from "@/src/feature/events/EventsCatalog";

const EventsPageBuilder = ({category = "", date = ""})=>{
    return (
        <>
            <EventsCatalog key={`${category}-${date}`} category={category} initialDate={date}/>
        </>
    )
}

export default EventsPageBuilder;
