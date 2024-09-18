"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import SignIn from "@/components/SignIn";
import { useUser } from "@/lib/auth";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} bg-gray-100 dark:bg-gray-900 p-2`}>
          <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
              <p className="mt-4 text-lg text-slate-900 font-semibold">
                Loading...
              </p>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-100 dark:bg-gray-900 p-2`}>
        <Header />
        <Toaster />
        {user ? <>{children}</> : <SignIn />}
      </body>
    </html>
  );
}
