import {
  collection,
  query,
  where,
  getDocs,
  QuerySnapshot,
  DocumentData,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { NextResponse, NextRequest } from "next/server";

export const listenToUserCount = (setUserCount: (count: number) => void) => {
  const userRef = collection(db, "usersTable");
  const unsubscribe = onSnapshot(userRef, (snapshot) => {
    setUserCount(snapshot.size);
  });
  return unsubscribe;
};

export const listenToITRCount = (setPunchedCount: (count: number) => void) => {
  const itrQuery = query(
    collection(db, "usersTable"),
    where("closedFor", "==", "itr")
  );
  const unsubscribe = onSnapshot(itrQuery, (snapshot) => {
    setPunchedCount(snapshot.size);
  });
  return unsubscribe;
};

export const listenToITRTDSCount = (
  setAssignedCount: (count: number) => void
) => {
  const itrtdsQuery = query(
    collection(db, "usersTable"),
    where("closedFor", "==", "itr+tds")
  );
  const unsubscribe = onSnapshot(itrtdsQuery, (snapshot) => {
    setAssignedCount(snapshot.size);
  });
  return unsubscribe;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("closedFor");

  let q;

  if (status === "itr") {
    q = query(collection(db, "usersTable"), where("closedFor", "==", "itr"));
  } else if (status === "itr+tds") {
    q = query(
      collection(db, "usersTable"),
      where("closedFor", "==", "itr+tds")
    );
  } else {
    q = query(collection(db, "usersTable"));
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
      ...(assign !== undefined && { assign }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating Firestore:", error);
    return NextResponse.json(
      { success: false, error: (error as any).message },
      { status: 500 }
    );
  }
}
