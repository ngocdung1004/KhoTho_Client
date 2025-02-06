import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINT } from '../../../services/config';
import Sidebar from '../Dashboard/Sidebar';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Divider,
  Box,
  Chip,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  ArrowBack,
  Payment,
  AccountBalance,
  Receipt,
  AttachMoney,
  Schedule,
  CheckCircle,
  Cancel,
  Timeline,
  Person,
  LocalAtm,
  DateRange,
} from '@mui/icons-material';

const API_URL = `${API_ENDPOINT}/api/BookingPayment`;

const DetailBookingPaymentManagement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentDetail = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setPayment(response.data);
      } catch (error) {
        console.error('Error fetching payment details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetail();
  }, [id]);

  const handleToggleTransferStatus = async () => {
    try {
      const newStatus = !payment.transferredToWorker;
      await axios.put(`${API_URL}/${id}/transferToWorker`, newStatus, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setPayment({ ...payment, transferredToWorker: newStatus });
    } catch (error) {
      console.error('Error updating transfer status:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography variant="h5" color="error">
          Payment not found
        </Typography>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Failed':
        return 'error';
      case 'Cancelled':
        return 'default';
      default:
        return 'default';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      dateStyle: 'full',
      timeStyle: 'medium'
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="fixed inset-y-0 left-0">
        <Sidebar />
      </div>

      <div className="flex-1 ml-[260px] p-8">
        <Box className="mb-6 flex justify-between items-center">
          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/khotho/admin/bookingpayment')}
            sx={{ 
              bgcolor: 'white', 
              color: 'primary.main',
              '&:hover': { bgcolor: 'grey.100' }
            }}
          >
            Back to List
          </Button>
          <Chip
            label={payment.paymentStatus}
            color={getStatusColor(payment.paymentStatus)}
            icon={payment.paymentStatus === 'Success' ? <CheckCircle /> : <Cancel />}
            sx={{ px: 3, py: 2, fontSize: '1rem' }}
          />
        </Box>

        <Grid container spacing={3}>
          {/* Main Payment Information */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h4" gutterBottom color="primary">
              Chi tiết thanh toán #{payment.bookingPaymentId}
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box className="flex items-center mb-2">
                    <Payment sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="subtitle1">
                      <strong>Mã đơn hàng:</strong> #{payment.bookingId}
                    </Typography>
                  </Box>
                  <Box className="flex items-center mb-2">
                    <AttachMoney sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="subtitle1">
                      <strong>Tổng tiền thanh toán:</strong> {formatCurrency(payment.amount)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box className="flex items-center mb-2">
                    <AccountBalance sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="subtitle1">
                      <strong>Phương thức thanh toán: </strong>                        
                      <span> Chuyển khoản</span>
                    </Typography>
                  </Box>
                  <Box className="flex items-center mb-2">
                    <Receipt sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="subtitle1">
                      <strong>Mã giao dịch:</strong> {payment.transactionId}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Amount Distribution */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom color="primary" className="flex items-center">
                <LocalAtm sx={{ mr: 1 }} />
                Số tiền phân phối
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box className="space-y-4">
                <Box className="flex justify-between items-center">
                  <Typography><strong>Thanh toán thợ:</strong></Typography>
                  <Typography color="success.main">
                    {formatCurrency(payment.workerAmount)}
                  </Typography>
                </Box>
                <Box className="flex justify-between items-center">
                  <Typography><strong>KhoTho nhận:</strong></Typography>
                  <Typography color="info.main">
                    {formatCurrency(payment.platformAmount)}
                  </Typography>
                </Box>
                <Box className="flex justify-between items-center">
                  <Typography><strong>Tỷ lệ hoa hồng:</strong></Typography>
                  <Typography>{payment.commissionRate}%</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Transfer Status */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom color="primary" className="flex items-center">
                <Timeline sx={{ mr: 1 }} />
                Trạng thái chuyển khoản
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box className="space-y-4">
                <Box className="flex justify-between items-center">
                  <Typography><strong>Thanh toán cho thợ:</strong></Typography>
                  <Chip
                    label={payment.transferredToWorker ? 'Đã chuyển' : 'Đang chờ'}
                    color={payment.transferredToWorker ? 'success' : 'warning'}
                    size="small"
                  />
                  <Button
                    variant="contained"
                    color={payment.transferredToWorker ? 'warning' : 'success'}
                    onClick={handleToggleTransferStatus}
                  >
                    {payment.transferredToWorker ? 'Chuyển lại' : 'Chuyển'}
                  </Button>
                </Box>
                {payment.transferredToWorkerAt && (
                  <Box className="flex justify-between items-center">
                    <Typography><strong>Transfer Date:</strong></Typography>
                    <Typography>{formatDateTime(payment.transferredToWorkerAt)}</Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Timeline */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom color="primary" className="flex items-center">
                <DateRange sx={{ mr: 1 }} />
                Tiến trình thanh toán
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box className="space-y-4">
                <Box className="flex items-center">
                  <Schedule sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography>
                    <strong>Thời gian thanh toán:</strong> {formatDateTime(payment.paymentTime)}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default DetailBookingPaymentManagement;