import React from "react";
import { FaUsers } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import { RiFileUserLine } from "react-icons/ri";
import Card from "./Card";

const UsersCards: React.FC = () => {
  return (
    <div className="flex justify-center py-6">
      <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Card 1 */}
        <Card
          icon={<FaUsers />}
          count="20"
          title="Users"
          // bgColor="bg-green-500"
          // gradientFrom="green-400"
          // gradientTo="green-700"
        />
        {/* Card 2 */}
        <Card
          icon={<FaUserCheck />}
          count="1999"
          title="Assigned"
          // bgColor="bg-slate-900"
          // gradientFrom="slate-700"
          // gradientTo="slate-900"
        />
        {/* Card 3 */}
        <Card
          icon={<RiFileUserLine />}
          count="150"
          title="Punched"
          // bgColor="bg-green-500"
          // gradientFrom="green-400"
          // gradientTo="green-700"
        />
      </div>
    </div>
  );
};

export default UsersCards;
