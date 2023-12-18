// New: App Router ✨
// The root layout is shared for the entire application
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
