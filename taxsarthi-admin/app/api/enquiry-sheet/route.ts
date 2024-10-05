import { NextRequest } from 'next/server';
import { doc, updateDoc, setDoc, collection, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function PUT(req: NextRequest) {
    const updateData = await req.json();

    // Extract PAN from the request body
    const pan = updateData.pan;

    try {
        // Reference to the EnquirySheet document
        const enquiryRef = doc(db, "EnquirySheet", pan);

        // Fetch the existing document
        const existingDoc = await getDoc(enquiryRef);
        const existingData = existingDoc.data() || {}; // Fallback to an empty object if document doesn't exist

        // Create a filtered object with only the fields that are provided
        const updateFields = Object.entries(updateData)
            .filter(([key, value]) => value !== undefined) // Only keep fields with defined values
            .reduce((acc: { [key: string]: any }, [key, value]) => {
                acc[key] = value; // Construct the update object
                return acc;
            }, {});

        // Update the fields in EnquirySheet
        await updateDoc(enquiryRef, updateFields);

        // Check the conditions for creating the TDS sheet
        if (
            // updateData.clientStatus === 'Closed' && 
            updateData.closedFor === 'ITR + TDS'
            // (existingData.clientStatus !== 'Closed' || existingData.closedFor !== 'ITR + TDS')
        ) {
            const tdsSheetData = {
                pan: pan,
                // Initialize all fields to null if required
                managedBy: null,
                incomeDetails: null,
                deductionDetails: null,
                taxDetails: null,
                computationITA: null,
                packageCall: null,
                consultedBy: null,
                packageClosure: null,
                remarks: null,
            };

            // Reference to the tdsSheet document
            const tdsSheetRef = doc(collection(db, "tdsSheet"), pan);
            await setDoc(tdsSheetRef, tdsSheetData);
        }

        return new Response(JSON.stringify({ message: "Enquiry sheet updated successfully" }), {
            status: 200,
            headers: {
                "content-type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error updating enquiry sheet or creating tds sheet:", error);
        return new Response(JSON.stringify({ error: "Failed to update enquiry sheet or create tds sheet" }), {
            status: 500,
            headers: {
                "content-type": "application/json",
            },
        });
    }
}