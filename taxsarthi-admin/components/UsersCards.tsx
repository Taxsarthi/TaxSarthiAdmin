import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import { RiFileUserLine } from "react-icons/ri";
import Card from "./Card";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const UsersCards: React.FC = () => {
  const [userCount, setUserCount] = useState(0);
  const [assignedCount, setAssignedCount] = useState(0);
  const [punchedCount, setPunchedCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch total users from Firestore
        const db = getFirestore();
        const usersSnapshot = await getDocs(collection(db, "users"));
        setUserCount(usersSnapshot.size); // Assuming each document is a user

        // Fetch assigned users (update your logic as needed)
        const assignedSnapshot = await getDocs(collection(db, "assigned"));
        setAssignedCount(assignedSnapshot.size);

        // Fetch punched users (update your logic as needed)
        const punchedSnapshot = await getDocs(collection(db, "punched"));
        setPunchedCount(punchedSnapshot.size);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex justify-center py-6">
      <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Card 1 */}
        <Card
          icon={<FaUsers />}
          count={userCount.toString()}
          title="Users"
        />
        {/* Card 2 */}
        <Card
          icon={<FaUserCheck />}
          count={assignedCount.toString()}
          title="Assigned"
        />
        {/* Card 3 */}
        <Card
          icon={<RiFileUserLine />}
          count={punchedCount.toString()}
          title="Punched"
        />
      </div>
    </div>
  );
};

export default UsersCards;
