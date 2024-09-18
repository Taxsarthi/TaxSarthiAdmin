import { useUser } from "@/lib/auth";
import Link from "next/link";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  const user = useUser();

  // Function to extract the user's display name from the email
  const getDisplayName = (email: string) => {
    const namePart = email.split('+')[0]; // Get the part before '+'
    return namePart.split('@')[0]; // Return only the part before '@'
  };

  // Function to determine the role based on user properties
  const getRole = (user: any) => {
    if (user.admin) {
      return 'Admin'; // If admin is true, display Admin
    } else if (user.ops) {
      return 'Ops'; // If ops is true, display Ops
    } else if (user.sales) {
      return 'Sales'; // If sales is true, display Sales
    }
    return 'Admin'; // Default role if none match
  };

  return (
    <div className="p-2 md:pt-3 w-full sticky top-0 backdrop-blur-sm bg-opacity-10 z-50">
      <div className={`flex ${user ? 'justify-between' : 'mt-20 justify-center'}`}>
        <Link href="/dashboard">
          <img
            src="/assets/TaxSarthiLogo.png"
            className="h-8 md:h-14 w-auto"
            alt="TaxSarthi Logo"
          />
        </Link>
        {user && (
          <Link href="/profile">
            <div className="flex items-center space-x-2">
              <div className="flex flex-col md:flex-row items-center text-center space-x-1">
                <p className="text-xs md:text-sm capitalize font-semibold">
                  {user.email ? getDisplayName(user.email) : 'No Email'}
                </p>
                <p className="hidden md:inline text-xs md:text-sm font-semibold">
                  |
                </p>
                <p className="text-xs md:text-sm capitalize font-semibold">
                  {getRole(user)}
                </p>
              </div>
              <img
                className="rounded-full h-10 w-10"
                src="/assets/TaxSarthiLogo.png"
                alt="profile"
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
