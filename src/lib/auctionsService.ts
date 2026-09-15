const BASE_URL = process.env.DARKBAY_API_URL;

export async function getAuctions() {
  const response = await fetch(`${BASE_URL}/auctions`);

  if (!response.ok) {
    throw new Error("Failed to fetch auctions");
  }

  return response.json();
}

export async function getAuctionById(id: string) {
  const response = await fetch(`${BASE_URL}/auctions/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch auction with id ${id}`);
  }

  return response.json();
}
