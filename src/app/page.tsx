import { getAuctions } from "@/lib/auctionsService";

export default async function HomePage() {
  const auctions = await getAuctions();

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
