import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Actions from "./Actions";
import {
  Select,
  MenuItem,
  CircularProgress,
  SelectChangeEvent,
  Skeleton,
} from "@mui/material";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type UserTask = {
  id: string;
  name: string;
  mobile: number;
  pan: string;
  itrType: string;
  area: string;
  city: string;
  Fees: number;
  PaidFees: number;
  PendingFees: number;
  assign?: string;
  lastStatus?: string;
};

type Props = {
  rows: UserTask[];
  loading: boolean;
};

const assignOptions = ["Abhishek", "Ravina", "Kunal", "DataCenter"];
const statusOptions = [
  "Manager Assigned",
  "ITR Password Generated",
  "Data Entered",
  "Data Punched",
  "Verification",
  "ITR Filed",
  "ITR Pending",
  "Refund Processed",
];

// StatusCell Component
const StatusCell: React.FC<GridRenderCellParams> = (params) => {
  const defaultStatus = params.row.lastStatus || "";
  const [selectedStatus, setSelectedStatus] = useState<string>(defaultStatus);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;
        if (!currentYear) {
          throw new Error("Current year is not defined");
        }
        const docRef = doc(db, currentYear.toString(), params.row.pan);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.lastStatus) {
            setSelectedStatus(data.lastStatus);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [params.row.pan]);

  const handleStatusChange = async (event: SelectChangeEvent<any>) => {
    const newStatus = event.target.value;
    const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;
    if (!currentYear) {
      throw new Error("Current year is not defined");
    }
    const docRef = doc(db, currentYear.toString(), params.row.pan);

    try {
      const statusObject = statusOptions.reduce(
        (obj: { [key: string]: boolean }, status, index) => {
          obj[status] = index <= statusOptions.indexOf(newStatus as string);
          return obj;
        },
        {}
      );

      await updateDoc(docRef, { status: statusObject, lastStatus: newStatus });
      setSelectedStatus(newStatus);
      // console.log("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) {
    return (
      <div className="mt-2">
        <Skeleton variant="text" width={150} height={24} />
      </div>
    );
  }

  return (
    <Select
      sx={{
        boxShadow: "none",
        ".MuiOutlinedInput-notchedOutline": { border: 0 },
        "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    border: 0,
                  },
                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: 0,
                  },
      }}
      value={selectedStatus}
      onChange={handleStatusChange}
      className="border-0 w-[220px]"
    >
      {statusOptions.map((option) => (
        <MenuItem key={option} value={option}>
          <p className="text-sm">{option}</p>
        </MenuItem>
      ))}
    </Select>
  );
};

// AssignCell Component
const AssignCell: React.FC<GridRenderCellParams> = (params) => {
  const defaultAssign = params.row.assign || "";
  const [selectedAssign, setSelectedAssign] = useState<string>(defaultAssign);
  const [loading, setLoading] = useState(true);

  // Parse the environment variable into an array
  const assignOptions = process.env.NEXT_PUBLIC_OPS_EMAILS
    ? process.env.NEXT_PUBLIC_OPS_EMAILS.split(",")
    : [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR; // Ensure to update this if needed
        if (!currentYear) {
          throw new Error("Current year is not defined");
        }
        const docRef = doc(db, "users", params.row.pan);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.assign) {
            setSelectedAssign(data.assign);
          } else {
            // If 'assign' field doesn't exist, set it to a default value or handle accordingly
            await updateDoc(docRef, { assign: defaultAssign });
            setSelectedAssign(defaultAssign);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [params.row.pan]);

  const handleAssignChange = async (event: SelectChangeEvent<any>) => {
    const newAssign = event.target.value;
    const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR; // Update this as needed
    if (!currentYear) {
      throw new Error("Current year is not defined");
    }
    const docRef = doc(db, "users", params.row.pan);

    try {
      // Update the document with the new assignment
      await updateDoc(docRef, { assign: newAssign });
      setSelectedAssign(newAssign);
      // console.log("Assignment updated successfully");
    } catch (error) {
      console.error("Error updating assignment:", error);
    }
  };

  if (loading) {
    return (
      <div className="mt-2">
        <Skeleton variant="text" width={150} height={24} />
      </div>
    );
  }

  const formatDisplayName = (email: string) => {
    return email
      .split("+")[0] // Get the part before the +
      .split("@")[0] // Get the part before the @
      .split(".")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <Select
      sx={{
        boxShadow: "none",
        ".MuiOutlinedInput-notchedOutline": { border: 0 },
        "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
          border: 0,
        },
        "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          border: 0,
        },
      }}
      value={selectedAssign}
      onChange={handleAssignChange}
      className="w-[140px] bg-transparent text-sm"
    >
      {assignOptions.map((option) => {
        const displayName = formatDisplayName(option);
        return (
          <MenuItem key={option} value={option}>
            <p className="text-sm">{displayName}</p>
          </MenuItem>
        );
      })}
    </Select>
  );
};

const columns: GridColDef[] = [
  { field: "srNo", headerName: "Sr.", width: 80 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "mobile", headerName: "Mobile", type: "number", width: 110 },
  {
    field: "pan",
    headerName: "PAN",
    width: 110,
    cellClassName: "font-semibold",
  },
  { field: "itrType", headerName: "ITR Type", width: 100 },
  { field: "area", headerName: "Area", width: 150 },
  { field: "city", headerName: "City", width: 80 },
  { field: "Fees", headerName: "Fees", type: "number", width: 80 },
  { field: "PaidFees", headerName: "Paid", type: "number", width: 80 },
  { field: "PendingFees", headerName: "Pending", type: "number", width: 80 },
  {
    field: "assign",
    headerName: "Assign",
    width: 150,
    renderCell: (params) => <AssignCell {...params} />,
  },
  {
    field: "lastStatus",
    headerName: "Status",
    width: 230,
    renderCell: (params) => <StatusCell {...params} />,
  },
  {
    sortable: false,
    field: "actions",
    headerName: "Actions",
    type: "actions",
    width: 200,
    renderCell: (params) => {
      // console.log(params.row);
      return <Actions userData={params.row} />;
    },
  },
];

const Table: React.FC<Props> = ({ rows, loading }) => {
  return (
    <div>
      <DataGrid
        autoHeight
        loading={loading}
        slotProps={{
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton",
          },
        }}
        rows={rows}
        columns={columns}
        processRowUpdate={(newRow) => newRow}
        experimentalFeatures={{}}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 25, page: 0 },
          },
        }}
        disableColumnMenu
        pageSizeOptions={[10, 25, 50]}
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default Table;
