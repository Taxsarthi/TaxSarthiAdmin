import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { PDFDocument, rgb } from "pdf-lib";
const { toWords } = require("number-to-words");

function numberToWords(num) {
  const words = toWords(num).toLowerCase().split(" ");
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalizedWords.join(" "); 
}

function getFormattedDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

export const modifyAndDownloadPDF = async (pan) => {
  try {
    console.log("Fetching data for PAN:", pan);
  
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
  
    const snap = await getDoc(docRef);
  
    if (!snap.exists()) {
      console.error("Invoice document not found for PAN:", pan);
      return;
    }
    
    const data = snap.data();
    const { services, discount, PaidFees, actualFees, Fees, invNo } = data;
    const totalPayable = Fees - PaidFees;

    const existingPdfBytes = await fetch("/assets/Invoice Format Blank.pdf").then((res) => {
      if (!res.ok) throw new Error("Failed to fetch PDF template");
      return res.arrayBuffer();
    });

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const page = pdfDoc.getPages()[0];

    const priceMap = {
      itrBusiness: 6000,
      itrNil: 0,
      itrSalary: 2500,
      portalFee: 299,
      sharesBelow10L: 2000,
      sharesBelow20L: 3000,
      sharesBelow5L: 1000,
    };

    const renamedPriceMap = {
      itrBusiness: "Income Tax Return - Business",
      itrNil: "Income Tax Return - Nil",
      itrSalary: "Income Tax Return - Salary",
      portalFee: "Portal Fee",
      sharesBelow10L: "Shares Below 10 Lakhs",
      sharesBelow20L: "Shares Below 20 Lakhs",
      sharesBelow5L: "Shares Below 5 Lakhs",
    };

    page.drawText(`${name}`, { x: 10, y: page.getHeight() - 142, size: 12, color: rgb(0, 0, 0) });
    page.drawText(`${policeStation}`, { x: 10, y: page.getHeight() - 175, size: 12, color: rgb(0, 0, 0) });
    page.drawText(`${mobile}`, { x: 60, y: page.getHeight() - 207, size: 12, color: rgb(0, 0, 0) });

    for (let i = 0; i < services.length; i++) {
      const service = services[i];
      const { name } = service;

      if (priceMap.hasOwnProperty(name)) {
        const price = priceMap[name];
        const serviceName = renamedPriceMap[name];

        page.drawText(`${serviceName}`, { x: 20, y: page.getHeight() - (270 + i * 30), size: 12, color: rgb(0, 0, 0) });
        page.drawText(`Rs. ${price}`, { x: 400, y: page.getHeight() - (270 + i * 30), size: 12, color: rgb(0, 0, 0) });
        page.drawText(`Rs. ${price}`, { x: 500, y: page.getHeight() - (270 + i * 30), size: 12, color: rgb(0, 0, 0) });
      }
      page.drawText("01", { x: 300, y: page.getHeight() - (270 + i * 30), size: 12, color: rgb(0, 0, 0) });
    }

    page.drawText(`INV${invNo.toString().padStart(2, "0")}`, { x: 375, y: page.getHeight() - 147, size: 12, color: rgb(0, 0, 0) });
    page.drawText(`${getFormattedDate()}`, { x: 355, y: page.getHeight() - 175, size: 12, color: rgb(0, 0, 0) });

    page.drawText(`Rs. ${discount} /-`, { x: 500, y: page.getHeight() - 470, size: 12, color: rgb(0, 0, 0) });
    page.drawText(`Rs. ${actualFees} /-`, { x: 500, y: page.getHeight() - 440, size: 12, color: rgb(0, 0, 0) });
    page.drawText(`Rs. ${PaidFees} /-`, { x: 500, y: page.getHeight() - 500, size: 12, color: rgb(0, 0, 0) });
    page.drawText(`Rs. ${totalPayable}/-`, { x: 500, y: page.getHeight() - 530, size: 12, color: rgb(1, 1, 1) });

    if (totalPayable > 0) {
      page.drawText(`INR ${numberToWords(totalPayable)} Only`, { x: 260, y: page.getHeight() - 555, size: 8, color: rgb(0, 0, 0) });
    } else {
      // Optionally draw an empty string or perform other actions if needed
      page.drawText(``, { x: 260, y: page.getHeight() - 555, size: 11, color: rgb(0, 0, 0) }); // This line can be omitted
    }
    
    const modifiedPdfBytes = await pdfDoc.save();
    const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice_${pan}.pdf`;
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error modifying and downloading PDF for PAN:", pan, error);
  }
};
