import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Providers from "./providers";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reader's Recount",
  description:
    "Discover reviews of your favorite books and share your own insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
      >
        <body className={`${inter.className}`}>
          <Providers>
            <Navbar />
            <main className="container py-5">{children}</main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
