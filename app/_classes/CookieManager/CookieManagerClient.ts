import { deleteCookieClient } from "./client/deleteCookieClient";
import { getCookieClient } from "./client/getCookieClient";
import { setCookieClient } from "./client/setCookieClient";

export class CookieManagerClient {
  public static get(): string | undefined {
    return getCookieClient("accessToken");
  }

  public static delete(): void {
    deleteCookieClient("accessToken");
  }

  public static set(accessToken: string): void {
    setCookieClient(accessToken);
  }
}