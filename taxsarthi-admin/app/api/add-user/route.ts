import { db } from "@/lib/firebase";
import { collection, doc, setDoc, query, where, getDocs } from "firebase/firestore";
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const userData = await req.json();
  // console.log("Received userData:", userData); 

  // Check if PAN already exists
  const panQuery = query(collection(db, "users"), where("pan", "==", userData.pan));
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
    const userRef = doc(collection(db, "users"), userData.pan);
    await setDoc(userRef, userData); // Set the document with user data
    return new Response(JSON.stringify({ message: "User added successfully", userId: userData.pan }), {
      status: 201, // Created status code
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error adding user:", error);
    return new Response(JSON.stringify({ error: "Failed to add user" }), {
      status: 500, // Internal Server Error status code
      headers: {
        "content-type": "application/json",
      },
    });
  }
}

export async function PUT(req: NextRequest) {
  const userData = await req.json();
  // console.log("Received userData:", userData); 

  try {
    const userRef = doc(collection(db, "users"), userData.pan);
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

