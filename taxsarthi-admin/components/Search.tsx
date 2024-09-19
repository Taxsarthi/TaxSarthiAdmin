import React from "react";
import { FaSearch } from "react-icons/fa";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Props = {
  handleSearchChange: React.ChangeEventHandler<HTMLInputElement>;
};

const Search: React.FC<Props> = ({ handleSearchChange }) => {
  return (
    <div className="relative flex justify-center gap-2 items-center ">
      <Input placeholder="Search..." onChange={handleSearchChange} name="search" type="search" />
    </div>
  );
};

export default Search;
