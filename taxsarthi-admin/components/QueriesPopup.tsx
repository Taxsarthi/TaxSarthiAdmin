"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Status = "pending" | "underprocess" | "resolved" | "";

type AccordionItemData = {
  id: string;
  clientName: string;
  pan: string;
  phone: string;
  query: string;
  raisedOn: string; // Converted to string
  deleteOn: string; // Converted to string
  resolution: string;
  resolvedBy: string; // Added resolvedBy field
  status: Status;
  userType: string;
};

const QueriesPopup = () => {
  const [accordionData, setAccordionData] = useState<AccordionItemData[]>([]);
  const [statuses, setStatuses] = useState<Record<string, Status>>({});

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const q = query(collection(db, "queries"));
        const querySnapshot = await getDocs(q);
        const tasks: AccordionItemData[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as AccordionItemData;

          // Convert Firestore timestamps to readable strings
          const raisedOnDate = (data.raisedOn as any).seconds
            ? new Date((data.raisedOn as any).seconds * 1000).toLocaleString()
            : '';

          const deleteOnDate = (data.deleteOn as any).seconds
            ? new Date((data.deleteOn as any).seconds * 1000).toLocaleString()
            : '';

          tasks.push({
            ...data,
            id: doc.id,
            raisedOn: raisedOnDate,
            deleteOn: deleteOnDate,
          });
        });
        // console.log("Fetched tasks:", tasks); // Debugging log
        setAccordionData(tasks);
        setStatuses(tasks.reduce((acc, item) => {
          acc[item.id] = item.status; // Initialize with status from Firestore
          return acc;
        }, {} as Record<string, Status>));
      } catch (error) {
        console.error("Error fetching queries:", error);
      }
    };

    fetchQueries();
  }, []);

  const updateQuery = async (id: string, updates: Partial<AccordionItemData>) => {
    try {
      const response = await fetch('/api/queries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, updates }),
      });

      if (!response.ok) {
        throw new Error('Failed to update query');
      }

      const result = await response.json();
      // console.log(result.message); // Optional: handle success message
    } catch (error) {
      console.error("Error updating query:", error);
    }
  };

  const handleStatusChange = async (id: string, newStatus: Status) => {
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [id]: newStatus,
    }));
    await updateQuery(id, { status: newStatus }); // Update Firestore via API
  };

  const handleResolvedByChange = async (id: string, newResolvedBy: string) => {
    setAccordionData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, resolvedBy: newResolvedBy } : item
      )
    );
    await updateQuery(id, { resolvedBy: newResolvedBy }); // Update Firestore via API
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case "pending":
        return "border border-red-500 bg-red-100";
      case "underprocess":
        return "border border-yellow-500 bg-yellow-100";
      case "resolved":
        return "border border-green-500 bg-green-100";
      default:
        return "border border-gray-500 bg-gray-100";
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Queries />
        </DialogTrigger>
        <DialogContent className="max-h-[80vh] min-w-[70%] overflow-y-auto p-4">
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
                        <span>{item.clientName || 'Client'}</span>
                        <div className="flex justify-center gap-2">
                          <span>{item.pan}</span>|
                          <span>{item.phone}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-2">
                        <Input type="text" className="font-bold text-black" value={item.query} placeholder="Query ..." disabled />
                        <Input type="text" placeholder="Feedback by Team ..." />
                        <div className="flex gap-2 justify-center items-center">
                          <Select
                            value={item.resolvedBy} // Set value from item
                            onValueChange={async (value) =>
                              await handleResolvedByChange(item.id, value)
                            }
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Contacted via" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Resolved By</SelectLabel>
                                <SelectItem value="call">Call</SelectItem>
                                <SelectItem value="whatsapp">Whatsapp</SelectItem>
                                <SelectItem value="visit">Visit</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <Select
                            value={statuses[item.id]} // Set value from state
                            onValueChange={async (value) =>
                              await handleStatusChange(item.id, value as Status)
                            }
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="underprocess">Under Process</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <p className="text-xs">
                          Raised On: <span className="font-semibold">{item.raisedOn}</span>
                        </p>
                        <p className="text-xs">
                          Delete On: <span className="font-semibold">{item.deleteOn}</span>
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="default">Add Query</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default dynamic(() => Promise.resolve(QueriesPopup), { ssr: false });
