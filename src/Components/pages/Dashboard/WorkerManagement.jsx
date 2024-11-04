import React, { useCallback, useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { Typography } from "@mui/material";

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
} from "@mui/material";
import { Delete, Edit, Add } from "@mui/icons-material";
import Sidebar from "../Dashboard/Sidebar";
import axios from "axios";

const API_URL = "https://localhost:7062/api/Workers";

const WorkerManagement = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#2196f3",
      },
    },
  });

  useEffect(() => {
    fetchWorkers();
    fetchUsers();
    fetchJobTypes();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://localhost:7062/api/Users");
      // Chỉ lấy những user chưa là worker
      const availableUsers = response.data.filter((user) => !user.worker);
      setUsers(availableUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchJobTypes = async () => {
    try {
      const response = await axios.get("https://localhost:7062/api/JobTypes");
      console.log("Job Types:", response.data); // Thêm dòng này để kiểm tra
      setJobTypes(response.data);
    } catch (error) {
      console.error("Error fetching job types:", error);
    }
  };

  const fetchWorkers = async () => {
    try {
      const response = await axios.get(API_URL);
      setTableData(response.data);
    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  };

  const handleCreateNewRow = async (values) => {
    try {
      const newWorker = {
        workerId: 0,
        userId: values.selectedUser.userId,
        experienceYears: values.experienceYears,
        rating: 0,
        bio: values.bio,
        verified: values.verified,
        workerJobTypes: values.selectedJobTypes.map((jobType) => ({
          jobTypeId: jobType.jobTypeId,
          workerId: 0,
        })),
      };

      const response = await axios.post(API_URL, newWorker);
      setTableData([...tableData, response.data]);
      // Refresh users list after creating new worker
      fetchUsers();
    } catch (error) {
      console.error("Error creating worker:", error);
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
        },
      };

      await axios.put(`${API_URL}/${workerId}`, updatedWorker);
      const updatedData = [...tableData];
      updatedData[row.index] = updatedWorker;
      setTableData(updatedData);
      exitEditingMode();
    } catch (error) {
      console.error("Error updating worker:", error);
    }
  };

  const handleDeleteRow = useCallback(
    async (row) => {
      if (
        !confirm(
          `Are you sure you want to delete ${row.getValue("user.fullName")}`
        )
      ) {
        return;
      }

      try {
        const workerId = row.original.workerId;
        await axios.delete(`${API_URL}/${workerId}`);
        setTableData(
          tableData.filter((worker) => worker.workerId !== workerId)
        );
      } catch (error) {
        console.error("Error deleting worker:", error);
      }
    },
    [tableData]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "workerId",
        header: "Worker ID",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "user.fullName",
        header: "Full Name",
        size: 140,
      },
      {
        accessorKey: "user.email",
        header: "Email",
        size: 140,
      },
      {
        accessorKey: "user.phoneNumber",
        header: "Phone Number",
        size: 120,
      },
      {
        accessorKey: "user.address",
        header: "Address",
        size: 200,
      },
      {
        accessorKey: "experienceYears",
        header: "Experience (Years)",
        size: 120,
      },
      {
        accessorKey: "rating",
        header: "Rating",
        size: 100,
      },
      {
        accessorKey: "bio",
        header: "Bio",
        size: 200,
      },
      {
        accessorKey: "verified",
        header: "Verified",
        size: 100,
        Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
        muiTableBodyCellEditTextFieldProps: {
          select: true,
          children: [
            <MenuItem key={true} value={true}>
              Yes
            </MenuItem>,
            <MenuItem key={false} value={false}>
              No
            </MenuItem>,
          ],
        },
      },
    ],
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <div className="flex h-screen bg-gray-100">
        <div className="fixed inset-y-0 left-0">
          <Sidebar />
        </div>

        <div className="flex-1 ml-[260px] p-8">
          <Box sx={{ maxWidth: "100%" }}>
            <MaterialReactTable
              displayColumnDefOptions={{
                "mrt-row-actions": {
                  muiTableHeadCellProps: {
                    align: "center",
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
                <Box sx={{ display: "flex", gap: "1rem" }}>
                  <Tooltip arrow placement="left" title="Edit">
                    <IconButton onClick={() => table.setEditingRow(row)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip arrow placement="right" title="Delete">
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteRow(row)}
                    >
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
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            onSubmit={handleCreateNewRow}
            users={users}
            jobTypes={jobTypes}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

const CreateNewWorkerModal = ({ open, onClose, onSubmit, users, jobTypes }) => {
  const [values, setValues] = useState({
    selectedUser: null,
    selectedJobTypes: [],
    experienceYears: "",
    bio: "",
    verified: false,
  });

  const handleSubmit = () => {
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle textAlign="center">Create New Worker</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack spacing={3} sx={{ mt: 2 }}>
            {/* User Selection */}
            <TextField
              select
              fullWidth
              label="Select User"
              value={values.selectedUser || ""}
              onChange={(e) => {
                const selectedUser = users.find(
                  (user) => user.userId === e.target.value
                );
                setValues({ ...values, selectedUser });
              }}
            >
              {users.map((user) => (
                <MenuItem key={user.userId} value={user.userId}>
                  {user.fullName} - {user.email}
                </MenuItem>
              ))}
            </TextField>

            {/* Selected User Info Display */}
            {values.selectedUser && (
              <Box sx={{ bgcolor: "background.paper", p: 2, borderRadius: 1 }}>
                <Typography variant="subtitle1">
                  Selected User Information:
                </Typography>
                <Typography>Email: {values.selectedUser.email}</Typography>
                <Typography>
                  Phone: {values.selectedUser.phoneNumber}
                </Typography>
                <Typography>Address: {values.selectedUser.address}</Typography>
              </Box>
            )}

            {/* Job Types Multiple Selection */}
            <TextField
  fullWidth
  label="Select Job Types"
  value={values.selectedJobTypes.map((jt) => jt.jobTypeId)}
  onChange={(e) => {
    const selectedIds = e.target.value;
    const selectedTypes = jobTypes.filter((jt) =>
      selectedIds.includes(jt.jobTypeId)
    );
    setValues({ ...values, selectedJobTypes: selectedTypes });
  }}
  select
  slotProps={{
    select: {
      multiple: true,
      renderValue: (selected) =>
        selected
          .map((id) => jobTypes.find((jobType) => jobType.jobTypeId === id)?.name)
          .join(", "),
    },
  }}
>
  {jobTypes.map((jobType) => (
    <MenuItem key={jobType.jobTypeId} value={jobType.jobTypeId}>
      {jobType.name}
    </MenuItem>
  ))}
</TextField>


            <TextField
              fullWidth
              label="Experience Years"
              type="number"
              value={values.experienceYears}
              onChange={(e) =>
                setValues({ ...values, experienceYears: e.target.value })
              }
            />

            <TextField
              fullWidth
              label="Bio"
              multiline
              rows={4}
              value={values.bio}
              onChange={(e) => setValues({ ...values, bio: e.target.value })}
            />

            <TextField
              select
              fullWidth
              label="Verified"
              value={values.verified}
              onChange={(e) =>
                setValues({ ...values, verified: e.target.value })
              }
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </TextField>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          color="primary"
          onClick={handleSubmit}
          variant="contained"
          disabled={
            !values.selectedUser || values.selectedJobTypes.length === 0
          }
        >
          Create Worker
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WorkerManagement;
