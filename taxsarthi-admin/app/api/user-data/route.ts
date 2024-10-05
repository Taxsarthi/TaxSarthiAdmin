import {
  collection,
  query,
  where,
  getDocs,
  QuerySnapshot,
  DocumentData,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { NextResponse, NextRequest } from "next/server";

export const listenToUserCount = (setUserCount: (count: number) => void) => {
  const userRef = collection(db, "usersTable");
  const unsubscribe = onSnapshot(userRef, (snapshot) => {
    setUserCount(snapshot.size);
    console.log("User count:", snapshot.size);
  });
  return unsubscribe;
};

export const listenToITRCount = (setITRCount: (count: number) => void) => {
  const itrQuery = query(
    collection(db, "EnquirySheet"),
    where("closedFor", "==", "ITR"),
    where("clientStatus", "==", "Closed")
  );
  const unsubscribe = onSnapshot(itrQuery, (snapshot) => {
    setITRCount(snapshot.size);
    console.log("ITR count:", snapshot.size);
  });
  return unsubscribe;
};

export const listenToTDSCount = (
  setTDSCount: (count: number) => void
) => {
  const tdsQuery = query(
    collection(db, "EnquirySheet"),
    where("closedFor", "==", "ITR + TDS"),
    where("clientStatus", "==", "Closed")
  );
  const unsubscribe = onSnapshot(tdsQuery, (snapshot) => {
    setTDSCount(snapshot.size);
    console.log("TDS count:", snapshot.size);
  });
  return unsubscribe;
};



export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("closedFor");

  console.log("Status:", status);

  let q;

  try {
    const tasks: { [key: string]: any }[] = [];

    // If 'status' is 'itr', fetch from EnquirySheet
    if (status === "itr") {
      q = query(
        collection(db, "EnquirySheet"),
        where("closedFor", "==", "ITR")
      );

      // Fetching data from EnquirySheet and corresponding data from usersTable
      const enquiryQuerySnapshot = await getDocs(q);
      for (const enquiryDoc of enquiryQuerySnapshot.docs) {
        const enquiryData = enquiryDoc.data();
        const pan = enquiryData.pan; // Assuming pan is the identifier

        // Querying usersTable for matching PAN
        const userQuery = query(
          collection(db, "usersTable"),
          where("pan", "==", pan)
        );
        const userSnapshot = await getDocs(userQuery);

        let userData: { [key: string]: any } = {};
        userSnapshot.forEach((userDoc) => {
          userData = userDoc.data(); // Assuming there's only one document for a given PAN
        });

        tasks.push({
          ...userData, // Adding the related userTable data
          enquiryData, // Adding the EnquirySheet data
          id: enquiryDoc.id,
        });
      }
    } 
    // If status is 'itr tds', fetch users with specific clientStatus and closedFor values and data from tdsSheet
    else if (status === "itr tds") {
      q = query(
        collection(db, "EnquirySheet"),
        where("closedFor", "==", "ITR + TDS"),
        where("clientStatus", "==", "Closed") 
      );

      // Fetching data from EnquirySheet and corresponding data from usersTable and tdsSheet
      const enquiryQuerySnapshot = await getDocs(q);

      for (const enquiryDoc of enquiryQuerySnapshot.docs) {
        const enquiryData = enquiryDoc.data();
        const pan = enquiryData.pan; // Assuming pan is the identifier

        // Querying usersTable for matching PAN
        const userQuery = query(
          collection(db, "usersTable"),
          where("pan", "==", pan)
        );
        const userSnapshot = await getDocs(userQuery);

        let userData: { [key: string]: any } = {};
        userSnapshot.forEach((userDoc) => {
          userData = userDoc.data(); // Assuming there's only one document for a given PAN
        });

        // Querying tdsSheet for matching PAN
        const tdsQuery = query(
          collection(db, "tdsSheet"),
          where("pan", "==", pan)
        );
        const tdsSnapshot = await getDocs(tdsQuery);

        let tdsData: { [key: string]: any } = {};
        tdsSnapshot.forEach((tdsDoc) => {
          tdsData = tdsDoc.data(); // Assuming there's only one document for a given PAN
        });

        tasks.push({
          ...userData, // Adding the related userTable data
          enquiryData, // Adding the EnquirySheet data
          tdsData, // Adding the tdsSheet data
          id: enquiryDoc.id,
        });
      }
    } else {
      // In the last case, fetch all users from usersTable and also related EnquirySheet data
      const userQuerySnapshot = await getDocs(collection(db, "usersTable"));

      for (const userDoc of userQuerySnapshot.docs) {
        const userData = userDoc.data();
        const pan = userData.pan; // Assuming pan is the identifier

        // Querying EnquirySheet for matching PAN
        const enquiryQuery = query(
          collection(db, "EnquirySheet"),
          where("pan", "==", pan)
        );
        const enquirySnapshot = await getDocs(enquiryQuery);

        let enquiryData: { [key: string]: any } = {};
        enquirySnapshot.forEach((enquiryDoc) => {
          enquiryData = enquiryDoc.data(); // Assuming there's only one document for a given PAN
        });

        tasks.push({
          ...userData, // Adding the related userTable data
          enquiryData, // Adding the related EnquirySheet data (if exists)
          id: userDoc.id,
        });
      }
    }

    return NextResponse.json({ tasks });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}