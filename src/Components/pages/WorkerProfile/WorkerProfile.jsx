import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Grid,
  Paper,
  Avatar,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Rating,
  Divider,
  Chip,
  Stack,
  IconButton,
} from "@mui/material";
import {
  LocationOn,
  Work,
  School,
  Phone,
  Email,
  Message,
  Verified,
  CalendarMonth,
} from "@mui/icons-material";

import { API_ENDPOINT } from "../../../services/config";
import NavBar from "../../NavBarLogin/NavBar";
import Footer from "../../FooterDiv/Footer";
import FeedbackSection from "../../FeedbackSection/FeedbackSection";
import defaultImage from "../../../Assets/about/worker.png";

const WorkerProfile = () => {
  const { workerId } = useParams();
  const [workerData, setWorkerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchWorkerDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_ENDPOINT}/api/Workers/${workerId}`);
        setWorkerData(response.data);
      } catch (error) {
        console.error("Error fetching worker details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkerDetails();
  }, [workerId]);

  const handleAddFeedback = (newFeedback) => {
    setFeedbacks([...feedbacks, newFeedback]);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h5">Loading...</Typography>
      </Box>
    );
  }

  if (!workerData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h5">No worker data found.</Typography>
      </Box>
    );
  }

  return (
    <>
      <NavBar />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Grid container spacing={4}>
          {/* Left Column - Profile Info */}
          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Avatar
                    src={workerData.user.profileImage || defaultImage}
                    sx={{ width: 200, height: 200, mb: 2 }}
                  />
                  <Typography variant="h5" gutterBottom>
                    {workerData.user.fullName}
                    {workerData.verified && (
                      <Verified color="primary" sx={{ ml: 1 }} />
                    )}
                  </Typography>
                  <Rating value={workerData.rating || 0} readOnly precision={0.5} />
                  <Typography color="text.secondary" gutterBottom>
                    ({workerData.totalReviews || 0} đánh giá)
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Stack spacing={2}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LocationOn color="primary" />
                    <Typography>Bình Định</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Work color="primary" />
                    <Typography>Thợ sửa chữa đồ dân dụng</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <School color="primary" />
                    <Typography>Kinh nghiệm {workerData.experienceYears} năm</Typography>
                  </Box>
                </Stack>

                <Box mt={3}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<CalendarMonth />}
                    sx={{ mb: 2 }}
                  >
                    Đặt lịch
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Message />}
                  >
                    Nhắn tin
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - Details & Stats */}
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              {/* About Section */}
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Giới thiệu
                  </Typography>
                  <Typography color="text.secondary">
                    {workerData.bio || "Chưa có thông tin giới thiệu."}
                  </Typography>
                </CardContent>
              </Card>

              {/* Stats Section */}
              <Card elevation={3}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Box textAlign="center">
                        <Typography variant="h4" color="primary">
                          {workerData.completedJobs || 0}
                        </Typography>
                        <Typography color="text.secondary">
                          Công việc hoàn thành
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box textAlign="center">
                        <Typography variant="h4" color="primary">
                          {workerData.rating || 0}
                        </Typography>
                        <Typography color="text.secondary">
                          Điểm đánh giá
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box textAlign="center">
                        <Typography variant="h4" color="primary">
                          {workerData.experienceYears || 0}
                        </Typography>
                        <Typography color="text.secondary">
                          Năm kinh nghiệm
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Skills Section */}
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Kỹ năng chuyên môn
                  </Typography>
                  <Box display="flex" gap={1} flexWrap="wrap">
                    {workerData.skills?.map((skill, index) => (
                      <Chip key={index} label={skill} color="primary" variant="outlined" />
                    )) || "Chưa có thông tin về kỹ năng."}
                  </Box>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>

        {/* Feedback Section */}
        <Box mt={4}>
          <FeedbackSection feedbacks={feedbacks} onSubmitFeedback={handleAddFeedback} />
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default WorkerProfile;