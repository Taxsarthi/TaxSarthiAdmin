import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { PDFDocument, rgb } from "pdf-lib"
const { toWords } = require("number-to-words");

function numberToWords(num) {
  const words = toWords(num).toLowerCase().split(" ");
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalizedWords.join(" "); 
}

function getFormattedDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yyyy = today.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

export const modifyAndDownloadPDF = async (pan) => {
    try {
      console.log("Fetching data for PAN:", pan); // Log the PAN being processed
  
      const userRef = doc(db, "users", pan);
      const userSnap = await getDoc(userRef);
  
      if (!userSnap.exists()) {
        console.error("User document not found for PAN:", pan);
        return;
      }
      const userData = userSnap.data();
      const { name, policeStation, mobile } = userData;
  
      const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;
      const docRef = doc(db, currentYear.toString(), pan);
  
      const Snap = await getDoc(docRef);
  
      if (!Snap.exists()) {
        console.error("Invoice document not found for PAN:", pan);
        return;
      }
      
      const Data = Snap.data();
      const { services, discount, PaidFees, actualFees, Fees, invNo } = Data;
      const totalPayable = Fees - PaidFees;
  
      const existingPdfBytes = await fetch("/assets/Invoice Format Blank.pdf").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch PDF template");
        return res.arrayBuffer();
      });
  
      // Load the existing PDF as a PDFDocument
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const page = pdfDoc.getPages()[0];
  
      // Drawing user details and invoice data
      // (Existing drawing logic here...)
  
      // Save the modified PDF as a Uint8Array
      const modifiedPdfBytes = await pdfDoc.save();
  
      // Create a Blob from the Uint8Array
      const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
  
      // Create a URL for the Blob object
      const url = URL.createObjectURL(blob);
  
      // Create an anchor element to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice_${pan}.pdf`;
      a.style.display = "none";
  
      // Append the anchor element to the document body and click it programmatically
      document.body.appendChild(a);
      a.click();
  
      // Clean up by removing the anchor element and revoking the URL
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error modifying and downloading PDF for PAN:", pan, error);
    }
  };
  

