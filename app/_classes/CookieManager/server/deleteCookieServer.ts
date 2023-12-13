"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const deleteCookieServer = (name: "accessToken" | "refreshToken") => {
  const cookiesStore = cookies();
  cookiesStore.delete(name);
  redirect("/");
};