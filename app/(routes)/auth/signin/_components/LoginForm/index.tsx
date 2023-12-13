"use client";

import { UserManager } from "@classes/APIManager/UserManager";
import { SignInBody } from "@classes/APIManager/base/types/RequestBody.types";
import { apiErrors } from "@constants/apiErrors";
import { useRouter } from "next/navigation";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Text } from "@components/Text";
import React, { useRef, useState } from "react";
import styles from "../../../signup/_components/RegisterForm/RegisterForm.module.css";
import Image from "next/image";
import Link from "next/link";

export const LoginForm = () => {
  const [tryingToLogin, setTryingToLogin] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const login = async ({ email, password }: SignInBody) => {
    const response = await UserManager.signIn({
      email, password
    });

    if (response && response!.error!) {
      setTryingToLogin(false);
      if (response && apiErrors.includes(response.error!)) {
        window.alert(response.message!);
        return;
      }
      window.alert("Erro ao se registrar");
      return;
    }

    router.push("/");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tryingToLogin) return;
    setTryingToLogin(true);

    const formData = new FormData(formRef.current || e.currentTarget);

    const password = formData.get("password")?.valueOf() as string;
    const email = formData.get("email")?.valueOf() as string;

    // validações
    // if (password !== confirmPassword) {
    //   setTryingToLogin(false);
    //   window.alert("É necessário que .");
    //   return;
    // } else if (!acceptedTerms) {
    //   setTryingToLogin(false);
    //   window.alert("Você precisa aceitar os termos se quiser fazer parte do Gamix!");
    //   return;
    // }

    login({ email, password });
  };
  return (
    <form className={styles.register_area} onSubmit={handleSubmit} ref={formRef}>
      <Image src="/imagens/logo-no-bg.png" alt="logo" width={250} height={146} priority />
      <Text asChild><h2 className={styles.register_title}>Login</h2></Text>
      <div className={styles.register_fields}>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
      </div>
      <Button type="submit">Conectar-se</Button>
      <Text size="xxs" asChild><Link href="/auth/signup">Ainda não tem uma conta?</Link></Text>
    </form>
  );
};