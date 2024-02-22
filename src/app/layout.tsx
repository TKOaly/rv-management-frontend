import { Toaster } from "@/components/ui/toaster";
import { merge } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import Providers from "./Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ruokavälitys",
  description: "TKO-äly ry Ruokavälitys",
};

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={merge(
            "h-screen overflow-hidden font-sans antialiased",
            fontSans.variable,
          )}
        >
          {children}
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
