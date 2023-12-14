export function setCookieClient(accessToken: string) {
  const twoHoursInSeconds = 7200;
  const isSecure = process.env["NEXT_PUBLIC_BACKEND_URL"]?.includes("https");

  const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() + (twoHoursInSeconds * 1000));

  const cookieOptions = `path=/; max-age=${twoHoursInSeconds}; SameSite=Lax; ${
    isSecure ? "Secure; " : ""
  } expires=${currentDate.toUTCString()}`;

  document.cookie = `accessToken=${accessToken}; ${cookieOptions}`;
}