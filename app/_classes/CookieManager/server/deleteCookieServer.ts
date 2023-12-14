"use server";

import { headers } from "next/headers";

export async function deleteCookieServer() {
  await fetch(`${headers().get("referer")}api/cookie/delete`, {
    method: "GET"
  });
}