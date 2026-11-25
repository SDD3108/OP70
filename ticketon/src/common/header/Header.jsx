"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, Ticket, UserRound, X } from "lucide-react";
import { BRAND_NAME, MAIN_NAVIGATION } from "@/src/datas/navigation";
import { useAuth } from "@/src/hooks/useAuth";

const Header = ()=>{
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();

  function isActive(href) {
    return href === "/" ? pathname === "/" : pathname?.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#171717] text-white shadow-lg shadow-black/10">
      <div className="mx-auto flex min-h-[78px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)} aria-label={`${BRAND_NAME} — на главную`}>
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00e35b] text-[#111]">
            <Ticket className="h-6 w-6" aria-hidden="true" />
          </span>
          <span className="text-xl font-extrabold tracking-tight sm:text-2xl">{BRAND_NAME}</span>
        </Link>

        <nav aria-label="Основная навигация" className="hidden items-center gap-1 md:flex">
          {MAIN_NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive(item.href) ? "bg-white/10 text-[#00e35b]" : "text-zinc-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/search" aria-label="Поиск мероприятий" className="rounded-lg p-2 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white">
            <Search className="h-5 w-5" aria-hidden="true" />
          </Link>
          {isAuthenticated ? (
            <Link href="/profile" className="flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-zinc-800">
              <UserRound className="h-4 w-4 text-[#00e35b]" aria-hidden="true" />
              <span className="max-w-32 truncate">{user?.name || user?.email || "Профиль"}</span>
            </Link>
          ) : (
            <>
              <Link href="/login" className="rounded-lg px-3 py-2.5 text-sm font-semibold text-zinc-200 hover:text-white">Войти</Link>
              <Link href="/registration" className="rounded-lg bg-[#00e35b] px-4 py-2.5 text-sm font-bold text-[#111] transition-colors hover:bg-[#00c94f]">Регистрация</Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-700 md:hidden"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-navigation" aria-label="Мобильная навигация" className="border-t border-zinc-800 px-4 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {MAIN_NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-medium ${isActive(item.href) ? "bg-zinc-800 text-[#00e35b]" : "text-zinc-200 hover:bg-zinc-800"}`}
              >
                {item.title}
              </Link>
            ))}
            <div className="my-2 h-px bg-zinc-800" />
            {isAuthenticated ? (
              <Link href="/profile" onClick={() => setMenuOpen(false)} className="rounded-lg px-4 py-3 font-medium text-[#00e35b]">Личный кабинет</Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)} className="rounded-lg px-4 py-3 text-sm font-medium">Войти</Link>
                <Link href="/registration" onClick={() => setMenuOpen(false)} className="rounded-lg bg-[#00e35b] px-4 py-3 text-center text-sm font-bold text-black">Регистрация</Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header