import { UpdateUserBody } from "./RequestBody.types";

type NonNullableFields<T> = {
  [K in keyof T]-?: NonNullable<T[K]>;
};

export type ResponseUserBody = NonNullableFields<Omit<UpdateUserBody, "imagem_perfil"> & { email: string; imagem_perfil: string; }>;