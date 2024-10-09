export const statusOptions = [
    "Manager Assigned",
    "ITR Password Generated",
    "Data Entered",
    "Data Punched",
    "Verification",
    "ITR Filed",
    "ITR Pending",
    "Refund Processed",
  ];

export const divisionOptions = [
    { label: "Pune", value: "Pune", color: "#3CB371" }, // Green
    { label: "Kokan", value: "Kokan", color: "#A9A9A9" }, // Dark Gray
    { label: "Aurangabad", value: "Aurangabad", color: "#483D8B" }, // Dark Slate Blue
    { label: "Nasik", value: "Nasik", color: "#FFD700" }, // Gold
    { label: "Amravati", value: "Amravati", color: "#FF69B4" }, // Hot Pink
    { label: "Nagpur", value: "Nagpur", color: "#FFA500" }, // Orange
    { label: "Goa", value: "Goa", color: "#C0C0C0" }, // Silver
  ];
  
 export const clientStatusOptions = [
    { label: "Closed", value: "Closed", color: "#3CB371" }, // Parrot Green
    { label: "Pending", value: "Pending", color: "#FFD700" }, // Bright Yellow
    { label: "Left", value: "Left", color: "#C70039" }, // Dark Red
    { label: "Interested - Know More", value: "Interested - Know More", color: "#1E90FF" }, // Dodger Blue
  ];
  
 export const statusClosedOptions = [
    { label: "ITR + TDS", value: "ITR + TDS" },
    { label: "ITR", value: "ITR" },
  ];
  
 export const assignOptions = process.env.NEXT_PUBLIC_OPS_EMAILS
    ? process.env.NEXT_PUBLIC_OPS_EMAILS.split(",").map((email) => ({
        label: formatDisplayName(email),
        value: email.trim(),
      }))
    : [];

export function formatDisplayName(email: string) {
        return email
          .split("+")[0] // Get the part before the +
          .split("@")[0] // Get the part before the @
          .split(".")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(" ");
}

export const incomeDetailsOptions = [
    { label: "Imported", value: "Imported", color: "#3CB371" }, // Green
    { label: "Pending", value: "Pending", color: "#FFD700" }, // Gold
    { label: "Error", value: "Error", color: "#C70039" }, // Dark Red
];

export const deductionDetailsOptions = [
    { label: "Imported", value: "Imported", color: "#3CB371" }, // Green
    { label: "Pending", value: "Pending", color: "#FFD700" }, // Gold
    { label: "Error", value: "Error", color: "#C70039" }, // Dark Red
];

export const taxDetailsOptions = [
    { label: "Imported", value: "Imported", color: "#3CB371" }, // Green
    { label: "Pending", value: "Pending", color: "#FFD700" }, // Gold
    { label: "Error", value: "Error", color: "#C70039" }, // Dark Red
];
// computationITA(downloaded,sent,pending,error)(download button)
// packageCall(consulted, pending, not responding, error & issue)
export const computationITAOptions = [
    { label: "Downloaded", value: "Downloaded", color: "#3CB371" }, // Green
    { label: "Sent", value: "Sent", color: "#FFD700" }, // Gold
    { label: "Pending", value: "Pending", color: "#FFA500" }, // Orange
    { label: "Error", value: "Error", color: "#C70039" }, // Dark Red
];

export const packageCallOptions = [
    { label: "Consulted", value: "Consulted", color: "#3CB371" }, // Green
    { label: "Pending", value: "Pending", color: "#FFD700" }, // Gold
    { label: "Not Responding", value: "Not Responding", color: "#FFA500" }, // Orange
    { label: "Error & Issue", value: "Error & Issue", color: "#C70039" }, // Dark Red
];

// packageClosure(Agreed for plan, Pending approval, Agreed for policy, Denied for Anything, Faulty Client - Be Aware, Pay TDS Also)
export const packageClosureOptions = [
    { label: "Agreed for plan", value: "Agreed for plan", color: "#3CB371" }, // Green
    { label: "Pending approval", value: "Pending approval", color: "#FFD700" }, // Gold
    { label: "Agreed for policy", value: "Agreed for policy", color: "#FFA500" }, // Orange
    { label: "Denied for Anything", value: "Denied for Anything", color: "#C70039" }, // Dark Red
    { label: "Faulty Client - Be Aware", value: "Faulty Client - Be Aware", color: "#C70039" }, // Dark Red
    { label: "Pay TDS Also", value: "Pay TDS Also", color: "#C70039" }, // Dark Red
];
