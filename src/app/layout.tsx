import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import {Contex} from "./Contex";
import Nav from "@/components/Nav";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Photos",
  description:
    "Over 20 million free AI-generated photos available for download.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-primary text-secondary">
      <body className={roboto.className}>
        <Contex>
          <Nav />
          {children}
        </Contex>
      </body>
    </html>
  );
}