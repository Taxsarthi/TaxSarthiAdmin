"use client";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import React from "react";
import UploadDocs from "./UploadDocs";

type Props = {
  rows: GridRowsProp;
  loading: boolean;
};

const columns: GridColDef[] = [
  {
    field: "srNo",
    headerName: "Sr No",
    width: 50,
  },
  {
    field: "name",
    headerName: "Name",
    width: 250,
  },
  {
    field: "mobile",
    headerName: "Mobile",
    width: 150,
  },
  {
    field: "pan",
    headerName: "PAN",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    width: 300,
  },
  {
    field: "Acknowledgement",
    headerName: "Acknowledgement",
    width: 150,
    renderCell: (params) => (
      <div className="flex justify-center pt-4">
        <UploadDocs userData={params.row} />
      </div>
    ),
  },
];

type PunchedUsersTableProps = {
  rows: GridRowsProp;
  loading: boolean;
};

const PunchedUsersTable: React.FC<PunchedUsersTableProps> = ({ rows, loading }) => {
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
        initialState={{
          pagination: {
            paginationModel: { pageSize: 25, page: 0 },
          },
        }}
      />
    </div>
  );
};

export default PunchedUsersTable;
