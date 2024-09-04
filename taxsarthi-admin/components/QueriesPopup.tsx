"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Queries from "./Queries";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";

const accordionData = [
  {
    id: "item-1",
    clientName: "ClientName",
    pan: "BPANS8131R",
    phoneNumber: "9876543210",
    companyType: "Private Co.",
    raisedOn: "04/09/2024",
  },
  {
    id: "item-2",
    clientName: "ClientName",
    pan: "BPANS8131R",
    phoneNumber: "9876543210",
    companyType: "Private Co.",
    raisedOn: "04/09/2024",
  },
  {
    id: "item-3",
    clientName: "ClientName",
    pan: "BPANS8131R",
    phoneNumber: "9876543210",
    companyType: "Private Co.",
    raisedOn: "04/09/2024",
  },
  {
    id: "item-4",
    clientName: "ClientName",
    pan: "BPANS8131R",
    phoneNumber: "9876543210",
    companyType: "Private Co.",
    raisedOn: "04/09/2024",
  },
  {
    id: "item-5",
    clientName: "ClientName",
    pan: "BPANS8131R",
    phoneNumber: "9876543210",
    companyType: "Private Co.",
    raisedOn: "04/09/2024",
  },
  {
    id: "item-6",
    clientName: "ClientName",
    pan: "BPANS8131R",
    phoneNumber: "9876543210",
    companyType: "Private Co.",
    raisedOn: "04/09/2024",
  },
  {
    id: "item-7",
    clientName: "ClientName",
    pan: "BPANS8131R",
    phoneNumber: "9876543210",
    companyType: "Private Co.",
    raisedOn: "04/09/2024",
  },
  {
    id: "item-8",
    clientName: "ClientName",
    pan: "BPANS8131R",
    phoneNumber: "9876543210",
    companyType: "Private Co.",
    raisedOn: "04/09/2024",
  },
  {
    id: "item-9",
    clientName: "ClientName",
    pan: "BPANS8131R",
    phoneNumber: "9876543210",
    companyType: "Private Co.",
    raisedOn: "04/09/2024",
  },
  {
    id: "item-10",
    clientName: "ClientName",
    pan: "BPANS8131R",
    phoneNumber: "9876543210",
    companyType: "Private Co.",
    raisedOn: "04/09/2024",
  },
];

type Status = "pending" | "underprocess" | "resolved" | "";

type AccordionItemData = {
  id: string;
  clientName: string;
  pan: string;
  phoneNumber: string;
  companyType: string;
  raisedOn: string;
};

const QueriesPopup = () => {
  const [statuses, setStatuses] = useState<Record<string, Status>>(
    accordionData.reduce((acc, item) => {
      acc[item.id] = "";
      return acc;
    }, {} as Record<string, Status>)
  );

  const handleStatusChange = (id: string, newStatus: Status) => {
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [id]: newStatus,
    }));
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case "pending":
        return "bg-red-300";
      case "underprocess":
        return "bg-yellow-200";
      case "resolved":
        return "bg-green-400";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Queries />
        </DialogTrigger>
        <DialogContent className="max-h-[80vh] overflow-y-auto p-4">
          <DialogHeader>
            <DialogTitle>Queries</DialogTitle>
            <DialogDescription>
              <div className="p-2">
                <Accordion
                  type="single"
                  className="flex flex-col gap-2"
                  collapsible
                >
                  {accordionData.map((item) => (
                    <AccordionItem
                      key={item.id}
                      className={`border px-2 rounded-lg ${getStatusColor(
                        statuses[item.id]
                      )}`}
                      value={item.id}
                    >
                      <AccordionTrigger className="hover:no-underline flex justify-between">
                        <span>{item.clientName}</span>
                        <div className="flex justify-center gap-2">
                          <span>{item.pan}</span>
                          <span>{item.phoneNumber}</span>
                          <span>{item.companyType}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-2">
                        <Input
                          type="text"
                          placeholder="Query ..."
                          disabled
                        />
                        <Input type="text" placeholder="Feedback by Team ..." />
                        <div className="flex gap-2 justify-center items-center">
                          <Select>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Contacted via" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Contacted via</SelectLabel>
                                <SelectItem value="call">Call</SelectItem>
                                <SelectItem value="whatsapp">
                                  Whatsapp
                                </SelectItem>
                                <SelectItem value="visit">Visit</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <Select
                            onValueChange={(value) =>
                              handleStatusChange(item.id, value as Status)
                            }
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="underprocess">
                                  Under Process
                                </SelectItem>
                                <SelectItem value="resolved">
                                  Resolved
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <p className="text-xs">
                          Raised On:{" "}
                          <span className="font-semibold">{item.raisedOn}</span>
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <Button variant="outline">Add Query</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default dynamic(() => Promise.resolve(QueriesPopup), { ssr: false });
