import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AccountLayout from "@/src/components/AccountLayout";
import { accountLinks } from "@/src/datas/site";
import { Card, CardHeader, CardTitle, CardDescription } from "@/src/ui/card";

const SettingsPageBuilder = () => (
  <AccountLayout title="Личный кабинет">
    <div className="grid gap-4 sm:grid-cols-2">
      {accountLinks.map((link) => (
        <Link key={link.href} href={link.href}>
          <Card className="h-full rounded-2xl border shadow-none transition hover:border-primary">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg font-bold">
                {link.title}
                <ArrowUpRight className="size-4 text-primary" />
              </CardTitle>
              <CardDescription>{link.description}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  </AccountLayout>
);

export default SettingsPageBuilder;
