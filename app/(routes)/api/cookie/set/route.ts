import { NextApiRequest } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function GET(req: NextApiRequest) {
  const cookiesStore = cookies();
  let accessToken = req.headers.authorization;

  if (!accessToken) {
    if (cookiesStore.get("accessToken")) cookiesStore.delete("accessToken");
    return redirect("/auth/signin");
  }

  accessToken = accessToken.substring(7);
  const twoHoursInSeconds = 7200;
  const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() + (twoHoursInSeconds * 1000));

  cookiesStore.set("accessToken", accessToken, {
    maxAge: twoHoursInSeconds,
    secure: !!process.env["NEXT_PUBLIC_BACKEND_URL"]?.includes("https"),
    expires: currentDate,
    path: "/",
    sameSite: "lax"
  });
  return new Response(undefined, { status: 200 });
}