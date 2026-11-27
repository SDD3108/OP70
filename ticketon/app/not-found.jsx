import Link from "next/link";
import { buttonVariants } from "@/src/ui/button";

export default function NotFound() {
  return <div className="mx-auto max-w-lg space-y-4 px-4 py-24 text-center"><p className="text-6xl font-black text-primary">404</p><h1 className="text-2xl font-bold">Страница не найдена</h1><Link href="/events" className={buttonVariants()}>Вернуться к афише</Link></div>;
}
