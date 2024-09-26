import {
  collection,
  query,
  where,
  getDocs,
  QuerySnapshot,
  DocumentData,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { NextResponse, NextRequest } from "next/server";

export const fetchUserCount = async () => {
  let querySnapshot: QuerySnapshot<DocumentData>;
  const countQuery = query(collection(db, "users"));
  querySnapshot = await getDocs(countQuery);
  return querySnapshot.size;
};

export const fetchPunchCount = async () => {
  let querySnapshot: QuerySnapshot<DocumentData>;
  const punchQuery = query(
    collection(db, "2024-25"),
    where("punch", "==", true)
  );
  querySnapshot = await getDocs(punchQuery);
  return querySnapshot.size;
};

export const fetchAssignedcount = async () => {
  const assignQuery = query(
    collection(db, "users"),
    where("assign", "!=", null || "")
  );
  const querySnapshot = await getDocs(assignQuery);
  return querySnapshot.size;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  let q;

  if (status === "punched") {
    q = query(collection(db, "2024-25"), where("punch", "==", true));
  } else {
    q = query(collection(db, "users"));
  }
  const querySnapshot = await getDocs(q);
  const tasks: { [key: string]: any }[] = [];
  querySnapshot.forEach((doc) => {
    tasks.push({ ...doc.data(), id: doc.id });
  });
  return NextResponse.json({ tasks });
}

export async function PUT(req: NextRequest) {
  try {
    const { id, lastStatus, assign } = await req.json();
    
    const userDoc = doc(db, "2024-25", id);
    
    await updateDoc(userDoc, { 
      ...(lastStatus !== undefined && { lastStatus }), 
      ...(assign !== undefined && { assign }) 
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating Firestore:', error);
    return NextResponse.json({ success: false, error: (error as any).message }, { status: 500 });
  }
}