import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const userData = req.body;

    console.log("Received userData:", userData); // Log incoming data

    // Check if the PAN number already exists
    const panQuery = query(collection(db, "users"), where("pan", "==", userData.pan));
    const querySnapshot = await getDocs(panQuery);

    if (!querySnapshot.empty) {
      console.log("PAN already exists"); // Log if PAN exists
      return res.status(409).json({ error: "PAN number already exists" });
    }

    try {
      const userRef = await addDoc(collection(db, "users"), userData);
      console.log("User added with ID:", userRef.id); // Log the new user ID
      res.status(201).json({ id: userRef.id, ...userData });
    } catch (error) {
      console.error("Error adding user:", error);
      res.status(500).json({ error: "Failed to add user" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
