import { deleteCookieServer } from "./server/deleteCookieServer";
import { getCookieServer } from "./server/getCookieServer";
import { setCookieServer } from "./server/setCookieServer";

export class CookieManagerServer {
  public static get(): string | undefined {
    return getCookieServer("accessToken");
  }

  public static delete(): void {
    return deleteCookieServer("accessToken");
  }

  public static set(accessToken: string): void {
    return setCookieServer(accessToken);
  }
}