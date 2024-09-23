import {
    collection,
    query,
    getDocs,
    orderBy,
    deleteDoc,
    doc
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

export async function DELETE(req: NextRequest) { 
    const { id } = await req.json();

    if (!id) {
        return NextResponse.json({ error: "Notice ID is required" }, { status: 400 });
    }

    try { 
        await deleteDoc(doc(db, "notices", id));
        return NextResponse.json({ message: "Notice deleted successfully" }); 
    } catch (error) { 
        console.error("Error deleting notice:", error); 
        return NextResponse.json({ error: "Failed to delete notice" }, { status: 500 }); 
    } 
}
