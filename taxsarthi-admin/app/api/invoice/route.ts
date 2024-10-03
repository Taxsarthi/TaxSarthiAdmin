import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const db = getFirestore();

  try {
    const invoiceDocRef = doc(db, "invoice", "INV");
    const invoiceDoc = await getDoc(invoiceDocRef);

    if (!invoiceDoc.exists()) {
      return NextResponse.json({ error: "Invoice document not found" }, { status: 404 });
    }

    const { currentInvNo } = invoiceDoc.data();
    return NextResponse.json({ invnumber: currentInvNo });
  } catch (error) {
    console.error("Error fetching invoice number:", error);
    return NextResponse.json({ error: "Failed to fetch invoice number" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
    const db = getFirestore();
  
    try {
      const { currentInvNumber } = await req.json();
  
      const invoiceDocRef = doc(db, "invoice", "INV");
      await updateDoc(invoiceDocRef, {
        currentInvNo: currentInvNumber + 1, 
      });
  
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Error incrementing invoice number:", error);
      return NextResponse.json({ error: "Failed to increment invoice number" }, { status: 500 });
    }
  }