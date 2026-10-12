"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { Button, Input } from "@/shared/ui/index.ui";

import scss from "./page.module.scss";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      setPending(false);
      setError("Неверная почта или пароль");
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className={scss["sign-in"]}>
      <form className={scss["sign-in__form"]} onSubmit={onSubmit}>
        <div className={scss["sign-in__intro"]}>
          <h1 className="h4">Вход в админку</h1>
          <p className="p2 primary-color-70">Почта и пароль от панели управления</p>
        </div>

        <Input
          label="Почта"
          typeInput="email"
          name="email"
          value={email}
          autoComplete="email"
          onChange={(event) => setEmail(event.target.value)}
        />

        <Input
          label="Пароль"
          typeInput="password"
          name="password"
          value={password}
          autoComplete="current-password"
          onChange={(event) => setPassword(event.target.value)}
        />

        {error ? <p className="p3">{error}</p> : null}

        <Button typeBtn="submit" disabled={pending}>
          <p className="p3">{pending ? "Входим..." : "Войти"}</p>
        </Button>
      </form>
    </div>
  );
}
