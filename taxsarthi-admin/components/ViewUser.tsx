import React from "react";
import UserDetails from "./UserDetails";
import HeadsOfIncome from "./HeadsOfIncome";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

type Props = {};

const ViewUser = (props: Props) => {
  return (
    <div>
      <div className="grid grid-cols-3 m-4 gap-2">
      <div className="col-span-1">
        <UserDetails />
      </div>
      <div className="col-span-2">
        <HeadsOfIncome />
      </div>
      
    </div>
    <div className="flex justify-end w-full">
    <Button className="m-6 gap-2">Save & Next <ArrowRight/></Button>
    </div>
    </div>
  );
};

export default ViewUser;
