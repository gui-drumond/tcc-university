import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Roboto } from "next/font/google";
import Navbar from "./components/navbar";

const roboto = Roboto({ subsets: ["latin"], weight: ["100", "400","500", "700", "900"] });
const poppins = Roboto({
  subsets: ["latin"],
  weight: ["100", "400", "500", "700", "900"],
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "PC PARA",
  description: "Encontre o PC ideal para você, apenas nos diga para que irá usar que lhe dizemos as peças.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${geistSans.variable} ${geistMono.variable} ${roboto.className} ${poppins.className} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
