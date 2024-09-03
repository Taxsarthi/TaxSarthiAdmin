import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";

type Props = {};

const AddNotice: React.FC<Props> = (props: Props) => {
  return (
    <div className="flex flex-col p-6 mx-auto h-[400px] border w-full rounded-lg">
      <div className="text-center mb-4">
        <h2 className="text-md md:text-lg font-bold">Add Notice</h2>
        <p className="text-sm text-gray-600 mt-2">Add a new notice or announcement here.</p>
      </div>
      <div className="flex flex-col space-y-4">
        <Textarea className="bg-gray-50 dark:bg-slate-900" placeholder="Type your notice here" rows={6} />
        <Button variant="outline" className="w-full">Add Notice</Button>
      </div>
    </div>
  );
};

export default AddNotice;
