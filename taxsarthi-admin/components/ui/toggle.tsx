'use client'
import React, { useState } from "react";
import toast from "react-hot-toast";

type Props = {};

const Toggle: React.FC<Props> = (props: Props) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggleChange = () => {
    setIsChecked((prev) => {
      const newCheckedState = !prev;
      if (newCheckedState) {
        toast.success("Edit enabled for client");
      } else {
        toast.success("Edit disabled for client");
      }
      return newCheckedState;
    });
  };

  return (
    <div className="flex items-center justify-center">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleToggleChange}
          className="sr-only peer"
        />
        <div className="group peer ring-0 bg-slate-900 rounded-full outline-none duration-300 after:duration-300 w-16 h-8 shadow-md peer-checked:bg-green-500 peer-focus:outline-none after:content-[''] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95">
          {/* Toggle switch content */}
        </div>
      </label>
    </div>
  );
};

export default Toggle;
