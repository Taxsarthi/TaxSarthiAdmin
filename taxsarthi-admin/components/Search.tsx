import React from "react";
import { FaSearch } from "react-icons/fa";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Props = {};

const Search = (props: Props) => {
  return (
    <div className="relative flex justify-center gap-2 items-center max-w-96 m-4">
      <Input placeholder="Search..." name="search" type="search" />
      <Button variant="outline"><FaSearch size={20} color="gray" /></Button>
    </div>
  );
};

export default Search;
