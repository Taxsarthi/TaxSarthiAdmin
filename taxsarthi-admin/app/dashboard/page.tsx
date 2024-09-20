"use client";
import QueriesPopup from "@/components/QueriesPopup";
import Search from "@/components/Search";
import DataTable from "@/components/Table";
import { Button } from "@/components/ui/button";
import Upload from "@/components/Upload";
import UsersCards from "@/components/UsersCards";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type UserTask = {
  id: string;
  name: string;
  mobile: number;
  pan: string;
  itrType: string;
  area: string;
  city: string;
  fees: number;
  paidFees: number;
  pendingFees: number;
  assign?: string;
  status?: string;
  srNo?: number;
};

const page: React.FC = () => {
  const [tableData, setTableData] = useState<UserTask[]>([]);
  const [searchText, setSearchText] = useState("");

  const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setSearchText(event.target.value);
  };

  const filteredRows = tableData.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const fetchTableData = async () => {
    const res = await fetch("/api/user-data");
    const data = await res.json();
    const tasks = data?.tasks || [];

    // Add serial numbers
    const updatedTasks = tasks.map((task: UserTask, index: number) => ({
      ...task,
      srNo: index + 1,
    }));

    setTableData(updatedTasks);
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const handleDownload = () => {
    console.log("Download button clicked");
  };

  return (
    <div className="mx-4">
      <div className="flex flex-col md:flex-row justify-between">
        <UsersCards setDisplayedType={(type: string) => console.log(type)} />
        <div className="grid grid-cols-2 gap-4 m-4">
          <QueriesPopup />
          <Link href="/punchedusers">
            <Upload />
          </Link>
        </div>
      </div>
      <div>
        <div className="flex flex-col-reverse my-4 md:flex-row md:justify-between items-center">
          <div className="w-[30%]">
            <Search handleSearchChange={handleSearchChange} />
          </div>
          <div className="flex gap-4">
            <Button variant="default">
              <Link href="/adduser">Add User</Link>
            </Button>
            <Button variant="default" onClick={handleDownload}>
              Download
            </Button>
          </div>
        </div>
        <div>
          <DataTable rows={filteredRows} />
        </div>
      </div>
    </div>
  );
};

export default page;
