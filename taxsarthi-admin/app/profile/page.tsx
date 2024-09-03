import AddNotice from "@/components/AddNotice";
import ChangePassword from "@/components/ChangePassword";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (

    <div className="flex justify-center items-center flex-col gap-4">
      <h1 className="mb-4 text-xl font-semibold">Update Profile</h1>
      <div className="flex flex-col md:flex-row gap-6">
      <ChangePassword />
      <AddNotice />
    </div>
    </div>
  );
};

export default page;
