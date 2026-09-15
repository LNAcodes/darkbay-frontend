// this page is shown automatically when notFound() is called in page.tsx
// Next.js also sets the HTTP status code to 404 so search engines know this page does not exist
export default function NotFound() {
  return (
    <div>
      <h2>Auction not found</h2>
      <p>This auction does not exist or has been removed.</p>
    </div>
  );
}
