import React from "react";
import { Input } from "./ui/input";

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
