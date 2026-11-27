import Link from "next/link";
import { events, categories, dates } from "@/src/datas/events";
import { heroSlides } from "@/src/datas/site";
import Hero from "@/src/components/Hero";
import CategoryBar from "@/src/components/CategoryBar";
import EventRow from "@/src/components/EventRow";
import SearchBar from "@/src/components/SearchBar";
import { formatDate } from "@/src/utils/formatters";
import { buttonVariants } from "@/src/ui/button";

const MainPageBuilder = ()=>{
  const slides = heroSlides.map((id) => events.find((event) => event.id == id));

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary">Афиша Казахстана</p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Куда пойдём?
          </h2>
        </div>
        <SearchBar className="w-full sm:max-w-md"/>
      </div>
      <Hero slides={slides} />
      <CategoryBar />
      <section className="space-y-3">
        <h2 className="text-xl font-bold">Выберите дату</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Link href="/events" className={buttonVariants({variant: "default",className: "h-16 shrink-0 rounded-xl"})}>
            Все даты
          </Link>
          {dates.slice(0, 10).map((date) => (
            <Link key={date} href={`/events?date=${date}`} className={buttonVariants({variant: "outline",className: "h-16 min-w-20 shrink-0 flex-col rounded-xl"})}>
              <span className="text-xs text-muted-foreground">
                {formatDate(date, {
                  weekday: "short",
                  day: undefined,
                  month: undefined,
                })}
              </span>
              <span className="font-bold">{formatDate(date)}</span>
            </Link>
          ))}
        </div>
      </section>
      <EventRow title="Популярное сейчас" events={events.filter((event) => event.popular)}/>
      {categories.map((category) => (
        <EventRow key={category} title={category == "Кино" ? "Сейчас в кино" : category} events={events.filter((event) => event.category === category)} href={`/events?category=${encodeURIComponent(category)}`}/>
      ))}
      <section className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-secondary p-8 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold">Найди своё следующее событие</h2>
          <p className="mt-2 text-muted-foreground">
            Все мероприятия Казахстана в одном месте.
          </p>
        </div>
        <Link href="/events" className={buttonVariants({ size: "lg" })}>
          Открыть афишу
        </Link>
      </section>
      <p className="text-xs text-muted-foreground">
        Демонстрационная афиша. События, цены и изображения приведены для
        примера.
      </p>
    </div>
  );
};

export default MainPageBuilder;
