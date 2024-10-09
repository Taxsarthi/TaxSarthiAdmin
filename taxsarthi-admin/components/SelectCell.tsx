// components/SelectCell.tsx

import React from "react";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

type SelectCellProps = {
  fieldName: string; // The field name in the form
  options: { label: string; value: string; color?: string }[];
  label?: string;
  width?: string;
  rowId: string; // Unique identifier for the row, e.g., PAN
  defaultValue?: string; // Initial value for the select
  additionalFields?: { [key: string]: any }; // Any additional fields to update
};

const SelectCell: React.FC<SelectCellProps> = ({
  fieldName,
  options,
  label = "",
  width = "150px",
  rowId,
  defaultValue = "",
  additionalFields = {},
}) => {
  const { control } = useFormContext();

  const handleChange = async (value: string) => {
    try {
      const updateData: { [key: string]: any } = {
        pan: rowId,
        [fieldName.split("_")[0]]: value,
        ...additionalFields,
      };

      const tdsInc = fieldName.split("_")[0];
      const isTds = ["computationITA", "packageCall", "consultedBy", "packageClosure", "deductionDetails", "taxDetails", "incomeDetails", "managedBy", "remarks"].includes(tdsInc);

      const endpoint = isTds ? "/api/tds-sheet" : "/api/enquiry-sheet";
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error("Failed to update");
      }
    } catch (error) {
      console.error(`Error updating ${fieldName}:`, error);
    }
  };

  return (
    <Controller
      name={fieldName}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => {
        const selectedOption = options.find(option => option.value === field.value);
        const textColor = selectedOption?.color || "inherit"; // Default to "inherit" if no color

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
              color: textColor, // Set the color here
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
