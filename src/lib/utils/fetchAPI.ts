// A smart wrapper around fetch.
// Reads the JWT from the httpOnly cookie and adds it automatically
// as an Authorization: Bearer <token> header to every request.

import { cookies } from "next/headers";

export async function fetchAPI(path: string, options: RequestInit = {}) {
  // 1. read the token from the httpOnly cookie

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // 2. build the headers — add Authorization header if token exists
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    // merge any extra headers passed in from the caller

    ...(options.headers as Record<string, string>),
  };

  // add Authorization header only if token exists
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // 3. call fetch with the full DarkBay URL and merged options
  // path comes from the caller, e.g. "/auctions" or "/auctions/123"
  return fetch(`${process.env.DARKBAY_API_URL}${path}`, {
    ...options,
    headers,
  });
}
