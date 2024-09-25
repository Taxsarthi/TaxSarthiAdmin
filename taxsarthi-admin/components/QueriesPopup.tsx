"use client";
import React, { useState, useEffect } from "react";
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
import Loader from "./ui/loader";

type Status = "pending" | "underprocess" | "resolved" | "";

type AccordionItemData = {
  id: string;
  clientName: string;
  pan: string;
  phone: string;
  query: string;
  raisedOn: string | { seconds: number };
  resolution: string;
  resolvedBy: string;
  status: Status;
  userType: string;
};

const statusColors: Record<Status, string> = {
  pending: "bg-red-200 border border-red-500",
  underprocess: "bg-yellow-200 border border-yellow-500",
  resolved: "bg-green-200 border border-green-500",
  "": "bg-gray-200 border border-gray-500",
};

const QueriesPopup = () => {
  const [accordionData, setAccordionData] = useState<AccordionItemData[]>([]);
  const [newQuery, setNewQuery] = useState<AccordionItemData>({
    id: "",
    clientName: "",
    pan: "",
    phone: "",
    query: "",
    raisedOn: new Date().toISOString(),
    resolution: "",
    resolvedBy: "",
    status: "",
    userType: "",
  });
  const [isNewQueryOpen, setIsNewQueryOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  useEffect(() => {
    const fetchQueries = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch("/api/queries");
        if (!response.ok) throw new Error("Failed to fetch queries");
        const data = await response.json();

        const formattedData = data.map((item: AccordionItemData) => ({
          ...item,
          raisedOn:
            typeof item.raisedOn === "object" && "seconds" in item.raisedOn
              ? new Date(item.raisedOn.seconds * 1000).toLocaleString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  hour12: true,
                  timeZone: "Asia/Kolkata",
                })
              : item.raisedOn,
        }));

        setAccordionData(formattedData);
      } catch (error) {
        console.error("Error fetching queries:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchQueries();
  }, []);

  const updateQuery = async (
    id: string,
    updates: Partial<AccordionItemData>
  ) => {
    try {
      const response = await fetch("/api/queries", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, updates }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error updating query:", error);
    }
  };

  const handleStatusChange = async (id: string, newStatus: Status) => {
    await updateQuery(id, { status: newStatus });
    setAccordionData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  const handleResolvedByChange = async (id: string, newResolvedBy: string) => {
    await updateQuery(id, { resolvedBy: newResolvedBy });
    setAccordionData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, resolvedBy: newResolvedBy } : item
      )
    );
  };

  const handleFeedbackChange = async (id: string, feedback: string) => {
    await updateQuery(id, { resolution: feedback });
    setAccordionData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, resolution: feedback } : item
      )
    );
  };

  const handleAddQuery = async () => {
    try {
      const response = await fetch("/api/queries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuery),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        return;
      }

      setAccordionData((prev) => [...prev, { ...newQuery, id: newQuery.pan }]);
      resetNewQuery();
      setIsNewQueryOpen(false);
    } catch (error) {
      setError("Error adding new query.");
      console.error("Error adding new query:", error);
    }
  };

  const resetNewQuery = () => {
    setNewQuery({
      id: "",
      clientName: "",
      pan: "",
      phone: "",
      query: "",
      raisedOn: new Date().toISOString(),
      resolution: "",
      resolvedBy: "",
      status: "",
      userType: "",
    });
    setError(null);
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
                {loading ? ( 
                  <Loader/>
                ) : (
                  <Accordion
                    type="single"
                    className="flex flex-col gap-2"
                    collapsible
                  >
                    {accordionData.map((item) => (
                      <AccordionItem
                        key={item.id}
                        className={`border px-2 rounded-lg ${
                          statusColors[item.status]
                        }`}
                        value={item.id}
                      >
                        <AccordionTrigger className="hover:no-underline flex justify-between">
                          <span>{item.clientName || "Client"}</span>
                          <div className="flex justify-center gap-2">
                            <span>{item.pan}</span>|<span>{item.phone}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-2">
                          <Input
                            type="text"
                            className="font-bold text-black"
                            value={item.query}
                            placeholder="Query ..."
                            disabled
                          />
                          <Input
                            type="text"
                            placeholder="Feedback by Team ..."
                            onChange={(e) =>
                              handleFeedbackChange(item.id, e.target.value)
                            }
                          />
                          <div className="flex gap-2 justify-center items-center">
                            <Select
                              value={item.resolvedBy}
                              onValueChange={(value) =>
                                handleResolvedByChange(item.id, value)
                              }
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Contacted via" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Resolved By</SelectLabel>
                                  <SelectItem value="call">Call</SelectItem>
                                  <SelectItem value="whatsapp">
                                    Whatsapp
                                  </SelectItem>
                                  <SelectItem value="visit">Visit</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <Select
                              value={item.status}
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
                                  <SelectItem value="pending">
                                    Pending
                                  </SelectItem>
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
                            <span className="font-semibold">
                              {typeof item.raisedOn === "string"
                                ? item.raisedOn
                                : ""}
                            </span>
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                    {isNewQueryOpen && (
                      <AccordionItem
                        className="border px-2 rounded-lg"
                        value="new-query"
                      >
                        <AccordionTrigger className="flex justify-between">
                          <span>Add New Query</span>
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-2">
                          <div className="grid grid-cols-3 gap-2">
                            <Input
                              type="text"
                              placeholder="Client Name"
                              value={newQuery.clientName}
                              onChange={(e) =>
                                setNewQuery({
                                  ...newQuery,
                                  clientName: e.target.value,
                                })
                              }
                            />
                            <Input
                              type="text"
                              placeholder="PAN"
                              value={newQuery.pan}
                              onChange={(e) =>
                                setNewQuery({
                                  ...newQuery,
                                  pan: e.target.value,
                                })
                              }
                            />
                            <Input
                              type="text"
                              placeholder="Phone"
                              value={newQuery.phone}
                              onChange={(e) =>
                                setNewQuery({
                                  ...newQuery,
                                  phone: e.target.value,
                                })
                              }
                            />
                          </div>
                          <Input
                            type="text"
                            placeholder="Query"
                            value={newQuery.query}
                            onChange={(e) =>
                              setNewQuery({
                                ...newQuery,
                                query: e.target.value,
                              })
                            }
                          />
                          <Input
                            type="text"
                            placeholder="User Type"
                            value={newQuery.userType}
                            onChange={(e) =>
                              setNewQuery({
                                ...newQuery,
                                userType: e.target.value,
                              })
                            }
                          />
                          {error && <p className="text-red-500">{error}</p>}
                          <Button onClick={handleAddQuery}>Add Query</Button>
                        </AccordionContent>
                      </AccordionItem>
                    )}
                  </Accordion>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QueriesPopup;
