import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';
import Sidebar from '../Dashboard/Sidebar';
import axios from 'axios';
import { API_ENDPOINT } from "../../../services/config";

const API_URL = `${API_ENDPOINT}/api/Users`;

const UserManagement = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#2196f3',
      },
    },
  });

  // Fetch users data
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setTableData(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateNewRow = async (values) => {
    try {
      const newUser = {
        ...values,
        userId: 0,
        createdAt: new Date().toISOString(),
        profilePicture: values.profilePicture || null,
        userType: parseInt(values.userType) // Ensure userType is a number
      };

      console.log('Creating new user:', newUser);
      const response = await axios.post(API_URL, newUser);
      setTableData([...tableData, response.data]);
    } catch (error) {
      console.error('Error creating user:', error.response ? error.response.data : error.message);
    }
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (Object.keys(validationErrors).length) return;

    try {
      const userId = row.original.userId;
      const updatedUser = {
        ...values,
        userId: userId,
        createdAt: row.original.createdAt,
        profilePicture: values.profilePicture || null,
        userType: parseInt(values.userType) // Ensure userType is a number
      };
      
      await axios.put(`${API_URL}/${userId}`, updatedUser);
      const updatedData = [...tableData];
      updatedData[row.index] = updatedUser;
      setTableData(updatedData);
      exitEditingMode();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteRow = useCallback(
    async (row) => {
      if (!confirm(`Are you sure you want to delete ${row.getValue('fullName')}`)) {
        return;
      }

      try {
        const userId = row.original.userId;
        await axios.delete(`${API_URL}/${userId}`);
        setTableData(tableData.filter(user => user.userId !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
    [tableData],
  );

  const USER_TYPES = {
    ADMIN: 'Admin',
    WORKER: 'Worker',
    CUSTOMER: 'Customer'
  };

  const USER_TYPE_VALUES = {
    [USER_TYPES.ADMIN]: 0,
    [USER_TYPES.WORKER]: 2,
    [USER_TYPES.CUSTOMER]: 1
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'userId',
        header: 'ID',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'fullName',
        header: 'Full Name',
        size: 140,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 140,
      },
      {
        accessorKey: 'passwordHash',
        header: 'Password',
        size: 140,
        enableColumnFilter: false,
        enableGlobalFilter: false,
        Cell: () => '********', // Hide password in the table
      },
      {
        accessorKey: 'phoneNumber',
        header: 'Phone Number',
        size: 120,
      },
      {
        accessorKey: 'address',
        header: 'Address',
        size: 200,
      },
      {
        accessorKey: 'userType',
        header: 'User Type',
        muiTableBodyCellEditTextFieldProps: {
          select: true,
          children: Object.entries(USER_TYPE_VALUES).map(([label, value]) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          )),
        },
        Cell: ({ cell }) => {
          const userTypeValue = cell.getValue();
          return Object.entries(USER_TYPE_VALUES).find(([, value]) => value === userTypeValue)?.[0] || '';
        },
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        enableEditing: false,
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(),
      },
    ],
    [],
  );

  // Rest of your component remains the same
  return (
    <ThemeProvider theme={theme}>
      <div className="flex h-screen bg-gray-100">
        <div className="fixed inset-y-0 left-0">
          <Sidebar />
        </div>

        <div className="flex-1 ml-[260px] p-8">
          <Box sx={{ maxWidth: '100%' }}>
            <MaterialReactTable
              displayColumnDefOptions={{
                'mrt-row-actions': {
                  muiTableHeadCellProps: {
                    align: 'center',
                  },
                  size: 120,
                },
              }}
              columns={columns}
              data={tableData}
              editingMode="modal"
              enableColumnOrdering
              enableEditing
              enableColumnFiltering
              enableColumnResizing
              enableGlobalFilter
              enablePagination
              enableSelectAll
              onEditingRowSave={handleSaveRowEdits}
              renderRowActions={({ row, table }) => (
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                  <Tooltip arrow placement="left" title="Edit">
                    <IconButton onClick={() => table.setEditingRow(row)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip arrow placement="right" title="Delete">
                    <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
              renderTopToolbarCustomActions={() => (
                <Button
                  color="primary"
                  onClick={() => setCreateModalOpen(true)}
                  variant="contained"
                  startIcon={<Add />}
                >
                  Create New User
                </Button>
              )}
            />
          </Box>
          <CreateNewUserModal
            columns={columns}
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            onSubmit={handleCreateNewRow}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

const CreateNewUserModal = ({ open, columns, onClose, onSubmit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ''] = '';
      return acc;
    }, {}),
  );

  const handleSubmit = () => {
    // Convert userType to number before submitting
    const processedValues = {
      ...values,
      userType: values.userType ? parseInt(values.userType) : 1 // Default to Customer (1) if not specified
    };
    onSubmit(processedValues);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New User</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
              mt: 2,
            }}
          >
            {columns.map((column) => {
              // Skip userId and createdAt fields
              if (column.accessorKey === 'userId' || column.accessorKey === 'createdAt') {
                return null;
              }

              // Special handling for password field
              if (column.accessorKey === 'passwordHash') {
                return (
                  <TextField
                    key={column.accessorKey}
                    label="Password"
                    name={column.accessorKey}
                    type="password"
                    onChange={(e) =>
                      setValues({ ...values, [e.target.name]: e.target.value })
                    }
                  />
                );
              }

              // Regular fields
              return (
                <TextField
                  key={column.accessorKey}
                  label={column.header}
                  name={column.accessorKey}
                  select={column.muiTableBodyCellEditTextFieldProps?.select}
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                >
                  {column.muiTableBodyCellEditTextFieldProps?.children}
                </TextField>
              );
            })}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Create User
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserManagement;