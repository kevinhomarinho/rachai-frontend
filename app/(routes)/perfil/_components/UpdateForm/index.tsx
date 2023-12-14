"use client";

import type { ResponseUserBody } from "@classes/APIManager/base/types/ResponseBody.types";
import type { UpdateUserBody } from "@classes/APIManager/base/types/RequestBody.types";
import { CookieManager } from "@classes/CookieManager";
import { SelectImage } from "../SelectImage";
import { UserManager } from "@classes/APIManager/UserManager";
import { useRouter } from "next/navigation";
import { apiErrors } from "@constants/apiErrors";
import { Selector } from "../Selector";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import React, { useRef, useState } from "react";
import styles from "./UpdateForm.module.css";

type UpdateFormProps = {
  user: ResponseUserBody;
};

export const UpdateForm = ({ user }: UpdateFormProps) => {
  const [tryingToUpdate, setTryingToUpdate] = useState(false);
  const [tryingToDelete, setTryingToDelete] = useState(false);
  const [userImage, setUserImage] = useState<{ file?: File; url: string; } | undefined>(
    user.imagem_perfil ? { 
      url: `${process.env["NEXT_PUBLIC_BACKEND_URL"]}/${user.imagem_perfil}`
    } : undefined
  );
  const [value, setValue] = useState<"driver" | "passenger">(JSON.parse(user.motorista) ? "driver" : "passenger");
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const deleteAccount = async () => {
    if (tryingToDelete) return;
    setTryingToDelete(true);
    await UserManager.delete();
    CookieManager.delete({ useServer: false });
    setTryingToDelete(false);
    router.push("/");
  };

  const updateAccount = async (updateUserBody: UpdateUserBody) => {
    const response = await UserManager.update(updateUserBody);

    if (response && response!.error!) {
      setTryingToUpdate(false);
      if (response && apiErrors.includes(response.error!)) {
        window.alert(response.message!);
        return;
      }
      window.alert("Erro ao atualizar informações do usuário.");
      return;
    }
    
    setTryingToUpdate(false);
    window.alert("Usuário atualizado com sucesso!");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tryingToUpdate) return;
    setTryingToUpdate(true);

    const formData = new FormData(formRef.current || e.currentTarget);

    const username = formData.get("username")?.valueOf() as string;
    const origem = formData.get("origem")?.valueOf() as string;
    const destino = formData.get("destino")?.valueOf() as string;
    const horarios = formData.get("horarios")?.valueOf() as string;

    const updateUserBody: UpdateUserBody = { motorista: JSON.stringify(value === "driver") };
    if (username !== "" && user.username !== username) updateUserBody["username"] = username;
    if (horarios !== "" && user.horarios !== horarios) updateUserBody["horarios"] = horarios;
    if (origem !== "" && user.origem !== origem) updateUserBody["origem"] = origem;
    if (destino !== "" && user.destino !== destino) updateUserBody["destino"] = destino;
    if (userImage && userImage.file) updateUserBody["imagem_perfil"] = userImage.file;

    updateAccount(updateUserBody);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <SelectImage image={userImage} setUserImage={setUserImage} />
      <Input type="text" defaultValue={user.username} name="username" placeholder="Digite um novo nome de usuário" />
      <Input type="text" defaultValue={user.origem} name="origem" placeholder="De onde você irá sair" />
      <Input type="text" defaultValue={user.destino} name="destino" placeholder="Para onde você vai ir" />
      <Input type="text" defaultValue={user.horarios} name="horarios" placeholder="Horários em que você está disponível" />
      <Selector value={value} setValue={setValue} />
      <div className={styles.actions}>
        <Button onClick={deleteAccount}>Deletar conta</Button>
        <Button type="submit" color="secondary">Atualizar</Button>
      </div>
    </form>
  );
};