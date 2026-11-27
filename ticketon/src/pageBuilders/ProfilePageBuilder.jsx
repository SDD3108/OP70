"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserRound, LogOut } from "lucide-react";
import AccountLayout from "@/src/components/AccountLayout";
import { useAuth } from "@/src/hooks/useAuth";
import { Card, CardHeader, CardContent, CardTitle } from "@/src/ui/card";
import { Button, buttonVariants } from "@/src/ui/button";
import { Input } from "@/src/ui/input";
import { Label } from "@/src/ui/label";

const ProfilePageBuilder = ()=>{
  const { user, logout } = useAuth()
  const router = useRouter()
  const exit = async()=>{
    await logout()
    router.push("/")
  }

  return (
    <AccountLayout title="Мой профиль">
      {user && (
        <Card className="max-w-xl rounded-2xl border shadow-none">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="grid size-16 place-items-center rounded-full bg-accent text-primary">
                <UserRound className="size-8" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">{user.name}</CardTitle>
                <p className="text-sm text-muted-foreground">Демо-аккаунт</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profile-name">Имя</Label>
              <Input id="profile-name" value={user.name} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-email">Email</Label>
              <Input id="profile-email" value={user.email} readOnly />
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <Link href="/settings/tickets" className={buttonVariants()}>
                Мои билеты
              </Link>
              <Button variant="outline" onClick={exit}>
                <LogOut />
                Выйти
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </AccountLayout>
  );
};

export default ProfilePageBuilder;
