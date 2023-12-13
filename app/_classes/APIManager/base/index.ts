import type { BackendRoutes } from "./types/BackendRoutes.types";
import { CookieManager } from "@classes/CookieManager";

export class APIManager {
  protected static async request<U extends BackendRoutes>(
    url: U,
    headers: HeadersInit = {},
    useServer: { useServer: boolean },
    body?: string | FormData,
    method: string = "POST"
  ): Promise<Response | void> {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}${url}`, {
      method: method,
      headers: headers,
      body: body,
    });

    if (response.status === 401) return this.signOut(useServer);

    const authorization = response.headers.get("Authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
      const accessToken = authorization.substring(7);
      CookieManager.set(accessToken, useServer);
    }

    return response;
  }

  public static async signOut({ useServer }: { useServer: boolean } = { useServer: false }): Promise<void> {
    const accessToken = CookieManager.get({ useServer });
    if (accessToken) CookieManager.delete({ useServer });
  }
}