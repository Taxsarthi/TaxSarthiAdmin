import {
    collection,
    query,
    onSnapshot,
    where,
    startAfter,
    limit,
    getDocs,
    orderBy,
    doc,
    getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { NextResponse } from "next/server";

// const Limit = 10;

import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
    const { searchParams } = new URL(req.url);
    const punched = searchParams.get('punched') === 'true'; // Get punched state from query parameters

    const q = query(
        collection(db, "users"),
        where(punched ? "punch" : "paymentRequired", "==", false),
        orderBy("pan"),
        // limit(Limit)
    );

    try {
        const querySnapshot = await getDocs(q);
        const tasks = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

        return NextResponse.json({ tasks });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}


