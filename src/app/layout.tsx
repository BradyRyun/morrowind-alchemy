import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "./footer";
import MenuBar from "./components/menu-bar";

export const metadata: Metadata = {
  title: "Morrowind Alchemy",
  description: "Helps you craft gigachad potions in Morrowind",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#FBEFD5] mx-auto font-viner">
      <MenuBar />
        {children}
      <Footer/>
      </body>
    </html>
  );
}
