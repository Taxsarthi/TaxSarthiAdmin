'use client';
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPunchedData();
  }, []);

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = tableData.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const fetchPunchedData = async () => {
    setLoading(true);
    // Fetch punched users
    const punchedRes = await fetch("/api/user-data?status=punched");
    const punchedData = await punchedRes.json();
    const punchedTasks = punchedData?.tasks || [];

    // Fetch all users
    const usersRes = await fetch("/api/user-data");
    const usersData = await usersRes.json();
    const usersTasks = usersData?.tasks || [];

    // Create a map of users for easy access
    const usersMap = new Map(usersTasks.map((user: UserTask) => [user.id, user]));

    // Merge punched tasks with corresponding user data
    const updatedTasks = punchedTasks.map((punchedTask: UserTask, index: number) => {
      const userDetails = usersMap.get(punchedTask.id) || {};
      return {
        ...userDetails,
        ...punchedTask,
        srNo: index + 1, // Add serial number
      };
    });
    setTableData(updatedTasks);
    setLoading(false);
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
        <Search handleSearchChange={handleSearch} />
      </div>

      {/* Table Section */}
      <div>
        <PunchedUsersTable rows={filteredRows} loading = {loading} />
      </div>
    </div>
  );
};

export default page;
