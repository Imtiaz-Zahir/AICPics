import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Context } from "./Context";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Aside from "@/components/Aside";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Synthetic Gallery",
  description:
    "Over 20 million free AI-generated photos available for download.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className + " flex flex-col gap-y-20"}>
        <Context>
          <Nav />
          {children}
        </Context>
        <Footer />
      </body>
    </html>
  );
}