import React, { useEffect, useState } from "react";
import { FaUsers, FaUserCheck } from "react-icons/fa";
import { RiFileUserLine } from "react-icons/ri";
import Card from "./Card";
import { listenToITRCount, listenToTDSCount, listenToUserCount } from "@/app/api/user-data/route";

interface UsersCardsProps {
  onCardClick: (type: string) => void;
}

const UsersCards: React.FC<UsersCardsProps> = ({ onCardClick }) => {
  const [userCount, setUserCount] = useState(0);
  const [tdsCount, setTdsCount] = useState(0);
  const [itrCount, setItrCount] = useState(0);
  const [activeCard, setActiveCard] = useState<string>("all");

  useEffect(() => {
    const unsubscribeUser = listenToUserCount(setUserCount);
    const unsubscribeTds = listenToTDSCount(setTdsCount);
    const unsubscribeItr = listenToITRCount(setItrCount);

    return () => {
      unsubscribeUser();
      unsubscribeTds
      unsubscribeItr();
    };
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
            title="Enquiry" 
            isActive={activeCard === "all"} 
          />
        </button>
        <button onClick={() => handleCardClick("itr+tds")}>
          <Card
            icon={<FaUserCheck />}
            count={tdsCount.toString()}  
            title="Active : TDS"
            isActive={activeCard === "itr+tds"} 
          />
        </button>
        <button onClick={() => handleCardClick("itr")}>
          <Card
            icon={<RiFileUserLine />}
            count={itrCount.toString()}  
            title="Active : ITR"
            isActive={activeCard === "itr"}
          />
        </button>
      </div>
    </div>
  );
};

export default UsersCards;
