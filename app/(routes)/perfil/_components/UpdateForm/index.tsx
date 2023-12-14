"use client";

import type { ResponseUserBody } from "@classes/APIManager/base/types/ResponseBody.types";
import type { UpdateUserBody } from "@classes/APIManager/base/types/RequestBody.types";
import { DeleteUserModal } from "../DeleteUserModal";
import { CookieManager } from "@classes/CookieManager";
import { SelectImage } from "../SelectImage";
import { UserManager } from "@classes/APIManager/UserManager";
import { useRouter } from "next/navigation";
import { apiErrors } from "@constants/apiErrors";
import { Selector } from "../Selector";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import React, { useEffect, useRef, useState } from "react";
import styles from "./UpdateForm.module.css";
import { alphanumericCharactersOnly } from "@/app/_functions/validations";

export const UpdateForm = () => {
  const [tryingToUpdate, setTryingToUpdate] = useState(false);
  const [tryingToDelete, setTryingToDelete] = useState(false);
  const [user, setUser] = useState<ResponseUserBody | null>(null);
  const [userImage, setUserImage] = useState<{ file?: File; url: string; } | undefined>(undefined);
  const [value, setValue] = useState<"driver" | "passenger">("passenger");
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const getUser = async () => {
    const userFromToken = await UserManager.findUserByToken() as ResponseUserBody & { error?: string; message?: string; };
    if (!userFromToken || userFromToken.error === "UNAUTHORIZED") {
      await CookieManager.delete({ useServer: false });
      return router.push("/auth/signin");
    }
    setUserImage(userFromToken.imagem_perfil ? { 
      url: `${process.env["NEXT_PUBLIC_BACKEND_URL"]}/${userFromToken.imagem_perfil}`
    } : undefined);
    setValue(JSON.parse(userFromToken.motorista) ? "driver" : "passenger");
    setUser(userFromToken);
  };

  useEffect(() => { getUser(); }, []);

  if (!user) return null;

  const deleteAccount = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (tryingToDelete) return;
    setTryingToDelete(true);
    await UserManager.delete();
    await CookieManager.delete({ useServer: false });
    setTryingToDelete(false);
    router.push("/auth/signin");
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
    
    if (updateUserBody["username"]) {
      if (updateUserBody["username"].length < 3) {
        setTryingToUpdate(false);
        window.alert("O nome de usuário deve conter no mínimo 3 caracteres.");
        return;
      } else if (updateUserBody["username"].length > 50) {
        setTryingToUpdate(false);
        window.alert("O nome de usuário deve conter no máximo 50 caracteres.");
        return;
      } else if (!alphanumericCharactersOnly(updateUserBody["username"])) {
        setTryingToUpdate(false);
        window.alert("O nome de usuário pode conter apenas caracteres alfanuméricos.");
        return;
      }
    }
    if (updateUserBody["horarios"]) {
      if (updateUserBody["horarios"].length < 3) {
        setTryingToUpdate(false);
        window.alert("Os horários devem conter no mínimo 3 caracteres.");
        return;
      } else if (updateUserBody["horarios"].length > 100) {
        setTryingToUpdate(false);
        window.alert("Os horários devem conter no máximo 100 caracteres.");
        return;
      }
    }
    if (updateUserBody["imagem_perfil"]) {
      if (updateUserBody["imagem_perfil"].size > 1000000) {
        window.alert("O tamanho máximo permitido é de 1MB.");
        return;
      } else if (!["image/jpeg", "image/png", "image/webp"].includes(updateUserBody["imagem_perfil"].type)) {
        setTryingToUpdate(false);
        window.alert("Apenas aceitamos os formatos de imagem: \".jpeg, .jpg, .png e .webp\".");
        return;
      }
    }

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
        <DeleteUserModal handleDeleteAccount={deleteAccount}>
          <Button type="button">Deletar conta</Button>
        </DeleteUserModal>
        <Button type="submit" color="secondary">Atualizar</Button>
      </div>
    </form>
  );
};