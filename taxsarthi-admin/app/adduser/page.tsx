import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="mx-6 flex justify-center flex-col items-center">
      <h1 className="mb-4 text-xl font-semibold">Add New User</h1>
      <form className="flex flex-col w-[60%] gap-4">
        <Input placeholder="Fullname" />
        <Input placeholder="PAN" />
        <Input placeholder="Mobile" />
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <div className="flex gap-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select User Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>User Type</SelectLabel>
                <SelectItem value="police">Police</SelectItem>
                <SelectItem value="defencepersonal">Defence Personal</SelectItem>
                <SelectItem value="pvtemployee">Private Corporate Employee</SelectItem>
                <SelectItem value="govtemployee">Government Employee</SelectItem>
                <SelectItem value="other">Self Employeed / Freelancer / Student</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select ITR Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>ITR Type</SelectLabel>
                <SelectItem value="itr1">ITR-0 - NIL</SelectItem>
                <SelectItem value="itr2">ITR-1 - Salary </SelectItem>
                <SelectItem value="itr3">ITR-2 - Salary + Shares</SelectItem>
                <SelectItem value="itr4">ITR-3 - Business + Shares</SelectItem>
                <SelectItem value="itr5">ITR-4 - Business</SelectItem>
                <SelectItem value="itr5">ITR-5 - Partnership Firm/LLP </SelectItem>
                <SelectItem value="itr6">ITR-6 - Company </SelectItem>
                <SelectItem value="itr7">ITR-7 - Trust</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <h1 className="text-black text-lg">Services</h1>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <Checkbox id="taxsarthiportal" />
            <label
              htmlFor="taxsarthiportal"
              className="text-sm font-medium leading-none"
            >
              TaxSarthiPortal
            </label>
          </div>
          <div className="flex gap-2 items-center">
            <Checkbox id="nil" />
            <label htmlFor="nil" className="text-sm font-medium leading-none">
              Nil
            </label>
          </div>
          <div className="flex gap-2 items-center">
            <Checkbox id="itrsalary" />
            <label
              htmlFor="itrsalary"
              className="text-sm font-medium leading-none"
            >
              ITR Salary
            </label>
          </div>
          <div className="flex gap-2 items-center">
            <Checkbox id="itrbusiness" />
            <label
              htmlFor="itrbusiness"
              className="text-sm font-medium leading-none"
            >
              ITR Business
            </label>
          </div>
          <div className="flex gap-2 items-center">
            <Checkbox id="sharesbelow5l" />
            <label
              htmlFor="sharesbelow5l"
              className="text-sm font-medium leading-none"
            >
              Shares Below 5L
            </label>
          </div>
          <div className="flex gap-2 items-center">
            <Checkbox id="sharesbelow10l" />
            <label
              htmlFor="sharesbelow10l"
              className="text-sm font-medium leading-none"
            >
              Shares Below 10L
            </label>
          </div>
          <div className="flex gap-2 items-center">
            <Checkbox id="sharesbelow20l" />
            <label
              htmlFor="sharesbelow20l"
              className="text-sm font-medium leading-none"
            >
              Shares Below 20L
            </label>
          </div>
        </div>
        <Input placeholder="City" />
        <Input placeholder="Area" />
        <Input placeholder="Fees" />
        <Input placeholder="Discount (in Rs.)" />
        <Input placeholder="Final Fees" />
        <Input placeholder="Fees Paid" />
        <Input placeholder="Fees Pending" />
        <div className="flex justify-end gap-4 mt-4">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button variant="outline" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default page;
