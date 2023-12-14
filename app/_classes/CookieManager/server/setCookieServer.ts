"use server";

import { cookies } from "next/headers";

export async function setCookieServer(accessToken: string) {
  accessToken = accessToken.substring(7);
  const twoHoursInSeconds = 7200;
  const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() + (twoHoursInSeconds * 1000));

  cookies().set("accessToken", accessToken, {
    maxAge: twoHoursInSeconds,
    secure: !!process.env["NEXT_PUBLIC_BACKEND_URL"]?.includes("https"),
    expires: currentDate,
    path: "/",
    sameSite: "lax"
  });
}