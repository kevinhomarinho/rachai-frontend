"use server";

import { headers } from "next/headers";

export async function setCookieServer(accessToken: string) {
  await fetch(`${headers().get("referer")}api/cookie/set`, {
    method: "GET", headers: { "Authorization": accessToken }
  });
}