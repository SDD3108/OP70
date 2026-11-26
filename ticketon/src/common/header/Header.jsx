"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, UserRound, X } from "lucide-react";
import { MAIN_NAVIGATION } from "@/src/datas/navigation";
import { useAuth } from "@/src/hooks/useAuth";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();

  function isActive(href) {
    return href == "/" ? pathname == "/" : pathname?.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8E9EC] bg-white text-[#202124] shadow-sm">
      <div className="mx-auto flex min-h-[78px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setMenuOpen(false)}
          aria-label="Ticketon — на главную"
        >
          <Image
            src="/Logo.png"
            alt="Ticketon"
            width={46}
            height={46}
            priority
            className="h-11 w-11 object-contain"
          />
          <span className="text-xl font-extrabold tracking-tight text-[#202124] sm:text-2xl">
            Ticketon
          </span>
        </Link>

        <nav
          aria-label="Основная навигация"
          className="hidden items-center gap-1 md:flex"
        >
          {MAIN_NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-[#FFF0EF] text-[#E53935]"
                  : "text-[#555961] hover:bg-[#F5F6F8] hover:text-[#202124]"
              }`}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/search"
            aria-label="Поиск мероприятий"
            className="rounded-lg p-2 text-[#777B84] transition-colors hover:bg-[#F5F6F8] hover:text-[#E53935]"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </Link>

          {isAuthenticated ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 rounded-lg border border-[#E8E9EC] px-4 py-2.5 text-sm font-semibold text-[#202124] transition-colors hover:border-[#E53935] hover:bg-[#FFF8F7]"
            >
              <UserRound
                className="h-4 w-4 text-[#E53935]"
                aria-hidden="true"
              />
              <span className="max-w-32 truncate">
                {user?.name || user?.email || "Профиль"}
              </span>
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-[#555961] transition-colors hover:text-[#E53935]"
              >
                Войти
              </Link>

              <Link
                href="/registration"
                className="rounded-lg bg-[#E53935] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#C62828]"
              >
                Регистрация
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#E8E9EC] text-[#202124] transition-colors hover:bg-[#F5F6F8] md:hidden"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Мобильная навигация"
          className="border-t border-[#E8E9EC] bg-white px-4 py-4 md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {MAIN_NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-[#FFF0EF] text-[#E53935]"
                    : "text-[#555961] hover:bg-[#F5F6F8]"
                }`}
              >
                {item.title}
              </Link>
            ))}

            <div className="my-2 h-px bg-[#E8E9EC]" />

            {isAuthenticated ? (
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3 font-medium text-[#E53935] hover:bg-[#FFF0EF]"
              >
                Личный кабинет
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-[#555961] hover:bg-[#F5F6F8]"
                >
                  Войти
                </Link>

                <Link
                  href="/registration"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg bg-[#E53935] px-4 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-[#C62828]"
                >
                  Регистрация
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;