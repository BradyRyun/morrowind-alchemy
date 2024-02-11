import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Footer} from "@/app/footer";

const inter = Inter({ subsets: ["latin"] });

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
      <body className="bg-[#FBEFD5]">{children}</body>
      <Footer />
    </html>
  );
}
