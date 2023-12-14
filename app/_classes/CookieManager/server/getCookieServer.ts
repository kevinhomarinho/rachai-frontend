export async function getCookieServer() {
  const response = await fetch("http://localhost:3000/api/cookie/get", {
    method: "GET"
  });
  return await response.json();
}