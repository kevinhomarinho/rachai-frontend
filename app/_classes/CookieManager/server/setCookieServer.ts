"use server";

import { cookies } from "next/headers";

export const setCookieServer = (accessToken: string) => {
  const twoHoursInSeconds = 7200;
  const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() + (twoHoursInSeconds * 1000));

  const cookiesStore = cookies();
  cookiesStore.set("accessToken", accessToken, {
    maxAge: twoHoursInSeconds,
    secure: !!process.env["NEXT_PUBLIC_BACKEND_URL"]?.includes("https"),
    expires: currentDate,
    httpOnly: true,
    path: "/",
    sameSite: "lax"
  });
};