import type { SignInBody, SignUpBody, UpdateUserBody } from "@classes/APIManager/base/types/RequestBody.types";
import { APIManager } from "@classes/APIManager/base";
import { apiErrors } from "@constants/apiErrors";
import { CookieManager } from "../CookieManager";
import { ResponseUserBody } from "./base/types/ResponseBody.types";

export class UserManager extends APIManager {
  public static async signUp(signUpBody: SignUpBody): Promise<void | { error?: string; message?: string; }> {
    const response = await APIManager.request(
      "/user/signup", { "Content-Type": "application/json" }, { useServer: false }, JSON.stringify(signUpBody)
    );
    
    if (response && response.status >= 400) {
      const { error, message } = await response!.json() as { error?: string; message?: string; };
      if (apiErrors.includes(error!)) return { error, message };
    }
  }

  public static async signIn(signInBody: SignInBody): Promise<void | { error?: string; message?: string; }> {
    const response = await APIManager.request(
      "/user/signin", { "Content-Type": "application/json" }, { useServer: false }, JSON.stringify(signInBody)
    );

    if (response && response.status >= 400) {
      const { error, message } = await response!.json() as { error?: string; message?: string; };
      if (apiErrors.includes(error!)) return { error, message };
    }
  }

  public static async update(
    updateUserBody: UpdateUserBody,
    useServer: { useServer: boolean } = { useServer: false }
  ): Promise<void | { error?: string; message?: string; }> {
    const formData = new FormData();

    for (const key of Object.keys(updateUserBody)) {
      formData.append(key, updateUserBody[key as keyof typeof updateUserBody]!);
    }

    const headers = { Authorization: `Bearer ${CookieManager.get(useServer)}` };
    const response = await APIManager.request("/user/update", headers, useServer, formData, "PATCH");

    if (response && response.status >= 400) {
      const { error, message } = await response!.json() as { error?: string; message?: string; };
      if (apiErrors.includes(error!)) return { error, message };
    }
  }

  public static async findUserByToken(useServer: { useServer: boolean } = { useServer: false }): Promise<ResponseUserBody | undefined> {
    const headers = { Authorization: `Bearer ${CookieManager.get(useServer)}` };
    const response = await APIManager.request("/user/read", headers, useServer, undefined, "GET");
    if (response && response.status === 200) return await response!.json();
  }

  public static async delete(useServer: { useServer: boolean } = { useServer: false }): Promise<void | { error?: string; message?: string; }> {
    const headers = { Authorization: `Bearer ${CookieManager.get(useServer)}` };
    const response = await APIManager.request("/user/delete", headers, useServer, undefined, "DELETE");
    if (response && response.status >= 400) {
      const { error, message } = await response!.json() as { error?: string; message?: string; };
      if (apiErrors.includes(error!)) return { error, message };
    }
  }
}