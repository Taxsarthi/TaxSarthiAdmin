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
import React from "react";

type Props = {};

const page: React.FC<Props> = (props: Props) => {
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

      {/* Search Component */}
      <div className="mb-6">
        <Search />
      </div>

      {/* Table Section */}
      <div className="border rounded-lg p-4">
        <PunchedUsersTable />
      </div>
    </div>
  );
};

export default page;
