import { db } from "@/lib/firebase";
import { collection, doc, setDoc, query, where, getDocs } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const userData = req.body;

    console.log("Received userData:", userData); // Log incoming data

    // Validate required fields
    if (!userData.pan) {
      return res.status(400).json({ error: "PAN number is required" });
    }

    // Check if the PAN number already exists
    const panQuery = query(collection(db, "users"), where("pan", "==", userData.pan));
    const querySnapshot = await getDocs(panQuery);

    if (!querySnapshot.empty) {
      console.log("PAN already exists"); // Log if PAN exists
      return res.status(409).json({ error: "PAN number already exists" });
    }

    try {
      // Save user data with PAN number as the document ID
      const userRef = doc(collection(db, "users"), userData.pan);
      await setDoc(userRef, userData); // Set the document with user data
      console.log("User added with PAN number:", userData.pan); // Log the new user PAN number
      res.status(201).json({ id: userData.pan, ...userData });
    } catch (error) {
      console.error("Error adding user:", error);
      res.status(500).json({ error: "Failed to add user" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
