import React, { useEffect, useState } from "react";
import { FaUsers, FaUserCheck } from "react-icons/fa";
import { RiFileUserLine } from "react-icons/ri";
import Card from "./Card";
import {
  fetchAssignedcount,
  fetchPunchCount,
  fetchUserCount,
} from "@/app/api/user-data/route";

interface UsersCardsProps {
  onCardClick: (type: string) => void;
}

const UsersCards: React.FC<UsersCardsProps> = ({ onCardClick }) => {
  const [userCount, setUserCount] = useState(0);
  const [assignedCount, setAssignedCount] = useState(0);
  const [punchedCount, setPunchedCount] = useState(0);
  const [activeCard, setActiveCard] = useState<string>("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalUserCount = await fetchUserCount();
        setUserCount(totalUserCount);
        const totalAssignedCount = await fetchAssignedcount();
        setAssignedCount(totalAssignedCount);
        const totalPunchedCount = await fetchPunchCount();
        setPunchedCount(totalPunchedCount);
      } catch (error) {
        console.error("Error fetching counts: ", error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (type: string) => {
    setActiveCard(type);
    onCardClick(type);
  };

  return (
    <div className="flex justify-center py-6">
      <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto">
        <button onClick={() => handleCardClick("all")}>
          <Card 
            icon={<FaUsers />} 
            count={userCount.toString()} 
            title="Total Users" 
            isActive={activeCard === "all"} 
          />
        </button>
        <button onClick={() => handleCardClick("assigned")}>
          <Card
            icon={<FaUserCheck />}
            count={assignedCount.toString()}
            title="Assigned"
            isActive={activeCard === "assigned"} 
          />
        </button>
        <button onClick={() => handleCardClick("punched")}>
          <Card
            icon={<RiFileUserLine />}
            count={punchedCount.toString()}
            title="Punched"
            isActive={activeCard === "punched"}
          />
        </button>
      </div>
    </div>
  );
};

export default UsersCards;
