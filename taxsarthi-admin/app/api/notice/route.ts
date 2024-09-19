import {
    collection,
    query,
    getDocs,
    orderBy
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { NextResponse } from "next/server";

import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const q = query(
            collection(db, "notices")
        );
        const querySnapshot = await getDocs(q);
        const notices: { [key: string]: any }[] = [];
        
        querySnapshot.forEach((doc) => {
            notices.push({ ...doc.data(), id: doc.id });
        });

        return NextResponse.json({ notices });
    } catch (error) {
        console.error("Error fetching notices:", error);
        return NextResponse.json({ error: "Failed to fetch notices" }, { status: 500 });
    }
}
