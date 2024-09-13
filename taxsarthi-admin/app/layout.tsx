'use client'
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import SignIn from "@/components/SignIn";
import { useUser } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "TaxSarthi-Admin",
//   description: "TaxSarthi-Admin",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useUser();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-100 dark:bg-gray-900 p-2`}>
      <Header/>
      <Toaster/>
        {!user ? <SignIn /> : <>{children}</>}
        </body>
    </html>
  );
}
