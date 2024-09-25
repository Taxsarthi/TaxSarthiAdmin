import { collection, getDocs, doc, updateDoc, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { NextRequest, NextResponse } from "next/server";

// GET: Fetch all queries
export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "queries"));
    const queries = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(queries);
  } catch (error) {
    console.error("Error fetching queries:", error);
    return NextResponse.json({ message: "Error fetching queries" }, { status: 500 });
  }
}

// PUT: Update a specific query
export async function PUT(req: NextRequest) {
  const { id, updates } = await req.json();
  const queryRef = doc(db, "queries", id);
  try {
    await updateDoc(queryRef, updates);
    return NextResponse.json({ message: "Query updated successfully" });
  } catch (error) {
    console.error("Error updating query:", error);
    return NextResponse.json({ message: "Error updating query" }, { status: 500 });
  }
}

// POST: Add a new query
export async function POST(req: NextRequest) {
  const newQuery = req.body;
  try {
    await addDoc(collection(db, "queries"), newQuery);
    return NextResponse.json({ message: "Query added successfully" });
  } catch (error) {
    console.error("Error adding query:", error);
    return NextResponse.json({ message: "Error adding query" }, { status: 500 });
  }
}
