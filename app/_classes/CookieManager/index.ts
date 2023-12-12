import { CookieManagerClient } from "./CookieManagerClient";
import { CookieManagerServer } from "./CookieManagerServer";

export class CookieManager {
  public static set(
    accessToken: string,
    { useServer }: { useServer: boolean }
  ) {
    if (!useServer) {
      CookieManagerClient.set(accessToken!);
      return;
    }
    CookieManagerServer.set(accessToken!);
  }
  
  public static delete({ useServer }: { useServer: boolean }) {
    if (!useServer) return CookieManagerClient.delete();
    return CookieManagerServer.delete();
  }

  public static get({ useServer }: { useServer: boolean }) {
    if (!useServer) return CookieManagerClient.get();
    return CookieManagerServer.get();
  }

}