export async function setCookieServer(accessToken: string) {
  await fetch("http://localhost:3000/api/cookie/set", {
    method: "GET", headers: { "Authorization": accessToken }
  });
}