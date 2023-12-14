import { cookies } from "next/headers";

export async function GET() {
  const accessToken = cookies().get("accessToken");
  if (!accessToken) {
    const cookiesStore = cookies();
    if (cookiesStore.get("accessToken")) cookiesStore.delete("accessToken");
    return new Response(undefined, {
      status: 302,
      headers: { "Location": "/auth/signin" }
    });
  }

  return new Response(accessToken.value, {
    status: 200
  });
}