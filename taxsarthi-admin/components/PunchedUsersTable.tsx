'use client'
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import React from "react";
import Upload from "./Upload";

type Props = {};

const rows: GridRowsProp = [
  {
    id: 1,
    Name: "John Doe",
    Mobile: "9876543210",
    PAN: "ABCDE1234F",
    Email: "snehal@gmail.com",
  },
  {
    id: 2,
    Name: "Jane Doe",
    Mobile: "9876543210",
    PAN: "ABCDE1234F",
    Email: "jane@gmail.com",
    },
];

const columns : GridColDef[] = [
    {
        field: "id",
        headerName: "Sr",
        width: 50
    },
    {
        field: "Name",
        headerName: "Name",
        width: 150
    },
    {
        field: "Mobile",
        headerName: "Mobile",
        width: 100
    },
    {
        field: "PAN",
        headerName: "PAN",
        width: 150
    },
    {
        field: "Email",
        headerName: "Email",
        width: 150
    },
    {
        field: "Upload",
        headerName: "Upload",
        width: 150,
        renderCell: () =><Upload/>
    }
]

const PunchedUsersTable = (props: Props) => {
  return (
    <div>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default PunchedUsersTable;
