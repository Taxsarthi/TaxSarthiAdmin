import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pan = searchParams.get("pan");

  if (!pan) {
    return NextResponse.json({ error: "PAN number is required" }, { status: 400 });
  }

  try {
    const panQuery = query(collection(db, "users"), where("pan", "==", pan));
    const querySnapshot = await getDocs(panQuery);

    // Check if the PAN exists
    const exists = !querySnapshot.empty;

    return NextResponse.json({ exists });
  } catch (error) {
    console.error("Error checking PAN:", error);
    return NextResponse.json({ error: "Failed to check PAN" }, { status: 500 });
  }
}
