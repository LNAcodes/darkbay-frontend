"use server";

import { revalidatePath } from "next/cache";
import { fetchAPI } from "./utils/fetchAPI";
import { redirect } from "next/navigation";

export async function createAuctionAction(formData: FormData) {
  // 1. read form fields
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const startingPrice = Number(formData.get("startingPrice") as string);

  // 2. send POST /auctions to DarkBay backend
  // note: no "seller" field — the backend reads the identity from the JWT token
  const response = await fetchAPI("/auctions", {
    method: "POST",
    body: JSON.stringify({ title, description, startingPrice }),
  });
}
