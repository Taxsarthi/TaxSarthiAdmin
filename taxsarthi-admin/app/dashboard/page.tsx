import QueriesPopup from "@/components/QueriesPopup";
import Search from "@/components/Search";
import Table from "@/components/Table";
import { Button } from "@/components/ui/button";
import Upload from "@/components/Upload";
import UsersCards from "@/components/UsersCards";
import Link from "next/link";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="mx-4">
      <div className="flex flex-col md:flex-row justify-between">
        <UsersCards />
        <div className="grid grid-cols-2 gap-4 m-4">
          <QueriesPopup />
          <Link href="/punchedusers"><Upload /></Link>
        </div>
      </div>
      <div className="border rounded-md">
        <div className="flex flex-col-reverse mt-4 md:flex-row md:justify-between items-center">
          <Search />
          <div className="flex gap-4 mx-4">
            <Button variant="outline">
              <Link href="/adduser">Add User</Link>
            </Button>
            <Button variant="outline">Download</Button>
          </div>
        </div>
        <div className="m-4">
          <Table />
        </div>
      </div>
    </div>
  );
};

export default page;
