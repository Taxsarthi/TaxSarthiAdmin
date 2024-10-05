import { auth, db } from "@/lib/firebase";
import { collection, doc, setDoc, query, where, getDocs } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) { 
  const userData = await req.json();

  // Check if PAN already exists
  const panQuery = query(collection(db, "usersTable"), where("pan", "==", userData.pan));
  const querySnapshot = await getDocs(panQuery);

  if (!querySnapshot.empty) {
    return new Response(JSON.stringify({ exists: true }), {
      status: 409, 
      headers: {
        "content-type": "application/json",
      },
    });
  }

  try {
    const userRef = doc(collection(db, "usersTable"), userData.pan);
    await setDoc(userRef, userData);
    const user = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
    console.log(user);

    // Create corresponding EnquirySheet document
    const enquirySheetData = {
      pan: userData.pan,
      clientStatus: null,  // Set initial values as null
      closedBy: null,
      assignedTo: null,
      closedFor: null,
      Status: null,
      Remark: null,
    };
    const enquiryRef = doc(collection(db, "EnquirySheet"), userData.pan);
    await setDoc(enquiryRef, enquirySheetData);

    return new Response(JSON.stringify({ message: "User and enquiry sheet added successfully", userId: userData.pan }), {
      status: 201,
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error adding user or enquiry sheet:", error);
    return new Response(JSON.stringify({ error: "Failed to add user or enquiry sheet" }), {
      status: 500,
      headers: {
        "content-type": "application/json",
      },
    });
  }
}

export async function PUT(req: NextRequest) {
  const userData = await req.json();

  try {
    const userRef = doc(collection(db, "usersTable"), userData.pan);
    await setDoc(userRef, userData, { merge: true }); // Merge the document with user data
    return new Response(JSON.stringify({ userId: userData.pan }), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(JSON.stringify({ error: "Failed to update user" }), {
      status: 500, // Internal Server Error status code
      headers: {
        "content-type": "application/json",
      },
    });
  }
}

