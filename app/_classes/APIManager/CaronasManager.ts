import { ResponseUserBody } from "./base/types/ResponseBody.types";
import { CookieManager } from "../CookieManager";
import { APIManager } from "@classes/APIManager/base";

export class CaronasManager extends APIManager {
  public static async findAll(page: number): Promise<ResponseUserBody[] | { error?: string; message?: string; }> {
    const headers = { Authorization: `Bearer ${await CookieManager.get({ useServer: false })}` };
    const response = await this.request(
      `/caronas/page=${page.toString()}&size=10`, headers, { useServer: false }, undefined, "GET"
    );
    return await this.handleResponse(response);
  }

  public static async findAllByOrigin(page: number, filter: string): Promise<ResponseUserBody[] | { error?: string; message?: string; }> {
    const headers = { Authorization: `Bearer ${await CookieManager.get({ useServer: false })}` };
    const response = await this.request(
      `/caronas/origem=${filter}/page=${page.toString()}&size=10`, headers, { useServer: false }, undefined, "GET"
    );
    return await this.handleResponse(response);
  }
}