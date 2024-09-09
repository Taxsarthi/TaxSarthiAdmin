'use client'
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import React from "react";
import UploadDocs from "./UploadDocs";

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
    {
        id: 3,
        Name: "John Doe",
        Mobile: "9876543210",
        PAN: "ABCDE1234F",
        Email: "john@gmail.com",
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
        width: 200
    },
    {
        field: "Mobile",
        headerName: "Mobile",
        width: 150
    },
    {
        field: "PAN",
        headerName: "PAN",
        width: 200
    },
    {
        field: "Email",
        headerName: "Email",
        width: 200
    },
    {
        field: "Acknowledgement",
        headerName: "Acknowledgement",
        width: 150,
        renderCell: () =><UploadDocs/>
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
