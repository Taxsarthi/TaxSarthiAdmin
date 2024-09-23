"use client";
import SignIn from "@/components/SignIn";
import { useUser } from "@/lib/auth";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

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
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-lg font-semibold text-gray-700">Hello, You have been logged in!</h1>
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
