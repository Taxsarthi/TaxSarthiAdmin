import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Toggle from "@/components/ui/toggle";
import ViewUserTabs from "@/components/ViewUserTabs";
import React from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const page = (props: Props) => {
  return (
    <>
      {/* Header Section */}
      <div className="flex justify-between items-center mx-4 py-6 border-b ">
        <div className="flex gap-6">
          <Toggle />
          <Select>
            <SelectTrigger className="w-[180px] outline-none rounded-full">
              <SelectValue placeholder="Regime" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="old">Old Regime</SelectItem>
                <SelectItem value="new">New Regime</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center gap-6">
          <h1 className="text-xl font-semibold">Punched Data for</h1>
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
        <div>
          Tax Payable: <span className="text-green-500 p-3">₹ 19000</span>
        </div>
      </div>
      <ViewUserTabs />
    </>
  );
};

export default page;
