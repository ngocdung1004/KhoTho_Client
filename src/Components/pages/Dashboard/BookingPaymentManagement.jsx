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
import Sidebar from "../Dashboard/Sidebar";
import axios from "axios";
import { API_ENDPOINT } from "../../../services/config";
import { Delete, Edit, Add, Visibility } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
const API_URL = `${API_ENDPOINT}/api/BookingPayment`;

const BookingPaymentManagement = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const navigate = useNavigate();
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
    fetchBookingPayments();
  }, []);

  const fetchBookingPayments = async () => {
    try {
      const response = await axios.get(API_URL);
      setTableData(response.data);
    } catch (error) {
      console.error("Error fetching booking payments:", error);
    }
  };

  const handleCreateNewRow = async (values) => {
    try {
      const newBookingPayment = {
        bookingId: values.bookingId,
        amount: values.amount,
        paymentMethod: values.paymentMethod,
        transactionId: values.transactionId,
        commissionRate: values.commissionRate,
      };

      const response = await axios.post(API_URL, newBookingPayment);
      setTableData([...tableData, response.data]);
    } catch (error) {
      console.error(
        "Error creating booking payment:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleSaveRowEdits = async ({ values, row }) => {
    try {
      const bookingPaymentId = row.original.bookingPaymentId;
      const updatedBookingPayment = {
        bookingPaymentId: bookingPaymentId,
        bookingId: values.bookingId,
        amount: values.amount,
        paymentMethod: values.paymentMethod,
        paymentStatus: values.paymentStatus,
        transactionId: values.transactionId,
        commissionRate: values.commissionRate,
      };

      await axios.put(`${API_URL}/${bookingPaymentId}`, updatedBookingPayment);
      fetchBookingPayments();
    } catch (error) {
      console.error("Error updating booking payment:", error);
    }
  };

  const handleDeleteRow = useCallback(
    async (row) => {
      if (
        !confirm(
          `Are you sure you want to delete booking payment with ID ${row.getValue("bookingPaymentId")}`
        )
      ) {
        return;
      }

      try {
        const bookingPaymentId = row.original.bookingPaymentId;
        await axios.delete(`${API_URL}/${bookingPaymentId}`);
        setTableData(tableData.filter((payment) => payment.bookingPaymentId !== bookingPaymentId));
      } catch (error) {
        console.error("Error deleting booking payment:", error);
      }
    },
    [tableData]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "bookingPaymentId",
        header: "Booking Payment ID",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "bookingId",
        header: "Booking ID",
        size: 80,
      },
      {
        accessorKey: "amount",
        header: "Amount",
        size: 100,
      },
      {
        accessorKey: "paymentMethod",
        header: "Payment Method",
        size: 140,
      },
      {
        accessorKey: "paymentStatus",
        header: "Payment Status",
        size: 140,
        muiTableBodyCellEditTextFieldProps: {
          select: true,
          children: [
            <MenuItem key="Pending" value="Pending">
              Pending
            </MenuItem>,
            <MenuItem key="Success" value="Success">
              Success
            </MenuItem>,
            <MenuItem key="Failed" value="Failed">
              Failed
            </MenuItem>,
            <MenuItem key="Cancelled" value="Cancelled">
              Cancelled
            </MenuItem>,
          ],
        },
      },
      {
        accessorKey: "transactionId",
        header: "Transaction ID",
        size: 140,
      },
      {
        accessorKey: "commissionRate",
        header: "Commission Rate",
        size: 100,
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
              renderRowActions={({ row }) => (
                <Box sx={{ display: "flex", gap: "1rem" }}>
                  <Tooltip arrow placement="left" title="Detail">
                    <IconButton
                      onClick={() => navigate(`/booking-payment/detail/${row.original.bookingPaymentId}`)}
                    >
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                  <Tooltip arrow placement="left" title="Edit">
                    <IconButton
                      onClick={() => {
                        setEditingRow(row);
                        setIsEditModalOpen(true);
                      }}
                    >
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
                  Create New Booking Payment
                </Button>
              )}
            />
          </Box>
          {editingRow && (
            <EditBookingPaymentModal
              open={isEditModalOpen}
              onClose={() => {
                setIsEditModalOpen(false);
                setEditingRow(null);
              }}
              onSubmit={handleSaveRowEdits}
              row={editingRow}
            />
          )}
          <CreateNewBookingPaymentModal
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            onSubmit={handleCreateNewRow}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

const EditBookingPaymentModal = ({ open, onClose, onSubmit, row }) => {
  const [values, setValues] = useState({
    bookingId: row.original.bookingId,
    amount: row.original.amount,
    paymentMethod: row.original.paymentMethod,
    paymentStatus: row.original.paymentStatus,
    transactionId: row.original.transactionId,
    commissionRate: row.original.commissionRate,
  });

  const handleSubmit = async () => {
    onSubmit({ values, row });
    onClose();
  };

  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle textAlign="center">Edit Booking Payment</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Booking ID"
              type="number"
              value={values.bookingId}
              onChange={(e) => setValues({ ...values, bookingId: parseInt(e.target.value) })}
            />
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={values.amount}
              onChange={(e) => setValues({ ...values, amount: parseFloat(e.target.value) })}
            />
            <TextField
              fullWidth
              label="Payment Method"
              value={values.paymentMethod}
              onChange={(e) => setValues({ ...values, paymentMethod: e.target.value })}
            />
            <TextField
              select
              fullWidth
              label="Payment Status"
              value={values.paymentStatus}
              onChange={(e) => setValues({ ...values, paymentStatus: e.target.value })}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Success">Success</MenuItem>
              <MenuItem value="Failed">Failed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Transaction ID"
              value={values.transactionId}
              onChange={(e) => setValues({ ...values, transactionId: e.target.value })}
            />
            <TextField
              fullWidth
              label="Commission Rate"
              type="number"
              value={values.commissionRate}
              onChange={(e) => setValues({ ...values, commissionRate: parseFloat(e.target.value) })}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const CreateNewBookingPaymentModal = ({ open, onClose, onSubmit }) => {
  const [values, setValues] = useState({
    bookingId: "",
    amount: "",
    paymentMethod: "",
    transactionId: "",
    commissionRate: "",
  });

  const handleSubmit = () => {
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle textAlign="center">Create New Booking Payment</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Booking ID"
              type="number"
              value={values.bookingId}
              onChange={(e) => setValues({ ...values, bookingId: parseInt(e.target.value) })}
            />
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={values.amount}
              onChange={(e) => setValues({ ...values, amount: parseFloat(e.target.value) })}
            />
            <TextField
              fullWidth
              label="Payment Method"
              value={values.paymentMethod}
              onChange={(e) => setValues({ ...values, paymentMethod: e.target.value })}
            />
            <TextField
              fullWidth
              label="Transaction ID"
              value={values.transactionId}
              onChange={(e) => setValues({ ...values, transactionId: e.target.value })}
            />
            <TextField
              fullWidth
              label="Commission Rate"
              type="number"
              value={values.commissionRate}
              onChange={(e) => setValues({ ...values, commissionRate: parseFloat(e.target.value) })}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Create Booking Payment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingPaymentManagement;