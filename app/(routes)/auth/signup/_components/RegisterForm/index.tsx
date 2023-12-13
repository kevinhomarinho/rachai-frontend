"use client";

import { UserManager } from "@classes/APIManager/UserManager";
import { SignUpBody } from "@classes/APIManager/base/types/RequestBody.types";
import { apiErrors } from "@constants/apiErrors";
import { useRouter } from "next/navigation";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Text } from "@components/Text";
import React, { useRef, useState } from "react";
import styles from "./RegisterForm.module.css";
import Image from "next/image";
import Link from "next/link";

export const RegisterForm = () => {
  const [tryingToRegister, setTryingToRegister] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const register = async ({ email, password, ra, username }: SignUpBody) => {
    const response = await UserManager.signUp({
      email, password, ra, username
    });

    if (response && response!.error!) {
      setTryingToRegister(false);
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
    if (tryingToRegister) return;
    setTryingToRegister(true);

    const formData = new FormData(formRef.current || e.currentTarget);

    const username = formData.get("username")?.valueOf() as string;
    const password = formData.get("password")?.valueOf() as string;
    const email = formData.get("email")?.valueOf() as string;
    const ra = formData.get("ra")?.valueOf() as string;

    // validações
    // if (password !== confirmPassword) {
    //   setTryingToRegister(false);
    //   window.alert("É necessário que .");
    //   return;
    // } else if (!acceptedTerms) {
    //   setTryingToRegister(false);
    //   window.alert("Você precisa aceitar os termos se quiser fazer parte do Gamix!");
    //   return;
    // }
    register({ username, password, email, ra });
  };

  return (
    <form className={styles.register_area} onSubmit={handleSubmit} ref={formRef}>
      <Image src="/imagens/logo-no-bg.png" alt="logo" width={250} height={146} />
      <Text asChild><h2 className={styles.register_title}>Registro</h2></Text>
      <div className={styles.register_fields}>
        <Input type="text" name="username" placeholder="Digite seu nome de usuário" />
        <Input type="text" name="ra" placeholder="Digite seu RA" />
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
      </div>
      <Button type="submit">Registrar-se</Button>
      <Text size="xxs" asChild><Link href="/auth/signin">Já tem uma conta?</Link></Text>
    </form>
  );
};