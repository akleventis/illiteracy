import "./globals.css";

export const metadata = {
  title: "Fix my shit grammar",
  description: "Fixes shit grammar and spelling for the greater good of humanity",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  );
}
