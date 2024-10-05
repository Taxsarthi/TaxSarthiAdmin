// components/Table.tsx

import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Actions from "./Actions";
import { useForm, FormProvider } from "react-hook-form";
import SelectCell from "./SelectCell";
import {
  assignOptions,
  clientStatusOptions,
  computationITAOptions,
  deductionDetailsOptions,
  divisionOptions,
  incomeDetailsOptions,
  packageCallOptions,
  packageClosureOptions,
  statusClosedOptions,
  statusOptions,
} from "@/tableOptions/tableOptions";
import { Download } from "lucide-react";

type EnquiryData = {
  Remark?: string;
  Status?: string;
  closedFor?: string;
  pan?: string;
  closedBy?: string;
  assignedTo?: string;
  division?: string;
  clientStatus?: string;
};

type UserTask = {
  id: string;
  name: string;
  mobile: string;
  pan: string;
  itrType: string;
  area: string;
  city: string;
  Fees: number;
  discount: number;
  PaidFees: number;
  PendingFees: number;
  assign?: string;
  lastStatus?: string;
  division?: string;
  clientStatus?: string;
  statusClosed?: string;
  entryMonth?: string;
  FinalFees?: number;
  enquiryData?: EnquiryData;
  Remark?: string;
  tdsData?: {
    incomeDetails?: string;
    deductionDetails?: string;
    taxDetails?: string;
    computationITA?: string;
    packageCall?: string;
    managedBy?: string;
    packageClosure?: string;
  };
};

type Props = {
  rows: UserTask[];
  loading: boolean;
};

const columns: GridColDef[] = [
  { field: "srNo", headerName: "Sr.", width: 80 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "mobile", headerName: "Mobile", type: "number", width: 110 },
  {
    field: "pan",
    headerName: "PAN",
    width: 120,
    cellClassName: "font-semibold",
  },
  { field: "entryMonth", headerName: "Entry Month", width: 100 },
  { field: "itrType", headerName: "ITR Type", width: 100 },
  { field: "area", headerName: "Area", width: 80 },
  { field: "city", headerName: "City", width: 80 },
  { field: "Fees", headerName: "Fees", type: "number", width: 80 },
  {
    field: "discount",
    headerName: "Discount",
    type: "number",
    width: 80,
    renderCell: (params) => (
      <span>{params.value !== undefined ? params.value : 0}</span>
    ),
  },
  { field: "FinalFees", headerName: "Payable", type: "number", width: 80 },
  { field: "PaidFees", headerName: "Paid", type: "number", width: 80 },
  { field: "PendingFees", headerName: "Pending", type: "number", width: 80 },
  { field: "Remark", headerName: "Remarks", width: 150 },
  {
    field: "division",
    headerName: "Division",
    width: 150,
    renderCell: (params) => (
      <SelectCell
        fieldName={`division_${params.row.id}`}
        options={divisionOptions}
        label="Division"
        width="140px"
        rowId={params.row.pan}
        defaultValue={params.row?.enquiryData?.division || ""}
      />
    ),
  },
  {
    field: "clientStatus",
    headerName: "Client Status",
    width: 150,
    renderCell: (params) => (
      <SelectCell
        fieldName={`clientStatus_${params.row.id}`}
        options={clientStatusOptions}
        label="Client Status"
        width="140px"
        rowId={params.row.pan}
        defaultValue={params.row?.enquiryData?.clientStatus || ""}
      />
    ),
  },
  {
    field: "assign",
    headerName: "Assigned To",
    width: 150,
    renderCell: (params) => (
      <SelectCell
        fieldName={`assignedTo_${params.row.id}`}
        options={assignOptions}
        label="Assigned To"
        width="140px"
        rowId={params.row.pan}
        defaultValue={params.row?.enquiryData?.assignedTo || ""}
      />
    ),
  },
  {
    field: "statusClosed",
    headerName: "Closed for",
    width: 130,
    renderCell: (params) => (
      <SelectCell
        fieldName={`closedFor_${params.row.id}`}
        options={statusClosedOptions}
        label="Closed for"
        width="130px"
        rowId={params.row.pan}
        defaultValue={params.row?.enquiryData?.closedFor || ""}
      />
    ),
  },
  {
    field: "lastStatus",
    headerName: "Status",
    width: 230,
    renderCell: (params) => (
      <SelectCell
        fieldName={`Status_${params.row.id}`}
        options={statusOptions.map((opt) => ({ label: opt, value: opt }))}
        label="Status"
        width="140px"
        rowId={params.row.pan}
        defaultValue={params.row?.enquiryData?.Status || ""}
      />
    ),
  },
  {
    sortable: false,
    field: "actions",
    headerName: "Actions",
    type: "actions",
    width: 200,
    renderCell: (params) => <Actions userData={params.row} />,
  },
];

const tdsColumns: GridColDef[] = [
  { field: "srNo", headerName: "Sr.", width: 80 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "mobile", headerName: "Mobile", type: "number", width: 110 },
  {
    field: "pan",
    headerName: "PAN",
    width: 120,
    cellClassName: "font-semibold",
  },
  { field: "entryMonth", headerName: "Entry Month", width: 100 },
  { field: "itrType", headerName: "ITR Type", width: 100 },
  { field: "area", headerName: "Area", width: 80 },
  { field: "city", headerName: "City", width: 80 },
  {
    field: "managedBy",
    headerName: "Managed By",
    width: 150,
    renderCell: (params) => (
      <SelectCell
        fieldName={`managedBy_${params.row.id}`}
        options={assignOptions}
        label="Status"
        width="140px"
        rowId={params.row.pan}
        defaultValue={params.row?.tdsData?.managedBy || ""}
      />
    ),
  },
  {
    field: "incomeDetails",
    headerName: "Income Details",
    width: 150,
    renderCell: (params) => (
      <SelectCell
        fieldName={`incomeDetails_${params.row.id}`}
        options={incomeDetailsOptions}
        label="Status"
        width="140px"
        rowId={params.row.pan}
        defaultValue={params.row?.tdsData?.incomeDetails || ""}
      />
    ),
  },
  {
    field: "deductionDetails",
    headerName: "Deduction Details",
    width: 150,
    renderCell: (params) => (
      <SelectCell
        fieldName={`deductionDetails_${params.row.id}`}
        options={deductionDetailsOptions}
        label="Status"
        width="140px"
        rowId={params.row.pan}
        defaultValue={params.row?.tdsData?.deductionDetails || ""}
      />
    ),
  },
  {
    field: "taxDetails",
    headerName: "Tax Details",
    width: 150,
    renderCell: (params) => (
      <SelectCell
      fieldName={`deductionDetails_${params.row.id}`}
        options={deductionDetailsOptions}
        label="Status"
        width="140px"
        rowId={params.row.pan}
        defaultValue={params.row?.tdsData?.taxDetails || ""}
      />
    ),
  },
  {
    field: "computationITA",
    headerName: "Computation ITA",
    width: 230,
    renderCell: (params) => (
      <div className="flex justify-center items-center">
        <SelectCell
          fieldName={`computationITA_${params.row.id}`}
          options={computationITAOptions}
          label="Status"
          width="140px"
          rowId={params.row.pan}
          defaultValue={params.row?.tdsData?.computationITA || ""}
        />
        <Download size={24} className="cursor-pointer" />
      </div>
    ),
  },
  {
    field: "packageCall",
    headerName: "Package Call",
    width: 150,
    renderCell: (params) => (
      <SelectCell
      fieldName={`packageCall_${params.row.id}`}
      options={packageCallOptions}
        label="Status"
        width="140px"
        rowId={params.row.pan}
        defaultValue={params.row?.tdsData?.packageCall || ""}
      />
    ),
  },
  {
    field: "consultedBy",
    headerName: "Consulted By",
    width: 150,
    renderCell: (params) => (
      <SelectCell
      fieldName={`managedBy_${params.row.id}`}
        options={assignOptions}
        label="Status"
        width="130px"
        rowId={params.row.pan}
        defaultValue={params.row?.tdsData?.managedBy || ""}
        />
      ),
    },
    { field: "Fees", headerName: "Fees", type: "number", width: 80 },
    {
      field: "discount",
      headerName: "Discount",
      type: "number",
      width: 80,
      renderCell: (params) => (
        <span>{params.value !== undefined ? params.value : 0}</span>
      ),
    },
    { field: "FinalFees", headerName: "Payable", type: "number", width: 80 },
    { field: "PaidFees", headerName: "Paid", type: "number", width: 80 },
    { field: "PendingFees", headerName: "Pending", type: "number", width: 80 },
    { field: "Remark", headerName: "Remarks", width: 150 },
    {
      field: "packageClosure",
      headerName: "Package Closure",
      width: 180,
      renderCell: (params) => (
        <SelectCell
        fieldName={`packageClosure_${params.row.id}`}
        options={packageClosureOptions}
        label="Status"
        width="140px"
        rowId={params.row.pan}
        defaultValue={params.row?.tdsData?.packageClosure || ""}
      />
    ),
  },
  {
    field: "lastStatus",
    headerName: "Status",
    width: 230,
    renderCell: (params) => (
      <SelectCell
        fieldName={`Status_${params.row.id}`}
        options={statusOptions.map((opt) => ({ label: opt, value: opt }))}
        label="Status"
        width="220px"
        rowId={params.row.pan}
        defaultValue={params.row?.enquiryData?.Status || ""}
      />
    ),
  },
  {
    sortable: false,
    field: "actions",
    headerName: "Actions",
    type: "actions",
    width: 200,
    renderCell: (params) => <Actions userData={params.row} />,
  },
];

const Table: React.FC<Props> = ({ rows, loading }) => {
  console.log("rows", rows);
  // Initialize react-hook-form
  const methods = useForm({
    defaultValues: {}, // No need to set default values here as they're handled in SelectCell
  });

  const { control } = methods;

  return (
    <FormProvider {...methods}>
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          autoHeight
          loading={loading}
          rows={rows}
          columns={rows[0]?.tdsData ? tdsColumns : columns}
          paginationModel={{ pageSize: 10, page: 0 }}
          pageSizeOptions={[10, 25, 50, 100]}
          getRowId={(row) => row.id}
          disableColumnMenu
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
        />
      </div>
    </FormProvider>
  );
};

export default Table;
