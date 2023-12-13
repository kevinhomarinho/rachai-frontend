import type { BackendRoutes } from "./types/BackendRoutes.types";
import { CookieManager } from "@classes/CookieManager";

export class APIManager {
  protected static async request<U extends BackendRoutes>(
    url: U,
    body: string | FormData,
    headers: HeadersInit = {},
    useServer: { useServer: boolean },
    method: string = "POST"
  ): Promise<Response> {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}${url}`, {
      method: method,
      headers: headers,
      body: body,
    });

    const authorization = response.headers.get("Authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
      const accessToken = authorization.substring(7);
      CookieManager.set(accessToken, useServer);
    }

    return response;
  }

  protected static async handleResponse<T>(response: Response, useServer: { useServer: boolean }): Promise<void | T | { error: string; message: string; }> {
    if (response.status === 401) {
      this.signOut(useServer);
      if (window) window.location.href = "/auth/signin";
      return;
    }

    return await response.json();
  }

  public static async signOut({ useServer }: { useServer: boolean } = { useServer: false }): Promise<void> {
    const accessToken = CookieManager.get({ useServer });
    if (accessToken) CookieManager.delete({ useServer });
  }
}