"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/src/hooks/useAuth";
import { validateAuthForm } from "@/src/utils/validators";
import { demoUser } from "@/src/datas/site";
import { Button } from "@/src/ui/button";
import { Input } from "@/src/ui/input";
import { Label } from "@/src/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/src/ui/card";

const AuthForm = ({ mode = "login", next = "/settings/profile" }) => {
  const registerMode = mode == "register";
  const router = useRouter();
  const { login, register, isLoading, error } = useAuth();
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const redirect = next == "/checkout" ? "/checkout" : "/settings/profile";

  const change = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };
  const submit = async (event) => {
    event.preventDefault();
    const validationErrors = validateAuthForm(values, mode);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) {
      return;
    }
    try {
      await (registerMode ? register(values) : login(values));
      router.push(redirect);
    } catch (error) {}
  };
  const demo = async () => {
    try {
      await login({ email: demoUser.email });
      router.push(redirect);
    } catch (error) {}
  };

  return (
    <Card className="w-full max-w-md rounded-3xl border shadow-none">
      <CardHeader>
        <CardTitle className="text-3xl font-extrabold tracking-tight">
          {registerMode ? "Регистрация" : "С возвращением!"}
        </CardTitle>
        <CardDescription>
          {registerMode ? "Создайте демо-аккаунт Ticketon" : "Войдите, чтобы управлять билетами"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} noValidate className="space-y-4">
          {registerMode && (
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                value={values.name}
                onChange={(event) => change("name", event.target.value)}
                placeholder="Ваше имя"
                aria-invalid={Boolean(errors.name)}
                className="h-11 rounded-xl"
              />
              {errors.name && (
                <p className="text-xs text-primary">{errors.name}</p>
              )}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={values.email}
              onChange={(event) => change("email", event.target.value)}
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              className="h-11 rounded-xl"
            />
            {errors.email && (
              <p className="text-xs text-primary">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Демо-пароль</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={(event) => change("password", event.target.value)}
                placeholder="Не используйте реальный пароль"
                autoComplete="off"
                aria-invalid={Boolean(errors.password)}
                className="h-11 rounded-xl pr-12"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 top-1"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>
            {errors.password && (
              <p className="text-xs text-primary">{errors.password}</p>
            )}
          </div>
          {error && (
            <p role="alert" className="text-sm text-primary">
              {error}
            </p>
          )}
          <Button
            type="submit"
            disabled={isLoading}
            className="h-11 w-full rounded-xl"
          >
            {registerMode ? "Создать аккаунт" : "Войти"}
          </Button>
        </form>
        <Button
          type="button"
          variant="outline"
          disabled={isLoading}
          onClick={demo}
          className="mt-3 h-11 w-full rounded-xl"
        >
          Войти как демо-пользователь
        </Button>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          {registerMode ? "Уже есть аккаунт?" : "Нет аккаунта?"}{" "}
          <Link
            className="font-semibold text-primary hover:underline"
            href={`${registerMode ? "/signin" : "/signup"}${
              next == "/checkout" ? "?next=/checkout" : ""
            }`}
          >
            {registerMode ? "Войти" : "Регистрация"}
          </Link>
        </p>
        <p className="mt-4 rounded-xl bg-secondary p-3 text-xs leading-relaxed text-muted-foreground">
          Учебный режим: пароль не проверяется сервером и не сохраняется.
          Используйте вымышленные данные.
        </p>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
