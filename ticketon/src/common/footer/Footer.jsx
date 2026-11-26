import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import {
  FOOTER_INFORMATION,
  FOOTER_NAVIGATION,
} from "@/src/datas/navigation";

const Footer = () => {
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;

  return (
    <footer className="mt-16 border-t border-[#E8E9EC] bg-[#F5F6F8] text-[#202124]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/Logo.png"
                alt="Ticketon"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />

              <span className="text-2xl font-extrabold tracking-tight text-[#202124]">
                Ticketon
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-[#777B84]">
              Ticketon — удобная платформа для поиска мероприятий и
              бронирования билетов. Находите интересные события и планируйте
              свой досуг вместе с нами.
            </p>

            {supportEmail && (
              <a
                href={`mailto:${supportEmail}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#555961] transition-colors hover:text-[#E53935]"
              >
                <Mail className="h-4 w-4 text-[#E53935]" aria-hidden="true" />
                {supportEmail}
              </a>
            )}
          </div>

          <div>
            <h2 className="mb-5 text-sm font-bold text-[#202124]">
              Навигация
            </h2>

            <ul className="space-y-3">
              {FOOTER_NAVIGATION.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#777B84] transition-colors hover:text-[#E53935]"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-5 text-sm font-bold text-[#202124]">
              Информация
            </h2>

            <ul className="space-y-3">
              {FOOTER_INFORMATION.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 text-sm text-[#777B84] transition-colors hover:text-[#E53935]"
                  >
                    {item.title}
                    <ArrowUpRight
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[#E1E3E7] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-xs text-[#777B84]">
            <MapPin className="h-4 w-4 text-[#E53935]" aria-hidden="true" />
            Казахстан
          </div>

          <span className="text-xs text-[#777B84]">
            © 2026 Ticketon. Все права защищены.
          </span>

          <span className="text-xs text-[#777B84]">
            Платформа онлайн-бронирования билетов
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;