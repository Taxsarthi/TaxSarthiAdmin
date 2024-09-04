import React from "react";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";

type Props = {};

const HeadsOfIncome = (props: Props) => {
  return (
    <div className="border rounded-lg p-4 m-2 h-full bg-gray-200">
      <h1 className="border-b font-semibold border-gray-400 flex justify-between w-full text-lg">
        <span>Heads of Income</span>
        <span>No. of Sources</span>
      </h1>
      <div className="flex justify-between items-center border-b border-gray-400 p-2">
        <div className="flex gap-2 justify-center items-center">
          <Checkbox />
          <span className="text-sm">Income from Salary</span>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <span className="text-sm">Number of Employees</span>
          <Input type="number" className="w-20 p-2 m-2" min={0}/>
        </div>
      </div>
      <div className="flex justify-between items-center border-b border-gray-400 p-2">
        <div className="flex gap-2 justify-end items-center">
          <Checkbox />
          <span className="text-sm">Income from House Property</span>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 justify-end items-center">
            <span className="text-sm">Self Occupied</span>
            <Input type="number" className="w-20 p-2 m-2" min={0}/>
          </div>
          <div className="flex gap-2 justify-end items-center">
            <span className="text-sm">Letout House Property</span>
            <Input type="number" className="w-20 p-2 m-2" min={0} />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center border-b border-gray-400 p-2">
        <div className="flex gap-2 justify-end items-center">
          <Checkbox />
          <span className="text-sm">Profits and Gains from Business</span>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 justify-end items-center">
            <span className="text-sm">Special Business - 44AD/AE etc</span>
            <Input type="number" className="w-20 p-2 m-2" min={0}/>
          </div>
          <div className="flex gap-2 justify-end items-center">
            <span className="text-sm">Business</span>
            <Input type="number" className="w-20 p-2 m-2" min={0} />
          </div>
          <div className="flex gap-2 justify-end items-center">
            <span className="text-sm">Profession</span>
            <Input type="number" className="w-20 p-2 m-2" min={0} />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center border-b border-gray-400 p-2">
        <div className="flex gap-2 justify-end items-center">
          <Checkbox />
          <span className="text-sm">Income from Capital Gain</span>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 justify-end items-center">
            <span className="text-sm">Long Term Capital Gain</span>
            <Input type="number" className="w-20 p-2 m-2" min={0}/>
          </div>
          <div className="flex gap-2 justify-end items-center">
            <span className="text-sm">Short Term Capital Gain</span>
            <Input type="number" className="w-20 p-2 m-2" min={0} />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center border-b p-2">
        <div className="flex gap-2 justify-end items-center">
          <Checkbox />
          <span className="text-sm">Income from Other Sources</span>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 justify-end items-center">
            <span className="text-sm">Interest on Savings Account</span>
            <Input type="number" className="w-20 p-2 m-2" min={0}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadsOfIncome;
