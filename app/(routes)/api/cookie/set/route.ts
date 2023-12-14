import { cookies } from "next/headers";

export async function GET(req: Request) {
  const cookiesStore = cookies();
  const accessToken = req.headers.get("Authorization")!.substring(7);
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