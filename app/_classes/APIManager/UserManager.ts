import type { SignInBody, SignUpBody, UpdateUserBody } from "@classes/APIManager/base/types/RequestBody.types";
import { ResponseUserBody } from "./base/types/ResponseBody.types";
import { CookieManager } from "../CookieManager";
import { APIManager } from "@classes/APIManager/base";

export class UserManager extends APIManager {
  public static async signUp(signUpBody: SignUpBody): Promise<void | { error?: string; message?: string; }> {
    const response = await this.request(
      "/user/signup", { "Content-Type": "application/json" }, { useServer: false }, JSON.stringify(signUpBody)
    );
    return await this.handleResponse(response);
  }

  public static async signIn(signInBody: SignInBody): Promise<void | { error?: string; message?: string; }> {
    const response = await this.request(
      "/user/signin", { "Content-Type": "application/json" }, { useServer: false }, JSON.stringify(signInBody)
    );
    return await this.handleResponse(response);
  }

  public static async update(updateUserBody: UpdateUserBody): Promise<void | { error?: string; message?: string; }> {
    const formData = new FormData();

    for (const key of Object.keys(updateUserBody)) {
      formData.append(key, updateUserBody[key as keyof typeof updateUserBody]!);
    }

    const headers = { Authorization: `Bearer ${await CookieManager.get({ useServer: false })}` };
    const response = await this.request("/user/update", headers, { useServer: false }, formData, "PATCH");

    return await this.handleResponse(response);
  }

  public static async delete(): Promise<void | { error?: string; message?: string; }> {
    const headers = { Authorization: `Bearer ${await CookieManager.get({ useServer: false })}` };
    const response = await this.request("/user/delete", headers, { useServer: false }, undefined, "DELETE");
    return await this.handleResponse(response);
  }

  public static async findUserByToken(useServer: { useServer: boolean; url?: string; } = { useServer: false }): Promise<ResponseUserBody | undefined> {
    const headers = { Authorization: `Bearer ${await CookieManager.get(useServer)}` };
    const response = await this.request("/user/read", headers, useServer, undefined, "GET");
    console.log(useServer);
    return await this.handleResponse(response, useServer);
  }
}