import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Typography,
  Box,
  CircularProgress,
  Alert,
  TextField,
  Grid,
  IconButton,
  Divider,
  Chip,
  Card,
  CardContent
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import axios from 'axios';
import { format, addMonths, subMonths } from 'date-fns';
import { API_ENDPOINT } from "../../../../services/config";

const Schedules = ({ workerId }) => {
  const [schedules, setSchedules] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const [schedulesResponse, bookingsResponse] = await Promise.all([
          axios.get(`${API_ENDPOINT}/api/WorkerSchedule/worker/${workerId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          axios.get(`${API_ENDPOINT}/api/Booking`, {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);
        
        setSchedules(schedulesResponse.data);
        setBookings(bookingsResponse.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (workerId) {
      fetchData();
    }
  }, [workerId]);

  const handlePreviousMonth = () => {
    setCurrentMonth(prevMonth => subMonths(prevMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prevMonth => addMonths(prevMonth, 1));
  };

  const getDateStatus = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    
    const dayBookings = bookings.filter(booking => 
      booking.bookingDate.split('T')[0] === formattedDate
    );

    if (dayBookings.length > 0) {
      const statuses = dayBookings.map(booking => booking.status);
      if (statuses.includes('Accepted')) return 'accepted';
      if (statuses.includes('Pending')) return 'pending';
      if (statuses.includes('Completed')) return 'completed';
      if (statuses.includes('Cancelled')) return 'cancelled';
    }

    return 'unavailable';
  };

  const getScheduleForDate = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    
    const dayBookings = bookings.filter(booking => 
      booking.bookingDate.split('T')[0] === formattedDate
    );

    return { bookings: dayBookings };
  };

  const renderScheduleInfo = () => {
    const { bookings: dayBookings } = getScheduleForDate(selectedDate);

    if (dayBookings.length === 0) {
      return <Typography>Không có lịch trình cho ngày này</Typography>;
    }

    return (
      <>
        {dayBookings.map((booking, index) => (
          <Card key={`booking-${index}`} sx={{ mt: 2, borderLeft: `5px solid ${getStatusColor(booking.status)}` }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: getStatusColor(booking.status) }}>
                {booking.status}
              </Typography>
              <Typography>
                Thời gian: {booking.startTime.slice(0, -3)} - {booking.endTime.slice(0, -3)}
              </Typography>
              <Typography>
                Ghi chú: {booking.notes}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </>
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return '#4CAF50';
      case 'Pending':
        return '#FFC107';
      case 'Completed':
        return '#2196F3';
      case 'Cancelled':
        return '#ee1616';
      default:
        return '#f5f5f5';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Paper elevation={3} sx={{ mt: 3, p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Lịch ngày
      </Typography>

      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item>
          <IconButton onClick={handlePreviousMonth}>
            <ChevronLeftIcon />
          </IconButton>
        </Grid>
        <Grid item xs>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Chọn ngày"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
              sx={{ width: '100%' }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item>
          <IconButton onClick={handleNextMonth}>
            <ChevronRightIcon />
          </IconButton>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Lịch làm việc: {format(selectedDate, 'MMMM dd, yyyy')}:
        </Typography>
        {renderScheduleInfo()}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Legend:
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 20, height: 20, backgroundColor: '#4CAF50', borderRadius: '50%' }} />
            <Typography variant="body2">Đồng ý</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 20, height: 20, backgroundColor: '#FFC107', borderRadius: '50%' }} />
            <Typography variant="body2">Đang chờ nhận việc</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 20, height: 20, backgroundColor: '#2196F3', borderRadius: '50%' }} />
            <Typography variant="body2">Hoàn thành</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 20, height: 20, backgroundColor: '#9E9E9E', borderRadius: '50%' }} />
            <Typography variant="body2">Từ chối</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default Schedules;