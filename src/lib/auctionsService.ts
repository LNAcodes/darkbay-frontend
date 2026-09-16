import { fetchAPI } from "./utils/fetchAPI";

// these filter fields come from and match the backendDTO (project): src/auctions/dto/query-auctions.dto.ts
interface AuctionQuery {
  status?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: string;
}

// default parameter = {} means the function works even without filters
export async function getAuctions(query: AuctionQuery = {}) {
  // URLSearchParams is like an empty backpack, we fill it with filters
  const params = new URLSearchParams();

  // Only add a filter to the URL if a value was actually provided
  if (query.status) params.append("status", query.status);
  if (query.minPrice) params.append("min-price", query.minPrice); // note: backend expects "min-price" with a hyphen
  if (query.maxPrice) params.append("max-price", query.maxPrice); // note: backend expects "max-price" with a hyphen
  if (query.page) params.append("page", query.page);

  // params.toString() turns the backpack into a query string: "status=open&page=2"
  const response = await fetchAPI(`/auctions?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch auctions");
  }

  return response.json();
}

export async function getAuctionById(id: string) {
  const response = await fetchAPI(`/auctions/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch auction with id ${id}`);
  }

  return response.json();
}

export async function getOffersByAuctionId(auctionId: string) {
  const response = await fetchAPI(`/auctions/${auctionId}/offers`);

  if (!response.ok) {
    throw new Error(`Failed to fetch offers for auction ${auctionId}`);
  }

  return response.json();
}
