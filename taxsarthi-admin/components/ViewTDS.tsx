import React from "react";
import { Input } from "./ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Define the data for each quarter and month
const quarters = [
  { label: "Quarter 1", months: ["April", "May", "June"] },
  { label: "Quarter 2", months: ["July", "August", "September"] },
  { label: "Quarter 3", months: ["October", "November", "December"] },
  { label: "Quarter 4", months: ["January", "February", "March"] },
];

// Reusable component for month details
const MonthAccordionItem: React.FC<{ month: string; value: string }> = ({ month, value }) => (
  <AccordionItem className="border-0 bg-slate-900 text-white px-4 rounded-md" value={value}>
    <AccordionTrigger className="text-sm hover:no-underline">{month}</AccordionTrigger>
    <AccordionContent className="flex flex-col gap-2">
      <Input type="number" placeholder="Receipt No. 24G" />
      <Input type="number" placeholder="DDO No. 24G" />
      <Input type="number" placeholder="Date Of Voucher" />
      <Input type="number" placeholder="Tax Deposited" />
    </AccordionContent>
  </AccordionItem>
);

const QuarterSection: React.FC<{ label: string; months: string[] }> = ({ label, months }) => (
  <div className="col-span-1 rounded-lg p-4 m-2">
    <h1 className="mb-2 w-full text-md">{label}</h1>
    <div className="gap-2 flex flex-col">
      <Input type="number" placeholder="Receipt No. (Section 200)" />
      <Input type="number" min={0} placeholder="Salary Credited" />
      <Accordion type="single" className="flex flex-col gap-2" collapsible>
        {months.map((month, index) => (
          <MonthAccordionItem
            key={index}
            month={month}
            value={`item-${index + 1}`}
          />
        ))}
      </Accordion>
    </div>
  </div>
);

const ViewTDS: React.FC = () => {
  return (
    <div className="rounded-lg border h-full flex bg-gray-200 flex-col p-4 m-4">
      <h1 className="border-b border-gray-400 mb-2 w-full text-lg">Tax Paid</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {quarters.map((quarter, index) => (
          <QuarterSection
            key={index}
            label={quarter.label}
            months={quarter.months}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewTDS;
