// error.tsx must be a Client Component because it needs to:
// 1. catch errors that happen during rendering
// 2. respond to the user clicking the "Try again" button (onClick)
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Could not load this auction.</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
