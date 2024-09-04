import { LockOpen } from "lucide-react";
import React from "react";
import { IoLockClosed } from "react-icons/io5";

type Props = {};

const Toggle: React.FC<Props> = (props: Props) => {
  return (
    <div className="flex items-center justify-center">
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" />
        <div className="group peer ring-0 bg-blue-950 rounded-full outline-none duration-300 after:duration-300 w-16 h-8 shadow-md peer-checked:bg-green-500 peer-focus:outline-none after:content-[''] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95">
        </div>
      </label>
    </div>
  );
};

export default Toggle;
