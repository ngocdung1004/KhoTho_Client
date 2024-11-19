import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField,
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

import "./WorkerProfile.css"

import { API_ENDPOINT } from "../../../services/config";
import NavBar from "../../NavBarLogin/NavBar";
import Footer from "../../FooterDiv/Footer";
import FeedbackSection from "../../FeedbackSection/FeedbackSection";
import defaultImage from "../../../Assets/about/worker.png";


const WorkerProfile = () => {
  const navigate = useNavigate();
  const { workerId } = useParams();
  const [workerData, setWorkerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const userData = localStorage.getItem('userData');
  if (!userData) {
    alert('Không tìm thấy userData. Vui lòng đăng nhập lại!');
    return;
  }

  const parsedUserData = JSON.parse(userData);
  const userId = parsedUserData.userId;
  if (!userId) {
    alert('Không tìm thấy userId. Vui lòng đăng nhập lại!');
    return;
  }

  const [bookingDetails, setBookingDetails] = useState({
    customerID: userId,
    workerID: workerId,
    jobTypeID: 0,
    bookingDate: "",
    startTime: "",
    endTime: "",
    hourlyRate: 0,
    notes: "",
  });


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const token = localStorage.getItem('authToken');

  const handleConfirmBooking = async () => {
    try {
      // Send booking details to the API
      console.log("-------",bookingDetails)
      await axios.post(`${API_ENDPOINT}/api/Booking`, bookingDetails,
        {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
        });
      console.log("Booking confirmed");
      // Notify the user
      alert("Đặt lịch thành công!");
      setIsModalOpen(false);
      setTimeout(() => navigate("/jobs"), 1000);
    } catch (error) {
      console.error("Error confirming booking:", error);
      alert("Đặt lịch thất bại. Vui lòng thử lại!");
    }
  };

  
  useEffect(() => {
    const fetchWorkerDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_ENDPOINT}/api/Workers/${workerId}`);
        setWorkerData(response.data);
      } catch (error) {
        console.error("Error fetching worker details:", error);
        setWorkerData(null);
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
    
    <div className="w-[85%] m-auto white-color-sl">
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
                    onClick={handleOpenModal}
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

        {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2 className="schedule-popup-header">Đặt Lịch</h2>
                <form className="schedule-form">
                  <div>
                    <label className="schedule-label">Ngày Đặt Lịch</label>
                    <input
                      type="date"
                      className="schedule-input"
                      name="bookingDate"
                      value={bookingDetails.bookingDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="schedule-label">Giờ Bắt Đầu</label>
                    <input
                      type="time"
                      className="schedule-input"
                      name="startTime"
                      value={bookingDetails.startTime}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="schedule-label">Giờ Kết Thúc</label>
                    <input
                      type="time"
                      className="schedule-input"
                      name="endTime"
                      value={bookingDetails.endTime}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="schedule-label">Ghi Chú</label>
                    <textarea
                      className="schedule-input"
                      name="notes"
                      value={bookingDetails.notes}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="row">
                    <button
                      type="button"
                      className="schedule-btn-confirm"
                      onClick={handleConfirmBooking}
                    >
                      Xác Nhận
                    </button>
                    <button
                      type="button"
                      className="popup-btn-cancel"
                      onClick={handleCloseModal}
                    >
                      Hủy
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        

      </Container>
      
      <Footer />
      
    </div>
    
  );
};

export default WorkerProfile;