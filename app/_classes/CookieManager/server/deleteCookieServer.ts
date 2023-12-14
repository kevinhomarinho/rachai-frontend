export async function deleteCookieServer() {
  await fetch("http://localhost:3000/api/cookie/delete", {
    method: "GET"
  });
}