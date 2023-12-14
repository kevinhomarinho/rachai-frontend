"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function deleteCookieServer() {
  const cookiesStore = cookies();
  if (cookiesStore.get("accessToken")) cookies().delete("accessToken");
  redirect("/auth/signin");
}