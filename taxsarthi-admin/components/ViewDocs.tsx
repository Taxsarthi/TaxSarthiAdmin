"use client";
import { Download } from "lucide-react";
import React from "react";
import PreviewDoc from "./PreviewDoc";
import { Button } from "./ui/button";

type Props = {};

const ViewDocs = (props: Props) => {
  return (
    <>
      <div className="grid grid-cols-3 m-4 gap-2 h-lvh">
        <div className="col-span-1">
          <div className="rounded-lg border h-full flex flex-col bg-slate-900 text-white p-4 m-2">
            <h1 className="border-b mb-2 w-full text-lg">Docs List</h1>
            <div className="flex flex-col gap-2">
              <button className="flex justify-between w-full">
                Doc 1 <Download />
              </button>

              <button className="flex justify-between w-full">
                Doc 2 <Download />
              </button>

              <button className="flex justify-between w-full">
                Doc 3 <Download />
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="border rounded-lg p-4 m-2 h-full bg-gray-200">
            <h1 className="border-b font-semibold border-gray-400 flex w-full text-lg">
              Doc Preview
            </h1>
            <div className="m-2">
              <PreviewDoc />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end w-full">
        <Button className="m-6 gap-2">
          Save
        </Button>
      </div>
    </>
  );
};

export default ViewDocs;
