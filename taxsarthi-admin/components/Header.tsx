import { useUser } from "@/lib/auth";
import { Avatar, Badge, styled } from "@mui/material";
import { get } from "http";
import Link from "next/link";
import React from "react";

type Props = {};

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#73f725',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.6)',
      opacity: 0,
    },
  },
}));

const Header = (props: Props) => {
  const user = useUser();
  console.log(user)

  const getRole = (user: any) => {
    if (user.admin === true) {
      return "Admin"; 
    } else if (user.ops === true) {
      return "Ops"; 
    } else if (user.sales === true) {
      return "Sales"; 
    }
    return ""; 
  };  

  return (
    <div className="p-2 md:pt-3 w-full sticky top-0 backdrop-blur-sm bg-opacity-10 z-50">
      <div className={`flex ${user ? "justify-between" : "mt-20 justify-center"}`}>
        <Link href="/dashboard">
          <img
            src="/assets/TaxSarthiLogo.png"
            className="h-8 md:h-14 w-auto"
            alt="TaxSarthi Logo"
          />
        </Link>
        {user && (
          <Link href="/profile">
            <div className="flex items-center space-x-2 mx-2">
              <div className="flex flex-col md:flex-row items-center text-center space-x-1">
                <p className="text-xs md:text-sm capitalize font-semibold">
                  {user.displayName}
                </p>
                {getRole(user) !== "" && (
                  <p className="hidden md:inline text-xs md:text-sm font-semibold">|</p>
                )}
                <p className="text-xs md:text-sm capitalize font-semibold">
                  {getRole(user)}
                </p>
              </div>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar src={user.photoURL || undefined}/>
              </StyledBadge>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
