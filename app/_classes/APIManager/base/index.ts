import type { BackendRoutes } from "./types/BackendRoutes.types";
import { CookieManager } from "@classes/CookieManager";
import { apiErrors } from "@constants/apiErrors";

export class APIManager {
  protected static async request<U extends BackendRoutes>(
    url: U,
    headers: HeadersInit = {},
    useServer: { useServer: boolean; url?: string; },
    body?: string | FormData,
    method: string = "POST"
  ): Promise<Response> {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}${url}`, {
      method: method,
      headers: headers,
      body: body,
    });

    const accessToken = response.headers.get("Authorization");
    if (accessToken && accessToken.startsWith("Bearer ")) {
      await CookieManager.set(accessToken, useServer);
    }

    return response;
  }

  protected static async handleResponse(response: Response, useServer: { useServer: boolean; url?: string; } = { useServer: false }) {
    if (response.status === 401 || response.status === 403) {
      await CookieManager.delete(useServer);
      return { error: "UNAUTHORIZED", message: "Sem autorização, volte para o login." };
    }

    if (response.status !== 200) {
      const { error, message } = await response!.json() as { error?: string; message?: string; };
      if (apiErrors.includes(error!)) return { error, message };
    }
    
    try {
      return await response.json();
    } catch {
      return undefined;
    }
  }
}