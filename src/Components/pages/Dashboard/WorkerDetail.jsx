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
  Avatar,
} from '@mui/material';
import {
  ArrowBack,
  Person,
  Email,
  Phone,
  Home,
  Star,
  VerifiedUser,
  Description,
  Image,
} from '@mui/icons-material';

const API_URL = `${API_ENDPOINT}/api/Workers`;

const WorkerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkerDetail = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setWorker(response.data);
      } catch (error) {
        console.error('Error fetching worker details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkerDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography variant="h5" color="error">
          Worker not found
        </Typography>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="fixed inset-y-0 left-0">
        <Sidebar />
      </div>

      <div className="flex-1 ml-[260px] p-8">
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/admin/workers')}
          sx={{ mb: 3 }}
        >
          Quay lại danh sách
        </Button>

        <Card elevation={3}>
          <CardContent>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography variant="h4" gutterBottom>
                Thông tin thợ
              </Typography>
              <Chip
                label={worker.verified ? 'Verified' : 'Not Verified'}
                color={worker.verified ? 'success' : 'default'}
                sx={{ mb: 2 }}
              />
            </Box>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      <Person sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Personal Information
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar src={`${API_ENDPOINT}${worker.profileImage}`} sx={{ width: 56, height: 56, mr: 2 }} />
                      <Typography variant="h6">{worker.user.fullName}</Typography>
                    </Box>
                    <Typography><strong>Email:</strong> {worker.user.email}</Typography>
                    <Typography><strong>Phone Number:</strong> {worker.user.phoneNumber}</Typography>
                    <Typography><strong>Address:</strong> {worker.user.address}</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      <Star sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Worker Information
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography><strong>Experience Years:</strong> {worker.experienceYears}</Typography>
                    <Typography><strong>Rating:</strong> {worker.rating}</Typography>
                    <Typography><strong>Bio:</strong> {worker.bio}</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      <Description sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Additional Information
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <Typography variant="subtitle1"><strong>Profile Image:</strong></Typography>
                        {worker.profileImage && (
                          <img src={`${API_ENDPOINT}${worker.profileImage}`} alt="Profile" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', marginTop: '10px' }} />
                        )}
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="subtitle1"><strong>Front ID Card:</strong></Typography>
                        {worker.frontIdcard && (
                          <img src={`${API_ENDPOINT}${worker.frontIdcard}`} alt="Front ID Card" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', marginTop: '10px' }} />
                        )}
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="subtitle1"><strong>Back ID Card:</strong></Typography>
                        {worker.backIdcard && (
                          <img src={`${API_ENDPOINT}${worker.backIdcard}`} alt="Back ID Card" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', marginTop: '10px' }} />
                        )}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkerDetail;