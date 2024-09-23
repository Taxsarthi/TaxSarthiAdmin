import {
    collection,
    query,
    getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const q = query(collection(db, "queries"));
    const querySnapshot = await getDocs(q);
    const tasks: { [key: string]: any }[] = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data && typeof data === 'object') {
            tasks.push({ ...data, id: doc.id });
        }
    });
    return NextResponse.json({ tasks });
}
