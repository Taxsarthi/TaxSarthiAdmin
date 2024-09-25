"use client";
import React from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import AssignDropdown from "./AssignDropdown";
import Actions from "./Actions";

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
const assignPlaceholder = "Select assignee";
const statusPlaceholder = "Select status";

const columns: GridColDef[] = [
  { field: "srNo", headerName: "Sr.", width: 80 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "mobile", headerName: "Mobile", type: "number", width: 150 },
  {
    field: "pan",
    headerName: "PAN",
    width: 150,
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
    sortable: false,
    editable: true,
    renderCell: (params: GridRenderCellParams) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <AssignDropdown
          value={params.value || ""}
          api={params.api}
          id={params.id}
          field={params.field}
          options={assignOptions}
          placeholder={assignPlaceholder}
        />
      </div>
    ),
  },
  {
    field: "lastStatus",
    headerName: "Status",
    width: 150,
    editable: true,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => (
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <AssignDropdown
          value={params.value || ""}
          api={params.api}
          id={params.id}
          field={params.field}
          options={statusOptions}
          placeholder={statusPlaceholder}
        />
      </div>
    ),
  },
  {
    sortable: false,
    field: "actions",
    headerName: "Actions",
    width: 200,
    renderCell: (params) => <Actions />,
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
          variant: 'skeleton',
          noRowsVariant: 'skeleton',
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
      />
    </div>
  );
};

export default Table;
