import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaEdit } from "react-icons/fa";
import ActionButton from "./ui/actionbutton";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";

type Props = {};

const EditUser = (props: Props) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <ActionButton icon={<FaEdit />} label="Edit" color="text-green-600" />
        </DialogTrigger>
        <DialogContent className="max-w-[60vw] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="mb-4 text-xl font-semibold">
              Edit User Details
            </DialogTitle>
            <DialogDescription>
              <form className="flex flex-col w-[100%] gap-4">
                <Input placeholder="Fullname" disabled />
                <Input placeholder="PAN" disabled />
                <Input placeholder="Mobile" disabled />
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
                    <label
                      htmlFor="nil"
                      className="text-sm font-medium leading-none"
                    >
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
                <Input placeholder="Fees" />
                <Input placeholder="Discount (in Rs.)" />
                <Input placeholder="Final Fees" disabled />
                <Input placeholder="Fees Paid" />
                <Input placeholder="Fees Pending" disabled />
                <div className="flex justify-end gap-4 mt-4">
                  <DialogClose>
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </DialogClose>{" "}
                  <Button variant="outline" type="submit">
                    Edit
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditUser;
