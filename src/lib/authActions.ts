// Communicates with the DarkBay backend for authentication.
// Contains: registerAction, loginAction, logoutAction
// loginAction stores the JWT in an httpOnly cookie after a successful login.
// logoutAction clears the cookie.

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  // FormData comes from the login form — Next.js passes it automatically

  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // 1. send POST /auth/login to the DarkBay backend
  // the URL comes from .env: DARKBAY_API_URL
  const response = await fetch(`${process.env.DARKBAY_API_URL}/auth/login`, {
    method: "POST",
    // tell the backend we are sending JSON
    headers: { "Content-Type": "application/json" },
    // JSON.stringify converts the JS object to a JSON string for the request body
    body: JSON.stringify({ username, password }),
  });

  // 2. read the token from the response
  // DarkBay returns { access_token: "eyJhbGci..." } on successful login
  const data = await response.json();
  const token = data.access_token;

  // 3. store the token in an httpOnly cookie
  // httpOnly: true means JavaScript in the browser CANNOT read this cookie
  // only the server can read it — this protects against XSS attacks
  // unlike localStorage, which any JS code (including malicious scripts) can read
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    path: "/", // cookie is available on all routes
  });

  redirect("/");
}
