import { NextApiRequest, NextApiResponse } from "next";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
    const { id, updates } = req.body;

    if (!id || !updates) {
      return res.status(400).json({ message: "Missing id or updates" });
    }

    try {
      const queryRef = doc(db, "queries", id);
      await updateDoc(queryRef, updates);
      return res.json({ message: "Update successful" });
    } catch (error) {
      console.error("Error updating document:", error);
      return res.status(500).json({ message: "Error updating document" });
    }
}
