import Link from "next/link";
import { Film, Music, Drama, Mic, Trophy, Palette } from "lucide-react";
import { categories } from "@/src/datas/events";

const CategoryBar = ()=>{
  const icons = [Film, Music, Drama, Mic, Trophy, Palette]
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
      {categories.map((category, i) => {
        const Icon = icons[i];
        return (
          <Link key={category} href={`/events?category=${encodeURIComponent(category)}`} className="group flex flex-col items-center gap-2 rounded-2xl border bg-white p-4 text-sm font-semibold transition  hover:border-primary hover:bg-accent hover:text-primary">
            <Icon className="size-6 text-primary"/>  {category}
          </Link>
        )
      })}
    </div>
  )
};

export default CategoryBar;
