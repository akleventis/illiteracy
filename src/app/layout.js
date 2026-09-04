import Script from "next/script";
import "./globals.css";
import ThemeToggle from "./ThemeToggle";

export const metadata = {
  title: "Fix my shit grammar",
  description: "Fixes shit grammar and spelling for the greater good of humanity",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`try{var t=localStorage.getItem("theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}`}
        </Script>
      </head>
      <body>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
