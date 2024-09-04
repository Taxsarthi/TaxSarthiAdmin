import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Props = {};

const ChangePassword: React.FC<Props> = (props: Props) => {
  return (
    <div className="flex flex-col bg-slate-900 text-white p-6 max-w-sm mx-auto h-[400px] border w-full rounded-lg">
      <div className="text-center mb-4">
        <h2 className="text-md md:text-lg font-bold">Change Password</h2>
        <p className="text-sm mt-2">Update your existing password here.</p>
      </div>
      <div className="flex flex-col space-y-4">
        <Input className="bg-gray-50 dark:bg-slate-900" type="password" placeholder="New Password" />
        <Input className="bg-gray-50 dark:bg-slate-900" type="password" placeholder="Confirm Password" />
        <Button variant="secondary" className="w-full">Change Password</Button>
      </div>
    </div>
  );
};

export default ChangePassword;
