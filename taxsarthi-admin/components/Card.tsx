import React from "react";

interface CardProps {
  icon: React.ReactNode;
  count: string;
  title: string;
  bgColor: string;
  gradientFrom: string;
  gradientTo: string;
}

const Card: React.FC<CardProps> = ({ icon, count, title, bgColor, gradientFrom, gradientTo }) => {
  return (
    <div className={`group relative flex flex-col md:flex-row justify-center gap-4 items-center ${bgColor} rounded-lg p-4 md:p-6 transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer`}>
      <div className="flex-shrink-0 text-white text-5xl">
        {icon}
      </div>
      <div className="flex items-center justify-center flex-col">
        <p className="text-white text-lg md:text-3xl lg:text-5xl font-medium">{count}</p>
        <p className="text-white text-xs md:text-md lg:text-xl">{title}</p>
      </div>
      <div className={`absolute inset-0 bg-gradient-to-r from-${gradientFrom} to-${gradientTo} rounded-lg opacity-30 group-hover:opacity-50 transition-opacity`}></div>
    </div>
  );
};

export default Card;
