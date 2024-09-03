'use client';
import React from 'react';
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import AssignDropdown from './AssignDropdown';
import Actions from './Actions';

type Props = {};

// Define different options and placeholders
const assignOptions = ['John Doe', 'Jane Doe', 'Alice Smith', 'Bob Johnson'];
const statusOptions = ['Manager Assigned', 'ITR Password Generated', 'Data Entered', 'Data Punched', 'Verification', 'ITR Filed', 'ITR Pending', 'Refund Processed'];
const assignPlaceholder = 'Select assignee';
const statusPlaceholder = 'Select status';

const rows: GridRowsProp = [
  {
    id: 1,
    col1: 'John Doe',
    col2: '9876543210',
    col3: 'ABCDE1234F',
    col4: 'ITR-1',
    col5: 'Area 1',
    col6: 'City 1',
    col7: '500',
    col8: '200',
    col9: '300',
    col12: 'Actions',
  },
  {
    id: 2,
    col1: 'Jane Doe',
    col2: '9876543210',
    col3: 'ABCDE1234F',
    col4: 'ITR-1',
    col5: 'Area 1',
    col6: 'City 1',
    col7: '500',
    col8: '200',
    col9: '300',
    col12: 'Actions',
  },
];

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Sr', width: 50, sortable: false },
  { field: 'col1', headerName: 'Name', width: 150 },
  { field: 'col2', headerName: 'Mobile', width: 100 },
  { field: 'col3', headerName: 'PAN', width: 120 },
  { field: 'col4', headerName: 'ITR Type', width: 80 },
  { field: 'col5', headerName: 'Area', width: 100 },
  { field: 'col6', headerName: 'City', width: 80 },
  { field: 'col7', headerName: 'Fees', width: 80 },
  { field: 'col8', headerName: 'Paid', width: 80 },
  { field: 'col9', headerName: 'Pending', width: 80 },
  {
    field: 'col10',
    headerName: 'Assign',
    width: 150,
    editable: true,
    renderCell: (params: GridRenderCellParams<any, any, any>) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <AssignDropdown
          value={params.value || ''}
          api={params.api}
          id={params.id}
          field={params.field}
          options={assignOptions} // Pass options
          placeholder={assignPlaceholder} // Pass placeholder
        />
      </div>
    ),
    renderEditCell: (params) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <AssignDropdown
          value={params.value || ''}
          api={params.api}
          id={params.id}
          field={params.field}
          options={assignOptions} // Pass options
          placeholder={assignPlaceholder} // Pass placeholder
        />
      </div>
    ),
  },
  {
    field: 'col11',
    headerName: 'Status',
    width: 150,
    editable: true,
    renderCell: (params: GridRenderCellParams<any, any, any>) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <AssignDropdown
          value={params.value || ''}
          api={params.api}
          id={params.id}
          field={params.field}
          options={statusOptions} // Pass options
          placeholder={statusPlaceholder} // Pass placeholder
        />
      </div>
    ),
    renderEditCell: (params) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <AssignDropdown
          value={params.value || ''}
          api={params.api}
          id={params.id}
          field={params.field}
          options={statusOptions} // Pass options
          placeholder={statusPlaceholder} // Pass placeholder
        />
      </div>
    ),
  },
  {
    field: 'col12',
    headerName: 'Actions',
    width: 200,
    renderCell: () => <Actions />,
  },
];

const Table: React.FC<Props> = () => {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        processRowUpdate={(newRow) => newRow}
        experimentalFeatures={{}}
        disableColumnMenu
      />
    </div>
  );
};

export default Table;
