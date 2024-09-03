import Link from "next/link";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="p-2 md:p-4 w-full sticky top-0 backdrop-blur-sm bg-opacity-10 z-50">
      <div className="flex justify-between">
        <Link href="/dashboard">
          <img
            src="/assets/TaxSarthiLogo.png"
            className="h-8 md:h-14 w-auto"
            alt=""
          />
        </Link>
        <Link href="/profile">
          <div className="flex items-center space-x-2">
            <div className="flex flex-col md:flex-row items-center text-center space-x-1">
              <p className="text-xs md:text-sm font-semibold">Snehal Bargaje</p>
              <p className="hidden md:inline text-xs md:text-sm font-semibold">
                |
              </p>
              <p className="text-xs md:text-sm font-semibold">Admin</p>
            </div>
            <img
              className="rounded-full h-10 w-10"
              src="/assets/TaxSarthiLogo.png"
              alt="profile"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
