import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../../../NavBarLogin/NavBar';
import Footer from '../../../FooterDiv/Footer';
<<<<<<< HEAD
=======
import Bookings from './Bookings';
import Schedules from './Schedules';
>>>>>>> 4af0bedb18ab875ad243f9b4a3cf34c5efccac5a
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
<<<<<<< HEAD
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Rating,
  Chip,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StatusChip = styled(Chip)(({ status }) => {
  const statusColors = {
    pending: { bg: '#fff3e0', color: '#f57c00' },
    accepted: { bg: '#e8f5e9', color: '#2e7d32' },
    rejected: { bg: '#ffebee', color: '#c62828' },
    completed: { bg: '#e3f2fd', color: '#1565c0' }
  };
  const currentStatus = status?.toLowerCase() || 'pending';
  return {
    backgroundColor: statusColors[currentStatus].bg,
    color: statusColors[currentStatus].color,
    fontWeight: 'bold'
  };
});
=======
  Avatar,
  Rating,
  CircularProgress,
  Alert
} from '@mui/material';
>>>>>>> 4af0bedb18ab875ad243f9b4a3cf34c5efccac5a

const WorkerDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('authToken');

<<<<<<< HEAD
    useEffect(() => {
      const fetchWorkerData = async () => {
        if (!token) {
            setError('Not authenticated');
            setLoading(false);
            return;
        }
    
        try {
            const response = await axios.get('https://localhost:7062/api/Workers/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Worker data:', response.data); // Add this to debug
            setWorker(response.data);
            
            // Only call fetchBookings if workerId exists
            if (response.data?.workerId) { // Note: check if it's workerID instead of workerId
                fetchBookings(response.data.workerId);
            } else {
                setError('Worker ID not found');
                setLoading(false);
            }
        } catch (err) {
            if (err.response?.status === 401) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
                localStorage.removeItem('userType');
                window.location.href = '/login';
            }
            setError(err.message);
            setLoading(false);
        }
    };

        fetchWorkerData();
    }, [token]);

    const fetchBookings = async (workerId) => {
        try {
            const response = await axios.get(`https://localhost:7062/api/Booking/worker/${workerId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setBookings(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    try {
        await axios.put(`https://localhost:7062/api/Booking/${bookingId}/status`, 
            JSON.stringify(newStatus), 
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        // Check if worker.workerID exists before calling fetchBookings
        if (worker?.workerId) {
            fetchBookings(worker.workerId);
        }
    } catch (err) {
        setError(err.message);
    }
};

if (loading) return (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <CircularProgress />
  </Box>
);

if (error) return (
  <Box p={3}>
      <Alert severity="error">{error}</Alert>
  </Box>
);

return (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar />
      
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
          <Grid container spacing={3}>
              {/* Worker Profile Section */}
              <Grid item xs={12} md={4}>
                  <Paper elevation={3} sx={{ p: 3 }}>
                      <Typography variant="h5" gutterBottom fontWeight="bold">
                          Worker Profile
                      </Typography>
                      {worker && (
                          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                              <Avatar
                                  src={worker.user.profilePicture || 'default-avatar.png'}
                                  sx={{ width: 120, height: 120 }}
                              />
                              <Typography variant="h6">
                                  {worker.user.fullName}
                              </Typography>
                              <Box sx={{ width: '100%' }}>
                                  <Typography variant="body1" gutterBottom>
                                      Experience: {worker.experienceYears} years
                                  </Typography>
                                  <Box display="flex" alignItems="center" gap={1}>
                                      <Typography>Rating:</Typography>
                                      <Rating value={worker.rating} readOnly precision={0.5} />
                                      <Typography>({worker.rating}/5)</Typography>
                                  </Box>
                                  <Typography variant="body1" sx={{ mt: 2 }}>
                                      Bio: {worker.bio}
                                  </Typography>
                              </Box>
                          </Box>
                      )}
                  </Paper>
              </Grid>

              {/* Bookings Section */}
              <Grid item xs={12} md={8}>
                  <Paper elevation={3} sx={{ p: 3 }}>
                      <Typography variant="h5" gutterBottom fontWeight="bold">
                          Bookings
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      
                      <Box display="flex" flexDirection="column" gap={2}>
                          {bookings.map((booking) => (
                              <Card key={booking.bookingID} elevation={2}>
                                  <CardContent>
                                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                          <Typography variant="h6">
                                              Booking #{booking.bookingID}
                                          </Typography>
                                          <StatusChip
                                              label={booking.status}
                                              status={booking.status}
                                          />
                                      </Box>
                                      
                                      <Grid container spacing={2}>
                                          <Grid item xs={12} sm={6}>
                                              <Typography gutterBottom>
                                                  Date: {new Date(booking.bookingDate).toLocaleDateString()}
                                              </Typography>
                                              <Typography gutterBottom>
                                                  Time: {booking.startTime} - {booking.endTime}
                                              </Typography>
                                              <Typography gutterBottom>
                                                  Total Hours: {booking.totalHours}
                                              </Typography>
                                          </Grid>
                                          <Grid item xs={12} sm={6}>
                                              <Typography gutterBottom>
                                                  Rate: ${booking.hourlyRate}/hour
                                              </Typography>
                                              <Typography gutterBottom>
                                                  Total Amount: ${booking.totalAmount}
                                              </Typography>
                                              <Typography gutterBottom>
                                                  Notes: {booking.notes}
                                              </Typography>
                                          </Grid>
                                      </Grid>
                                  </CardContent>

                                  <CardActions sx={{ p: 2, justifyContent: 'flex-end' }}>
                                      {booking.status === "Pending" && (
                                          <>
                                              <Button
                                                  variant="contained"
                                                  color="success"
                                                  onClick={() => handleUpdateBookingStatus(booking.bookingID, "Accepted")}
                                              >
                                                  Accept Booking
                                              </Button>
                                              <Button
                                                  variant="contained"
                                                  color="error"
                                                  onClick={() => handleUpdateBookingStatus(booking.bookingID, "Rejected")}
                                                  sx={{ ml: 1 }}
                                              >
                                                  Reject Booking
                                              </Button>
                                          </>
                                      )}
                                      {booking.status === "Accepted" && (
                                          <Button
                                              variant="contained"
                                              color="primary"
                                              onClick={() => handleUpdateBookingStatus(booking.bookingID, "Completed")}
                                          >
                                              Mark as Complete
                                          </Button>
                                      )}
                                  </CardActions>
                              </Card>
                          ))}
                      </Box>
                  </Paper>
              </Grid>
          </Grid>
      </Container>

      <Footer />
  </Box>
);
=======
  useEffect(() => {
    const fetchWorkerData = async () => {
      if (!token) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('https://localhost:7062/api/Workers/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Worker data:', response.data);
        setWorker(response.data);

        if (response.data?.workerId) {
          fetchBookings(response.data.workerId);
        } else {
          setError('Worker ID not found');
          setLoading(false);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
          localStorage.removeItem('userType');
          window.location.href = '/login';
        }
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkerData();
  }, [token]);

  const fetchBookings = async (workerId) => {
    try {
      const response = await axios.get(`https://localhost:7062/api/Booking/worker/${workerId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setBookings(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    try {
      await axios.put(`https://localhost:7062/api/Booking/${bookingId}/status`,
        JSON.stringify(newStatus),
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      if (worker?.workerId) {
        fetchBookings(worker.workerId);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Box p={3}>
      <Alert severity="error">{error}</Alert>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar />
      
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Grid container spacing={3}>
          {/* Worker Profile Section */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Worker Profile
              </Typography>

             
              {worker && (
                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                  <Avatar
                    src={worker.user.profilePicture || 'default-avatar.png'}
                    sx={{ width: 120, height: 120 }}
                  />
                  <Typography variant="h6">
                    {worker.user.fullName}
                  </Typography>
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="body1" gutterBottom>
                      Experience: {worker.experienceYears} years
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography>Rating:</Typography>
                      <Rating value={worker.rating} readOnly precision={0.5} />
                      <Typography>({worker.rating}/5)</Typography>
                    </Box>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                      Bio: {worker.bio}
                    </Typography>
                  </Box>
                </Box>
                
              )}
            </Paper>
            <Grid item xs={12}>
                 {worker && <Schedules workerId={worker.workerId} />}
               </Grid>
          </Grid>

          {/* Bookings Section */}
          <Grid item xs={12} md={8}>
            <Bookings 
              bookings={bookings} 
              handleUpdateBookingStatus={handleUpdateBookingStatus}
            />
          </Grid>
          
        </Grid>
        
      </Container>

      <Footer />
    </Box>
  );
>>>>>>> 4af0bedb18ab875ad243f9b4a3cf34c5efccac5a
};

export default WorkerDashboard;