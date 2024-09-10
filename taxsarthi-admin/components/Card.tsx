import React from "react";

interface CardProps {
  icon: React.ReactNode;
  count: string;
  title: string;
  // bgColor: string;
  // gradientFrom: string;
  // gradientTo: string;
}

const Card: React.FC<CardProps> = ({ icon, count, title}) => {
  return (
    <div className={`group relative border shadow-sm bg-white flex flex-col md:flex-row justify-center gap-4 items-center rounded-lg p-4 md:p-6 transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer`}>
      <div className="flex-shrink-0 text-xl">
        {icon}
      </div>
      <div className="flex items-center justify-center flex-col">
        <p className="text-lg md:text-xl font-medium">{count}</p>
        <p className="text-xs md:text-lg">{title}</p>
      </div>
      <div className={`absolute inset-0 rounded-lg opacity-30 group-hover:opacity-50 transition-opacity`}></div>
    </div>
  );
};

export default Card;
