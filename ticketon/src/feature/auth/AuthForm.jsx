"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useAuth } from "@/src/hooks/useAuth";
import { validateAuthForm } from "@/src/utils/validators";

export default function AuthForm({ mode = "login" }) {
  const isRegister = mode == "register";
  const router = useRouter();
  const { login, register, isLoading, error } = useAuth();
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  function updateField(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateAuthForm(values, isRegister ? "register" : "login");
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    const request = isRegister ? register(values) : login({ email: values.email, password: values.password });
    request.then(() => {
      router.push("/profile");
      router.refresh();
    }).catch(console.error);
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-2xl font-extrabold text-zinc-950">{isRegister ? "Создать аккаунт" : "С возвращением!"}</h1>
      <p className="mt-2 text-sm text-zinc-500">{isRegister ? "Зарегистрируйтесь, чтобы бронировать билеты." : "Войдите, чтобы управлять своими билетами."}</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
        {isRegister && (
          <label className="block text-sm font-semibold text-zinc-800">
            Имя
            <input autoComplete="name" value={values.name} onChange={(e) => updateField("name", e.target.value)} className="mt-2 w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-emerald-500" placeholder="Ваше имя" />
            {errors.name && <span className="mt-1 block text-xs text-red-600">{errors.name}</span>}
          </label>
        )}
        <label className="block text-sm font-semibold text-zinc-800">
          Email
          <input type="email" autoComplete="email" value={values.email} onChange={(e) => updateField("email", e.target.value)} className="mt-2 w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-emerald-500" placeholder="you@example.com" />
          {errors.email && <span className="mt-1 block text-xs text-red-600">{errors.email}</span>}
        </label>
        <label className="block text-sm font-semibold text-zinc-800">
          Пароль
          <span className="relative mt-2 block">
            <input type={showPassword ? "text" : "password"} autoComplete={isRegister ? "new-password" : "current-password"} value={values.password} onChange={(e) => updateField("password", e.target.value)} className="w-full rounded-lg border border-zinc-300 px-4 py-3 pr-12 outline-none focus:border-emerald-500" placeholder={isRegister ? "Минимум 8 символов" : "Введите пароль"} />
            <button type="button" className="absolute inset-y-0 right-3 flex items-center text-zinc-500" aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"} onClick={() => setShowPassword((value) => !value)}>
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </span>
          {errors.password && <span className="mt-1 block text-xs text-red-600">{errors.password}</span>}
        </label>
        {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <button disabled={isLoading} type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#00e35b] px-5 py-3 font-bold text-black hover:bg-[#00c94f] disabled:opacity-50">
          {isLoading && <LoaderCircle className="h-4 w-4 animate-spin" />} {isRegister ? "Зарегистрироваться" : "Войти"}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-zinc-500">
        {isRegister ? "Уже есть аккаунт?" : "Нет аккаунта?"} {" "}
        <Link className="font-bold text-emerald-700 hover:underline" href={isRegister ? "/login" : "/registration"}>
          {isRegister ? "Войти" : "Регистрация"}
        </Link>
      </p>
    </div>
  );
}
