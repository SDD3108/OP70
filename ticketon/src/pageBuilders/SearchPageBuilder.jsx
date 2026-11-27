import EventsCatalog from "@/src/feature/events/EventsCatalog";

const SearchPageBuilder = ({search = ""})=>{
    return (
        <>
            <EventsCatalog key={search} search={search} title="Поиск мероприятий"/>
        </>
    )
}

export default SearchPageBuilder;
