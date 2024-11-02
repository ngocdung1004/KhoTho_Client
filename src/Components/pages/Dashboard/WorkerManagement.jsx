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

const API_URL = 'https://localhost:7062/api/Workers';

const WorkerManagement = () => {
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

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const response = await axios.get(API_URL);
      setTableData(response.data);
    } catch (error) {
      console.error('Error fetching workers:', error);
    }
  };

  const handleCreateNewRow = async (values) => {
    try {
      const newWorker = {
        workerId: 0,
        userId: 0,
        experienceYears: values.experienceYears,
        rating: values.rating,
        bio: values.bio,
        verified: values.verified,
        user: {
          userId: 0,
          fullName: values.fullName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          address: values.address,
          userType: 2, // Worker type
          profilePicture: null,
          createdAt: new Date().toISOString()
        }
      };
      
      const response = await axios.post(API_URL, newWorker);
      setTableData([...tableData, response.data]);
    } catch (error) {
      console.error('Error creating worker:', error);
    }
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (Object.keys(validationErrors).length) return;

    try {
      const workerId = row.original.workerId;
      const updatedWorker = {
        ...row.original,
        experienceYears: values.experienceYears,
        rating: values.rating,
        bio: values.bio,
        verified: values.verified,
        user: {
          ...row.original.user,
          fullName: values.fullName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          address: values.address,
        }
      };
      
      await axios.put(`${API_URL}/${workerId}`, updatedWorker);
      const updatedData = [...tableData];
      updatedData[row.index] = updatedWorker;
      setTableData(updatedData);
      exitEditingMode();
    } catch (error) {
      console.error('Error updating worker:', error);
    }
  };

  const handleDeleteRow = useCallback(
    async (row) => {
      if (!confirm(`Are you sure you want to delete ${row.getValue('user.fullName')}`)) {
        return;
      }

      try {
        const workerId = row.original.workerId;
        await axios.delete(`${API_URL}/${workerId}`);
        setTableData(tableData.filter(worker => worker.workerId !== workerId));
      } catch (error) {
        console.error('Error deleting worker:', error);
      }
    },
    [tableData],
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: 'workerId',
        header: 'Worker ID',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'user.fullName',
        header: 'Full Name',
        size: 140,
      },
      {
        accessorKey: 'user.email',
        header: 'Email',
        size: 140,
      },
      {
        accessorKey: 'user.phoneNumber',
        header: 'Phone Number',
        size: 120,
      },
      {
        accessorKey: 'user.address',
        header: 'Address',
        size: 200,
      },
      {
        accessorKey: 'experienceYears',
        header: 'Experience (Years)',
        size: 120,
      },
      {
        accessorKey: 'rating',
        header: 'Rating',
        size: 100,
      },
      {
        accessorKey: 'bio',
        header: 'Bio',
        size: 200,
      },
      {
        accessorKey: 'verified',
        header: 'Verified',
        size: 100,
        Cell: ({ cell }) => (cell.getValue() ? 'Yes' : 'No'),
        muiTableBodyCellEditTextFieldProps: {
          select: true,
          children: [
            <MenuItem key={true} value={true}>Yes</MenuItem>,
            <MenuItem key={false} value={false}>No</MenuItem>
          ],
        },
      },
    ],
    [],
  );

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
                  Create New Worker
                </Button>
              )}
            />
          </Box>
          <CreateNewWorkerModal
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

const CreateNewWorkerModal = ({ open, columns, onClose, onSubmit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey?.replace('user.', '') ?? ''] = '';
      return acc;
    }, {}),
  );

  const handleSubmit = () => {
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Worker</DialogTitle>
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
            {columns.map((column) => (
              !['workerId', 'userId'].includes(column.accessorKey) && (
                <TextField
                  key={column.accessorKey}
                  label={column.header}
                  name={column.accessorKey?.replace('user.', '')}
                  select={column.muiTableBodyCellEditTextFieldProps?.select}
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                >
                  {column.muiTableBodyCellEditTextFieldProps?.children}
                </TextField>
              )
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Create Worker
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WorkerManagement;