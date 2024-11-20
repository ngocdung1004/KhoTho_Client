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
  Stack,
  TextField,
  Tooltip,
  ThemeProvider,
  createTheme,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';
import Sidebar from '../Dashboard/Sidebar';
import axios from 'axios';

const API_URL = 'https://localhost:7062/api/WorkerJobTypes';
const WORKERS_API_URL = 'https://localhost:7062/api/Workers';
const JOBTYPES_API_URL = 'https://localhost:7062/api/JobTypes';

const JobTypeManagement = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
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
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [workerJobTypesRes, workersRes, jobTypesRes] = await Promise.all([
        axios.get(API_URL),
        axios.get(WORKERS_API_URL),
        axios.get(JOBTYPES_API_URL)
      ]);

      setTableData(workerJobTypesRes.data);
      setWorkers(workersRes.data);
      setJobTypes(jobTypesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCreateNewRow = async (values) => {
    try {
      const newJobType = {
        workerJobTypeId: 0,
        workerId: values.workerId,
        jobTypeId: values.jobTypeId,
        jobType: null,
        worker: null
      };
      
      const response = await axios.post(API_URL, newJobType);
      await fetchData(); // Refresh all data
    } catch (error) {
      console.error('Error creating job type:', error);
    }
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (Object.keys(validationErrors).length) return;

    try {
      const jobTypeId = row.original.workerJobTypeId;
      const updatedJobType = {
        workerJobTypeId: jobTypeId,
        workerId: values.workerId,
        jobTypeId: values.jobTypeId,
        jobType: null,
        worker: null
      };
      
      await axios.put(`${API_URL}/${jobTypeId}`, updatedJobType);
      await fetchData(); // Refresh all data
      exitEditingMode();
    } catch (error) {
      console.error('Error updating job type:', error);
    }
  };

  const handleDeleteRow = useCallback(
    async (row) => {
      if (!confirm(`Are you sure you want to delete this job type?`)) {
        return;
      }

      try {
        const jobTypeId = row.original.workerJobTypeId;
        await axios.delete(`${API_URL}/${jobTypeId}`);
        await fetchData(); // Refresh all data
      } catch (error) {
        console.error('Error deleting job type:', error);
      }
    },
    [],
  );

  // Calculate workers count per job type
  const workersPerJobType = useMemo(() => {
    const counts = {};
    tableData.forEach(item => {
      counts[item.jobTypeId] = (counts[item.jobTypeId] || 0) + 1;
    });
    return counts;
  }, [tableData]);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'workerJobTypeId',
        header: 'ID',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'workerId',
        header: 'Worker',
        size: 200,
        Cell: ({ row }) => {
          const worker = workers.find(w => w.workerId === row.original.workerId);
          return worker ? worker.user.fullName : row.original.workerId;
        },
        Edit: ({ column, row, table }) => (
          <FormControl fullWidth>
            <InputLabel>Worker</InputLabel>
            <Select
              label="Worker"
              value={row.original.workerId}
              onChange={(e) => {
                const value = e.target.value;
                table.setEditingRow({
                  ...row,
                  original: { ...row.original, workerId: value }
                });
              }}
            >
              {workers.map((worker) => (
                <MenuItem key={worker.workerId} value={worker.workerId}>
                  {worker.user.fullName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ),
      },
      {
        accessorKey: 'jobTypeId',
        header: 'Job Type',
        size: 200,
        Cell: ({ row }) => {
          const jobType = jobTypes.find(j => j.jobTypeId === row.original.jobTypeId);
          return jobType ? (
            <div>
              {jobType.jobTypeName}
              <div style={{ fontSize: '0.8em', color: '#666' }}>
                ({workersPerJobType[jobType.jobTypeId] || 0} workers)
              </div>
            </div>
          ) : row.original.jobTypeId;
        },
        Edit: ({ column, row, table }) => (
          <FormControl fullWidth>
            <InputLabel>Job Type</InputLabel>
            <Select
              label="Job Type"
              value={row.original.jobTypeId}
              onChange={(e) => {
                const value = e.target.value;
                table.setEditingRow({
                  ...row,
                  original: { ...row.original, jobTypeId: value }
                });
              }}
            >
              {jobTypes.map((jobType) => (
                <MenuItem key={jobType.jobTypeId} value={jobType.jobTypeId}>
                  {jobType.jobTypeName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ),
      },
    ],
    [workers, jobTypes, workersPerJobType],
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
                  Create New Job Type
                </Button>
              )}
            />
          </Box>
          <CreateNewJobTypeModal
            columns={columns}
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            onSubmit={handleCreateNewRow}
            workers={workers}
            jobTypes={jobTypes}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

const CreateNewJobTypeModal = ({ open, columns, onClose, onSubmit, workers, jobTypes }) => {
  const [values, setValues] = useState({
    workerId: '',
    jobTypeId: ''
  });

  const handleSubmit = () => {
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Job Type</DialogTitle>
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
            <FormControl fullWidth>
              <InputLabel>Worker</InputLabel>
              <Select
                label="Worker"
                value={values.workerId}
                onChange={(e) => setValues({ ...values, workerId: e.target.value })}
              >
                {workers.map((worker) => (
                  <MenuItem key={worker.workerId} value={worker.workerId}>
                    {worker.user.fullName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Job Type</InputLabel>
              <Select
                label="Job Type"
                value={values.jobTypeId}
                onChange={(e) => setValues({ ...values, jobTypeId: e.target.value })}
              >
                {jobTypes.map((jobType) => (
                  <MenuItem key={jobType.jobTypeId} value={jobType.jobTypeId}>
                    {jobType.jobTypeName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Create Job Type
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobTypeManagement;