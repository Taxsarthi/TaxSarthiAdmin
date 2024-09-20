import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import { RiFileUserLine } from "react-icons/ri";
import Card from "./Card";
import { fetchAssignedcount, fetchPunchCount, fetchUserCount } from "@/app/api/user-data/route";

const UsersCards: React.FC<{ setDisplayedType: (type: string) => void }> = ({ setDisplayedType }) => {
  const [userCount, setUserCount] = useState(0);
  const [assignedCount, setAssignedCount] = useState(0);
  const [punchedCount, setPunchedCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user count
        const totalUserCount = await fetchUserCount();
        setUserCount(totalUserCount);

        // Fetch assigned count
        const totalAssignedCount = await fetchAssignedcount();
        setAssignedCount(totalAssignedCount);

        // Fetch punched count
        const totalPunchedCount = await fetchPunchCount();
        setPunchedCount(totalPunchedCount);
      } catch (error) {
        console.error("Error fetching counts: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center py-6">
      <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto">
        <Card 
          icon={<FaUsers />} 
          count={userCount.toString()} 
          title="Users" 
          // onClick={() => setDisplayedType("all")} 
        />
        <Card
          icon={<FaUserCheck />}
          count={assignedCount.toString()}
          title="Assigned"
          // onClick={() => setDisplayedType("assigned")} 
        />
        <Card
          icon={<RiFileUserLine />}
          count={punchedCount.toString()}
          title="Punched"
          // onClick={() => setDisplayedType("punched")} 
        />
      </div>
    </div>
  );
};

export default UsersCards;
