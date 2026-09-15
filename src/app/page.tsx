import { getAuctions } from "@/lib/auctionsService";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // I can find my filters in backend project in: src/auctions/dto/query-auctions.dto.ts
  const filters = await searchParams;
  // reading filter out of URL und sending it to backend
  const status = filters.status as string | undefined;
  const minPrice = filters["min-price"];
  const maxPrice = filters["max-price"] as string | undefined;
  const page = filters.page as string | undefined;

  const auctions = await getAuctions({ status, minPrice, maxPrice, page });

  return (
    <main>
      <h1>DarkBay</h1>
      <ul>
        {auctions.data.map((auction: any) => (
          <li key={auction.id}>
            {auction.title}: {auction.currentPrice}€
          </li>
        ))}
      </ul>
    </main>
  );
}
