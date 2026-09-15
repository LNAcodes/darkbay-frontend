import { getAuctionById, getOffersByAuctionId } from "@/lib/auctionsService";
import { notFound } from "next/navigation";

// matches the backend OfferResponseDto: src/offers/dto/offer-response.dto.ts
interface Offer {
  id: string;
  amount: number;
  bidder: string;
  createdAt: string;
  auctionId: string;
}

// PageProps is a Next.js utility type that infers the shape of params from the URL
export default async function AuctionDetailPage({
  params,
}: PageProps<"/auctions/[id]">) {
  // params is a Promise, so we must await it before reading the id
  const { id } = await params;

  // fetch the single auction and its bid history from DarkBay backend
  const auction = await getAuctionById(id);
  const offers = await getOffersByAuctionId(id);

  // if the backend returns nothing, show the Next.js not-found page
  // notFound() is imported from "next/navigation" and triggers src/app/not-found.tsx
  if (!auction) {
    notFound();
  }

  return (
    <div>
      <h1>{auction.title}</h1>
      <p>{auction.description}</p>
      <p>Current price: {auction.currentPrice}€</p>
      <p>End date: {auction.endDate}</p>
      <p>Seller: {auction.seller}</p>
      <p>Status: {auction.status}</p>

      {/* Bid History — fetched from backend project @Controller("auctions/:auctionId/offers")*/}
      <h2>Bid History</h2>

      {/* ternary operator: if no offers exist, show a message, otherwise show the list */}
      {offers.length === 0 ? (
        <p>No bids yet.</p>
      ) : (
        <ul>
          {/* .map() loops over every offer and returns a <li> for each one */}
          {offers.map((offer: Offer) => (
            // key is required by React to track list items efficiently
            <li key={offer.id}>
              {/* offer.bidder and offer.amount come from the backend response */}
              {offer.bidder}: {offer.amount}€
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
