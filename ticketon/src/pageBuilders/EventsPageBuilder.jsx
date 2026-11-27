import EventsCatalog from "@/src/feature/events/EventsCatalog";

const EventsPageBuilder = ({category = "", date = ""})=>{
    return (
        <>
            <EventsCatalog category={category} date={date} />
        </>
    )
}

export default EventsPageBuilder;
