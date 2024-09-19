import {
    collection,
    query,
    where,
    limit,
    getDocs,
    orderBy
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { NextResponse } from "next/server";

// const Limit = 10;

import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
    const punched = false;

    if (!punched) {
        const q = query(
            collection(db, "users"),
            // where("paymentRequired", "==", false),
            // orderBy("pan"),
            // limit(Limit)
        );
        const querySnapshot = await getDocs(q);
        const tasks: { [key: string]: any }[] = [];
        querySnapshot.forEach((doc) => {
            tasks.push({ ...doc.data(), id: doc.id });
        });

        return NextResponse.json({ tasks });
    } else {
        const q = query(
            collection(db, "users"),
            where("punch", "==", true),
            orderBy("pan"),
            // limit(Limit)
        );
        const querySnapshot = await getDocs(q);
        const tasks: { [key: string]: any }[] = [];
        querySnapshot.forEach((doc) => {
            tasks.push({ ...doc.data(), id: doc.id });
        });
        return NextResponse.json({ tasks });
    }
}
