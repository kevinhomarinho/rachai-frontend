export async function setCookieServer(url: string, accessToken: string) {
  await fetch(`${url}api/cookie/set`, {
    method: "GET", headers: { "Authorization": accessToken }
  });
}