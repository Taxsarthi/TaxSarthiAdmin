"use client";
import QueriesPopup from "@/components/QueriesPopup";
import Search from "@/components/Search";
import DataTable from "@/components/Table";
import { Button } from "@/components/ui/button";
import Upload from "@/components/Upload";
import UsersCards from "@/components/UsersCards";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

type UserTask = {
  id: string;
  name: string;
  mobile: number;
  pan: string;
  itrType: string;
  area: string;
  city: string;
  Fees: number;
  PaidFees: number;
  PendingFees: number;
  assign?: string;
  lastStatus?: string;
  srNo?: number;
};

const page: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<UserTask[]>([]);

  const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setSearchText(event.target.value);
  };

  const fetchPunchedData = async () => {
    setIsLoading(true); // Start loading
    try {
      const punchedRes = await fetch("/api/user-data?status=punched");
      if (!punchedRes.ok) throw new Error("Failed to fetch punched data");
      const punchedData = await punchedRes.json();
      // console.log("Punched Data:", punchedData);

      const punchedTasks = punchedData?.tasks || [];

      const usersRes = await fetch("/api/user-data");
      if (!usersRes.ok) throw new Error("Failed to fetch user data");
      const usersData = await usersRes.json();
      // console.log("User Data:", usersData);

      const usersTasks = usersData?.tasks || [];
      const usersMap = new Map(
        usersTasks.map((user: UserTask) => [user.id, user])
      );

      const updatedTasks = punchedTasks.map(
        (punchedTask: UserTask, index: number) => {
          const userDetails = usersMap.get(punchedTask.id) || {};
          return {
            ...userDetails,
            ...punchedTask,
            srNo: index + 1,
          };
        }
      );

      setFilteredData(updatedTasks);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const fetchTableData = async (type: string) => {
    setIsLoading(true); // Start loading
    try {
      if (type === "punched") {
        await fetchPunchedData();
        return;
      }

      const res = await fetch("/api/user-data");
      const data = await res.json();
      const tasks = data?.tasks || [];

      const updatedTasks = tasks.map((task: UserTask, index: number) => ({
        ...task,
        srNo: index + 1,
      }));

      const filteredTasks = updatedTasks.filter((task: UserTask) => {
        if (type === "assigned") return task.assign;
        return true; // Show all for "all"
      });

      const finalTasks = filteredTasks.map((task: UserTask, index: number) => ({
        ...task,
        srNo: index + 1,
      }));

      setFilteredData(finalTasks);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const handleCardClick = (type: string) => {
    fetchTableData(type);
  };

  useEffect(() => {
    fetchTableData("all");
  }, []);

  const filteredRows = filteredData.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleExport = () => {
    const exportData = filteredRows.map(
      ({
        name,
        mobile,
        pan,
        itrType,
        area,
        city,
        Fees,
        PaidFees,
        PendingFees,
        assign,
        lastStatus,
      }) => ({
        name,
        mobile,
        pan,
        itrType,
        area,
        city,
        Fees,
        PaidFees,
        PendingFees,
        assign,
        lastStatus,
      })
    );

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "user_data.xlsx");
  };

  return (
    <div className="mx-4">
      <div className="flex flex-col md:flex-row justify-between">
        <UsersCards onCardClick={handleCardClick} />
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
            <Button variant="default" onClick={handleExport}>
              Download
            </Button>
          </div>
        </div>
        <div>
          {/* {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <span>Loading...</span> 
            </div>
          ) : ( */}
          <DataTable loading={isLoading} rows={filteredRows} />
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default page;
