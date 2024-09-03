'use client';
import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

type AssignDropdownProps = {
  value: string;
  api: any;
  id: any;
  field: string;
  options: string[]; // Added options prop
  placeholder: string; // Added placeholder prop
};

const AssignDropdown: React.FC<AssignDropdownProps> = ({
  value,
  api,
  id,
  field,
  options,
  placeholder,
}) => {
  // Initialize state with either the provided value or the placeholder
  const [selectedItem, setSelectedItem] = useState<string>(value || placeholder);

  useEffect(() => {
    // Update the state if the prop value changes
    setSelectedItem(value || placeholder);
  }, [value]);

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    api.setEditCellValue({ id, field, value: item });
  };

  return (
    <Select onValueChange={handleSelect} value={selectedItem === placeholder ? '' : selectedItem}>
      <SelectTrigger className="w-[180px] bg-transparent border-0">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AssignDropdown;
