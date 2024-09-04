import AddNotice from "@/components/AddNotice";
import ChangePassword from "@/components/ChangePassword";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex justify-center items-center flex-col gap-4">
      <h1 className="mb-4 text-xl font-semibold">Update Profile</h1>
      <div className="flex gap-6">
        <Input
          type="email"
          placeholder="taxsarthi@gmail.com"
          className="w-96"
          disabled
        />
        <Button variant="destructive">Logout</Button>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <ChangePassword />
        <AddNotice />
      </div>
    </div>
  );
};

export default page;
