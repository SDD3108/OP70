import Link from "next/link";
import { ArrowUpRight, Mail, Ticket } from "lucide-react";
import { BRAND_NAME, FOOTER_INFORMATION, FOOTER_NAVIGATION } from "@/src/datas/navigation";

const Footer = ()=>{
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;

  return (
    <footer className="border-t border-zinc-800 bg-[#141414] text-zinc-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="sm:col-span-2 lg:col-span-2">
          <Link href="/" className="inline-flex items-center gap-3 text-white">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00e35b] text-black"><Ticket className="h-6 w-6" aria-hidden="true" /></span>
            <span className="text-2xl font-bold">{BRAND_NAME}</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-zinc-400">
            Удобный поиск мероприятий и бронирование билетов в одном месте.
          </p>
          {supportEmail && (
            <a href={`mailto:${supportEmail}`} className="mt-5 inline-flex items-center gap-2 text-sm text-white hover:text-[#00e35b]">
              <Mail className="h-4 w-4" aria-hidden="true" /> {supportEmail}
            </a>
          )}
        </div>
        <div>
          <h2 className="mb-5 font-bold text-white">Навигация</h2>
          <ul className="space-y-3 text-sm">
            {FOOTER_NAVIGATION.map((item) => (
              <li key={item.href}><Link className="transition-colors hover:text-[#00e35b]" href={item.href}>{item.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-5 font-bold text-white">Информация</h2>
          <ul className="space-y-3 text-sm">
            {FOOTER_INFORMATION.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex items-center gap-1 transition-colors hover:text-[#00e35b]">
                  {item.title}<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-800">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-4 py-6 text-xs text-zinc-500 sm:flex-row sm:px-6 lg:px-8">
          <span>© {new Date().getFullYear()} {BRAND_NAME}. Все права защищены.</span>
          <span>Платформа онлайн-бронирования билетов</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer