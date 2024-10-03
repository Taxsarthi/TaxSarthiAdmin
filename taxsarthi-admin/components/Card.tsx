import React from "react";

interface CardProps {
  icon: React.ReactNode;
  count: string;
  title: string;
  isActive?: boolean; // Add this prop to indicate if the card is active
}

const Card: React.FC<CardProps> = ({ icon, count, title, isActive }) => {
  const activeClass = isActive ? "text-green-500" : "text-gray-700";

  return (
    <div className={`group relative border min-w-60 shadow-sm bg-white flex flex-col md:flex-row justify-center gap-4 items-center rounded-lg p-4 md:p-6 transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer`}>
      <div className={`flex-shrink-0 text-5xl ${activeClass}`}>
        {icon}
      </div>
      <div className={`flex items-center justify-center flex-col ${activeClass}`}>
        <p className={`text-lg md:text-xl font-medium ${activeClass}`}>{count}</p>
        <p className={`text-xs md:text-lg ${activeClass}`}>{title}</p>
      </div>
      <div className={`absolute inset-0 rounded-lg opacity-30 group-hover:opacity-50 transition-opacity`}></div>
    </div>
  );
};

export default Card;
