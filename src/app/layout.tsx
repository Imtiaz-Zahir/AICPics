import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Context } from "./Context";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import ModalBox from "@/components/ModalBox";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

const hostname = process.env.VERCEL_PROJECT_PRODUCTION_URL || "localhost:3000";

export const metadata: Metadata = {
  metadataBase:new URL(`https://${hostname}`),
  title: {
    default: "AICPics - Free AI Created Photos",
    template: "%s - AICPics",
  },
  description:
    "Discover a vast library of over 20 million stunning, AI-generated photos ready for free download on our website. From breathtaking landscapes to captivating portraits, explore endless possibilities for your creative projects with our diverse collection.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className + " flex flex-col gap-y-20 mx-auto bg-[#050505] text-white"}>
        <Context>
          <Nav />
          {children}
          {/* <ModalBox /> */}
        </Context>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
