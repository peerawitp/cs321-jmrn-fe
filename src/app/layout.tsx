"use client";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import NextAuthProvider from "@/provider/NextAuthProvider";
import QueryClientProvider from "@/provider/QueryClientProvider";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthProvider>
          <QueryClientProvider>
            <div className="flex flex-col min-h-screen">
              {/* Navbar  at the top */}
              <header className="bg-gray-200 sticky top-0">
                <Navbar />
              </header>

              <main className="flex-grow bg-gray-100 p-1">{children}</main>
            </div>
          </QueryClientProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
