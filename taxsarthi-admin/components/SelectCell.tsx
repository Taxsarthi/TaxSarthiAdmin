// components/SelectCell.tsx

import React, { useEffect, useState } from "react";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

type SelectCellProps = {
  fieldName: string; // The field name in the form
  options: { label: string; value: string; color?: string }[];
  label: string; // Label for the select
  width?: string;
  rowId: string; // Unique identifier for the row, e.g., PAN
  defaultValue?: string; // Initial value for the select
  additionalFields?: { [key: string]: any }; // Any additional fields to update
};

const SelectCell: React.FC<SelectCellProps> = ({
  fieldName,
  options,
  width = "150px",
  rowId,
  defaultValue = "",
  additionalFields = {},
}) => {
  const { control } = useFormContext();
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);

  useEffect(() => {
    const selectedOption = options.find(option => option.value === defaultValue);
    if (selectedOption) {
      setSelectedColor(selectedOption.color);
    }
  }, [defaultValue, options]);

  const handleChange = async (value: string) => {
    try {
      const updateData: { [key: string]: any } = {
        pan: rowId, // Include the PAN for identification
        [fieldName.split("_")[0]]: value, // Extract the field name from the fieldName
        ...additionalFields,
      };

      // Send the PUT request to update
      const response = await fetch("/api/enquiry-sheet", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error("Failed to update");
      }

      // Optionally, handle success feedback here
    } catch (error) {
      console.error(`Error updating ${fieldName}:`, error);
      // Optionally, handle error feedback here
    }
  };

  return (
    <Controller
      name={fieldName}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => {
        const selectedOption = options.find(option => option.value === field.value);
        const currentColor = selectedOption ? selectedOption.color : undefined;

        // Update the selected color whenever the field value changes
        useEffect(() => {
          setSelectedColor(currentColor);
        }, [currentColor]);

        return (
          <Select
            {...field}
            sx={{
              boxShadow: "none",
              ".MuiOutlinedInput-notchedOutline": { border: 0 },
              "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                border: 0,
              },
              "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: 0,
              },
              color: currentColor || 'inherit', // Set color of the selected value
            }}
            value={field.value || ""}
            onChange={(e: SelectChangeEvent<string>) => {
              field.onChange(e.target.value);
              handleChange(e.target.value);
            }}
            style={{ width }}
            displayEmpty
          >
            <MenuItem value="" disabled>
              <p className="text-sm font-semibold">Select</p>
            </MenuItem>
            {options.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                style={option.color ? { color: option.color } : {}}
              >
                <p className="text-sm font-semibold">{option.label}</p>
              </MenuItem>
            ))}
          </Select>
        );
      }}
    />
  );
};

export default SelectCell;
