"use client";
import SignIn from "@/components/SignIn";
import { useUser } from "@/lib/auth";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {};

const page: React.FC<Props> = () => {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    // Redirect if user is logged in
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (user) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center mt-60">
        <h1 className="text-2xl font-semibold text-gray-700">Hello, You have been logged in!</h1>
        {/* Redirecting you to dashboard... */}
        <h2 className="text-md font-semibold text-gray-700">Redirecting you to <Link href="/dashboard" className="text-blue-600">dashboard</Link>...</h2>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
        <SignIn />
    </div>
  );
};

export default page;
