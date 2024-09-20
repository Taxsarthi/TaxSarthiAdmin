import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { NextResponse } from "next/server";

// const Limit = 10;

import { NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');

  let q;

  if (status === 'punched') {
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

export const fetchUserCount = async () => {
  let querySnapshot: QuerySnapshot<DocumentData>;
  const countQuery = query(collection(db, "users"));
  querySnapshot = await getDocs(countQuery);
  
  const assignQuery = query(collection(db, "users"), where("assign", "!=", null));
  const querySnapshots = await getDocs(assignQuery);

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
    where("assign", "!=", null)
  );
  const querySnapshot = await getDocs(assignQuery);
  return querySnapshot.size;
};
