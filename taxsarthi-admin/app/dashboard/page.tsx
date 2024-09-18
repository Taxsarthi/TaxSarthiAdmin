"use client"
import QueriesPopup from "@/components/QueriesPopup";
import Search from "@/components/Search";
import DataTable from "@/components/Table"; // Ensure DataTable accepts props
import { Button } from "@/components/ui/button";
import Upload from "@/components/Upload";
import UsersCards from "@/components/UsersCards";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {};

const Page = (props: Props) => {
  const [tableData, setTableData] = useState([]);
  
  // Fetching data (placeholder function)
  const fetchTableData = async () => {
    const res = await fetch("/api/user-data");
    const data = await res.json();
    setTableData(data?.tasks || []);
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const handleDownload = () => {
    // Implement your download logic here
    console.log("Download button clicked");
  };

  return (
    <div className="mx-4">
      <div className="flex flex-col md:flex-row justify-between">
        <UsersCards />
        <div className="grid grid-cols-2 gap-4 m-4">
          <QueriesPopup />
          <Link href="/punchedusers">
            <Upload />
          </Link>
        </div>
      </div>
      <div>
        <div className="flex flex-col-reverse my-4 md:flex-row md:justify-between items-center">
          <Search />
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
          <DataTable rows={tableData} /> {/* Pass data to DataTable */}
        </div>
      </div>
    </div>
  );
};

export default Page;
