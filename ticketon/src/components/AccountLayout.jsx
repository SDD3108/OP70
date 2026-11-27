"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRound, Ticket, Settings } from "lucide-react";
import { useAuth } from "@/src/hooks/useAuth";
import { buttonVariants } from "@/src/ui/button";
import { accountLinks } from "@/src/datas/site";
import LoadingSpinner from "@/src/components/shared/LoadingSpinner";

const AccountLayout = ({title, children})=>{
  const { user, isLoading } = useAuth()
  const pathname = usePathname()
  const links = [{ title: "Личный кабинет", href: "/settings" }, ...accountLinks]
  const icons = [Settings, UserRound, Ticket]

  if(isLoading){
    return (<LoadingSpinner />)
  }
  if(!user){
    return (
      <div className="mx-auto max-w-md space-y-4 px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Войдите в аккаунт</h1>
        <p className="text-muted-foreground">Здесь будут ваш профиль и билеты.</p>
        <Link href="/signin" className={buttonVariants({size:"lg"})}>Войти</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
      <div className="grid items-start gap-6 md:grid-cols-[230px_1fr]">
        <nav className="flex flex-col gap-1 rounded-2xl border p-3">
          {links.map((link,i) => { const Icon = icons[i]; return <Link key={link.href} href={link.href} className={buttonVariants({variant:pathname === link.href ? "default" : "ghost", className:"justify-start rounded-xl"})}><Icon />{link.title}</Link>; })}
        </nav>
        <section className="min-w-0">{children}</section>
      </div>
    </div>
  );
};

export default AccountLayout;
