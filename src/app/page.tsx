import { getAuctions } from "@/lib/auctionsService";

// matches the backend AuctionResponseDto: src/auctions/dto/auction-response.dto.ts
interface Auction {
  id: string;
  title: string;
  description: string;
  startingPrice: number;
  currentPrice: number;
  endDate: string;
  createdAt: string;
  seller: string;
  status: string;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // I can find my filters in backend project in: src/auctions/dto/query-auctions.dto.ts
  const filters = await searchParams;
  // reading filter out of URL und sending it to backend
  const status = filters.status as string | undefined;
  const minPrice = filters["min-price"] as string | undefined;
  const maxPrice = filters["max-price"] as string | undefined;
  const page = filters.page as string | undefined;

  const auctions = await getAuctions({ status, minPrice, maxPrice, page });

  return (
    <main>
      <h1>DarkBay</h1>
      <ul>
        {auctions.data.map((auction: Auction) => (
          <li key={auction.id}>
            {auction.title}: {auction.currentPrice}€
          </li>
        ))}
      </ul>
    </main>
  );
}
