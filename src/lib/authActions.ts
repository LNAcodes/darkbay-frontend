// Communicates with the DarkBay backend for authentication.
// Contains: registerAction, loginAction, logoutAction
// loginAction stores the JWT in an httpOnly cookie after a successful login.
// logoutAction clears the cookie.

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function addDelivery(formData: FormData) {
  const pickup = formData.get("pickup") as string;
  revalidatePath("/deliveries");
}

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string
