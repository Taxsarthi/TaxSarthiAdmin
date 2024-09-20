'use client'
import PunchedUsersTable from "@/components/PunchedUsersTable";
import Search from "@/components/Search";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState, useEffect } from "react";

type UserTask = {
  srNo?: number;
  [key: string]: any;
};

type Props = {};

const page: React.FC<Props> = (props: Props) => {
  const [searchText, setSearchText] = useState("");
  const [tableData, setTableData] = useState<UserTask[]>([]);

  useEffect(() => {
    fetchPunchedData();
  }, []);

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setSearchText(event.target.value);
  };
  const filteredRows = tableData.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );
  const fetchPunchedData = async () => {
    const res = await fetch("/api/user-data?status=punched");
    const data = await res.json();
    const tasks = data?.tasks || [];

    // Add serial numbers
    const updatedTasks = tasks.map((task: UserTask, index: number) => ({
      ...task,
      srNo: index + 1,
    }));

    setTableData(updatedTasks);
  };
  return (
    <div className="m-4 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-center mb-6 gap-6">
        <h1 className="text-xl font-semibold">Upload Data for</h1>
        <Select>
          <SelectTrigger className="w-[180px] outline-none border rounded-full border-gray-300">
            <SelectValue placeholder="Select AY" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ay2024">AY 2024-25</SelectItem>
              <SelectItem value="ay2023">AY 2023-24</SelectItem>
              <SelectItem value="ay2022">AY 2022-23</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="w-[30%]">
        <Search handleSearchChange={handleSearch}/>
      </div>

      {/* Table Section */}
      <div className="border rounded-lg p-4">
        <PunchedUsersTable rows={filteredRows}/>
      </div>
    </div>
  );
};

export default page;
