"use client";

import { UpdateUserBody } from "@classes/APIManager/base/types/RequestBody.types";
import { SelectImage } from "../SelectImage";
import { UserManager } from "@classes/APIManager/UserManager";
import { apiErrors } from "@constants/apiErrors";
import { Selector } from "../Selector";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import React, { useRef, useState } from "react";
import styles from "./UpdateForm.module.css";

export const UpdateForm = () => {
  const [tryingToUpdate, setTryingToUpdate] = useState(false);
  const [userImage, setUserImage] = useState<Blob | undefined>(undefined);
  const formRef = useRef<HTMLFormElement>(null);
  
  const deleteAccount = async () => {
    await UserManager.delete();
    UserManager.signOut();
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
    const driver = !!formData.get("driver")?.valueOf();

    const updateUserBody: UpdateUserBody = { motorista: driver };
    if (username !== "") updateUserBody["username"] = username;
    if (horarios !== "") updateUserBody["horarios"] = horarios;
    if (origem !== "") updateUserBody["origem"] = origem;
    if (destino !== "") updateUserBody["destino"] = destino;
    if (userImage) updateUserBody["imagem_perfil"] = userImage;

    updateAccount(updateUserBody);
  };


  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <SelectImage setUserImage={setUserImage} />
      <Input type="text" name="username" placeholder="Digite um novo nome de usuário" />
      <Input type="text" name="origem" placeholder="De onde você irá sair" />
      <Input type="text" name="destino" placeholder="Para onde você vai ir" />
      <Input type="text" name="horarios" placeholder="Horários em que você está disponível" />
      <Selector />
      <div className={styles.actions}>
        <Button onClick={deleteAccount}>Deletar conta</Button>
        <Button type="submit" color="secondary">Atualizar</Button>
      </div>
    </form>
  );
};