import type { SignInBody, SignUpBody, UpdateUserBody } from "@classes/APIManager/base/types/RequestBody.types";
import { APIManager } from "@classes/APIManager/base";
import { apiErrors } from "@constants/apiErrors";

export class UserManager extends APIManager {
  public static async signUp(signUpBody: SignUpBody): Promise<void | { error?: string; message?: string; }> {
    const response = await APIManager.request(
      "/user/signup", JSON.stringify(signUpBody),
      { "Content-Type": "application/json" },
      { useServer: false }
    );
    if (response!.status !== 200) {
      const { error, message } = await response!.json() as { error?: string; message?: string; };
      if (apiErrors.includes(error!)) return { error, message };
    }
  }

  public static async signIn(signInBody: SignInBody): Promise<void | { error?: string; message?: string; }> {
    const response = await APIManager.request(
      "/user/signin", JSON.stringify(signInBody),
      { "Content-Type": "application/json" }, { useServer: false }
    );

    if (response!.status !== 200) {
      const { error, message } = await response!.json() as { error?: string; message?: string; };
      if (apiErrors.includes(error!)) return { error, message };
    }
  }

  public static async update(
    updateUserBody: UpdateUserBody,
    useServer: { useServer: boolean } = { useServer: false }
  ): Promise<void | { error?: string; message?: string; }> {
    const formData = new FormData();
    formData.append("imagem_perfil", JSON.stringify(updateUserBody.imagem_perfil));
    formData.append("motorista", JSON.stringify(updateUserBody.motorista));
    formData.append("horarios", JSON.stringify(updateUserBody.horarios));
    formData.append("username", JSON.stringify(updateUserBody.username));
    formData.append("destino", JSON.stringify(updateUserBody.destino));
    formData.append("origem", JSON.stringify(updateUserBody.origem));

    const response = await APIManager.request("/user/update", formData, {}, useServer, "PATCH");

    if (response!.status !== 200) {
      const { error, message } = await response!.json() as { error?: string; message?: string; };
      if (apiErrors.includes(error!)) return { error, message };
    }
  }

  public static async delete(useServer: { useServer: boolean } = { useServer: false }): Promise<void | { error?: string; message?: string; }> {
    const response = await APIManager.request("/user/delete", "", {}, useServer, "DELETE");

    if (response!.status !== 200) {
      const { error, message } = await response!.json() as { error?: string; message?: string; };
      if (apiErrors.includes(error!)) return { error, message };
    }
  }
}