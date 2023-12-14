"use server";

export async function deleteCookieServer(url: string) {
  await fetch(`${url}api/cookie/delete`, {
    method: "GET"
  });
}