import { cookies } from "next/headers";

// returns true if the user has a valid token cookie
export async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.has("token");
}
