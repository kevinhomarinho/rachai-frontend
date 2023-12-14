import { cookies } from "next/headers";

export async function GET() {
  const cookiesStore = cookies();
  if (cookiesStore.get("accessToken")) cookiesStore.delete("accessToken");
  return new Response(undefined, {
    status: 302,
    headers: { "Location": "/auth/signin" }
  });
}