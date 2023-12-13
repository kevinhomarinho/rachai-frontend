import { ResponseUserBody } from "./base/types/ResponseBody.types";
import { CookieManager } from "../CookieManager";
import { APIManager } from "@classes/APIManager/base";
import { apiErrors } from "@/app/_constants/apiErrors";

export class CaronasManager extends APIManager {
  public static async findAll(
    page: number, useServer: { useServer: boolean; } = { useServer: false }
  ): Promise<ResponseUserBody[] | { error?: string; message?: string; }> {
    const headers = { Authorization: `Bearer ${CookieManager.get(useServer)}` };
    const response = await APIManager.request(
      `/caronas/page=${page.toString()}&size=10`, headers, { useServer: false }, undefined, "GET"
    );

    if (response && response.status !== 200) {
      const { error, message } = await response!.json() as { error?: string; message?: string; };
      if (apiErrors.includes(error!)) return { error, message };
    }

    return await response!.json();
  }

  public static async findAllByOrigin(
    page: number, filter: string, useServer: { useServer: boolean; } = { useServer: false }
  ): Promise<ResponseUserBody[] | { error?: string; message?: string; }> {
    const headers = { Authorization: `Bearer ${CookieManager.get(useServer)}` };
    const response = await APIManager.request(
      `/caronas/origem=${filter}/page=${page.toString()}&size=10`, headers, { useServer: false }, undefined, "GET"
    );

    if (response && response.status !== 200) {
      const { error, message } = await response!.json() as { error?: string; message?: string; };
      if (apiErrors.includes(error!)) return { error, message };
    }
    
    return await response!.json();
  }
}