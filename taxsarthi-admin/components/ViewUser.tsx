import React from "react";
import UserDetails from "./UserDetails";
import HeadsOfIncome from "./HeadsOfIncome";

type Props = {};

const ViewUser = (props: Props) => {
  return (
    <div className="grid grid-cols-3 m-4 gap-2">
      <div className="col-span-1">
        <UserDetails />
      </div>
      <div className="col-span-2">
        <HeadsOfIncome />
      </div>
    </div>
  );
};

export default ViewUser;
