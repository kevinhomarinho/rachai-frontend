export type RequestBody<U> = 
  U extends "/user/signup" ? SignUpBody
  : U extends "/user/signin" ? SignInBody
  : undefined;

export type SignUpBody = {
  username: string;
  password: string;
  email: string;
  ra: string;
};

export type SignInBody = {
  password: string;
  email: string;
};

export type UpdateUserBody = {
  username?: string;
  origem?: string;
  destino?: string;
  horarios?: string;
  imagem_perfil?: Blob;
  motorista?: boolean;
}