import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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

  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem('authToken');
  const [isJobType, setIsJobType] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState('default-avatar.png');

  const [fulljobTypes, setfullJobTypes] = useState([]); // Lưu trữ danh sách job types

  const [completedBookingsCount, setcompletedBookingsCount] = useState(0);
  const [reviewsCount, setreviewsCount] = useState(0);

  const [roundedRating, setroundedRating] = useState(0);

  useEffect(() => {
    const fetchReviewsAndCount = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/api/Reviews/worker/${workerId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        });
    
        setreviewsCount(response.data.length);

        // Lấy tất cả các rating
        const ratings = response.data.map(review => review.rating);

        // Tính trung bình số sao
        const averageRating = ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length;

        // Hàm làm tròn trung bình đến mốc 0.5
        setroundedRating(Math.round(averageRating * 2) / 2);
        
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };
    fetchReviewsAndCount();
  }, [token]);

  useEffect(() => {
  const fetchBookingsAndCountCompleted = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/api/Booking/worker/${workerId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      },
      });
  
      // Lọc và đếm số lượng status là "Completed"
      setcompletedBookingsCount(response.data.filter(booking => booking.status === 'Completed').length);
      
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu booking:', error);
    }
  };
  fetchBookingsAndCountCompleted();
}, [token]);

    // Lấy dữ liệu job types từ API
    useEffect(() => {
      const fetchJobTypes = async () => {
          try {
              const response = await axios.get(`${API_ENDPOINT}/api/JobTypes`, {
                  headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                  },
              });
              setfullJobTypes(response.data); // Lưu dữ liệu job types vào state
          } catch (error) {
              console.error("Error fetching job types:", error);
          }
      };
      fetchJobTypes();
  }, [token]);

  // Hàm để lấy tên job type từ id
    const getJobTypeName = (id) => {
      const jobType = fulljobTypes.find((type) => type.jobTypeId === id);
      return jobType ? jobType.jobTypeName : 'Không tìm thấy'; // Trả về tên job type hoặc thông báo nếu không tìm thấy
    };

  useEffect(() => {
    const fetchWorkerDetails = async () => {
      setLoading(true);
      // console.log(`Worker ID updated: ${workerId}`);
      try {
        const response = await axios.get(`${API_ENDPOINT}/api/Workers/${workerId}`, 
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const response_data_wokerJOB = await axios.get(`${API_ENDPOINT}/api/WorkerJobTypes/worker/${workerId}`, 
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsJobType(response_data_wokerJOB.data[0].jobTypeId)
        const imageUrl = response.data.profileImage 
        ? `${API_ENDPOINT}${response.data.profileImage}` 
        : '/default-avatar.png'; 
        setProfileImageUrl(imageUrl);
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

  

  // Fetch all bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/api/Booking`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    if (workerId && Array.isArray(bookings) && bookings.length > 0) {
      const filtered = bookings.filter((booking) => 
        booking.workerID.toString() === workerId.toString() && (booking.status === "Pending" || booking.status === "Accepted") 
      );
      setFilteredBookings(filtered);
    }
  }, [workerId, bookings]);

   // Function to format the time into HH-HH | dd/mm/yy
   const formatBookingTime = (startTime, endTime, bookingDate) => {
    const start = new Date(bookingDate);
    const [startHour, startMinute] = startTime.split(':');
    start.setHours(startHour, startMinute);
    
    const end = new Date(bookingDate);
    const [endHour, endMinute] = endTime.split(':');
    end.setHours(endHour, endMinute); 

    const startFormatted = `${start.getHours()}h - ${end.getHours()}h`;
    const dateFormatted = `Ngày ${start.getDate().toString().padStart(2, '0')}/${(start.getMonth() + 1).toString().padStart(2, '0')}/${start.getFullYear().toString().slice(2, 4)}`;

    return `${startFormatted} | ${dateFormatted}`;
  };

  const userData = localStorage.getItem('userData');
  if (!userData) {
    toast.error('Không tìm thấy userData. Vui lòng đăng nhập lại!', { position: "top-left", autoClose: 3000 });
    return;
  }

  const parsedUserData = JSON.parse(userData);
  const userId = parsedUserData.userId;
  if (!userId) {
    toast.error('Không tìm thấy userId. Vui lòng đăng nhập lại!', { position: "top-left", autoClose: 3000 });
    return;
  }



  const [bookingDetails, setBookingDetails] = useState({
    customerID: userId,
    workerID: workerId,
    jobTypeID: null,
    bookingDate: "",
    startTime: "",
    endTime: "",
    hourlyRate: 50000,
    notes: "",
  });

  

  useEffect(() => {
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      workerID: workerId, // Cập nhật workerID
    }));
  }, [workerId]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    setBookingDetails((prevDetails) => {
      let updatedDetails = { ...prevDetails, [name]: value };
  
      if (name === "startTime") {
        // Nếu giờ bắt đầu thay đổi, đảm bảo giờ kết thúc lớn hơn giờ bắt đầu
        if (value >= prevDetails.endTime) {
          updatedDetails.endTime = `${String(Number(value.split(":")[0]) + 1).padStart(2, "0")}:00`;
        }
      } else if (name === "endTime") {
        // Nếu giờ kết thúc thay đổi, không cho phép nhỏ hơn hoặc bằng giờ bắt đầu
        if (value <= prevDetails.startTime) {
          updatedDetails.endTime = `${String(Number(prevDetails.startTime.split(":")[0]) + 1).padStart(2, "0")}:00`;
        }
      }
  
      return updatedDetails;
    });
  };
  
  const handleConfirmBooking = async () => {
    try {
      // Chuyển đổi dữ liệu phù hợp với định dạng API yêu cầu
      const formattedBookingDetails = {
        ...bookingDetails,
        jobTypeID: isJobType,
        workerID: parseInt(bookingDetails.workerID, 10), // Chuyển workerID sang số
        bookingDate: `${bookingDetails.bookingDate}T00:00:00.000Z`, // Thêm thời gian vào bookingDate
        startTime: `${bookingDetails.startTime}:00`, // Thêm giây vào startTime
        endTime: `${bookingDetails.endTime}:00`, // Thêm giây vào endTime
        hourlyRate: bookingDetails.hourlyRate || 50000, // Đặt giá trị mặc định nếu cần
      };

      const response = await axios.post(`${API_ENDPOINT}/api/Booking`, formattedBookingDetails, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Lấy data trả về từ API
      const responseData = response.data;

      const formattedPaymentsDetails = {
        bookingId: parseInt(responseData.bookingID, 10),
        amount: totalCost,
        paymentMethod: "QR",
        transactionId: `TT${responseData.bookingID}`,
        commissionRate: 80, // Đã sửa thành đúng key 'commissionRate'
      };
      
      const response_payments = await axios.post(`${API_ENDPOINT}/api/BookingPayment`, formattedPaymentsDetails, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      toast.success("Đặt lịch thành công!", { position: "top-left", autoClose: 3000 });
      setIsModalOpen(false);
      setTimeout(() => navigate("/khotho/ordertracking", { state: responseData.bookingID }), 1000);
    } catch (error) {
      console.error("Error confirming booking:", error);
      toast.error("Đặt lịch thất bại. Vui lòng thử lại!", { position: "top-left", autoClose: 3000 });
    }
  };

  const calculateBookingDetails = () => {
    const { startTime, endTime, hourlyRate } = bookingDetails;
  
    if (startTime && endTime) {
      // Chuyển startTime và endTime từ định dạng "HH:00" sang số nguyên
      const startHour = parseInt(startTime.split(":")[0], 10);
      const endHour = parseInt(endTime.split(":")[0], 10);
  
      // Kiểm tra thời gian hợp lệ
      if (endHour <= startHour) {
        // Nếu giờ kết thúc nhỏ hơn hoặc bằng giờ bắt đầu
        return { totalHours: 0, totalCost: 0 };
      }
  
      // Tính tổng số giờ và chi phí
      const totalHours = endHour - startHour; // Chỉ chênh lệch giờ
      const totalCost = totalHours * hourlyRate;
  
      return { totalHours, totalCost };
    }
    
    // Nếu thiếu dữ liệu
    return { totalHours: 0, totalCost: 0 };
  };
  
  

  
  
  const { totalHours, totalCost } = calculateBookingDetails();

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
      <ToastContainer position="top-right" autoClose={3000} />
      <NavBar />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Grid container spacing={4}>
          {/* Left Column - Profile Info */}
          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Avatar
                    src={profileImageUrl}
                    sx={{ width: 200, height: 200, mb: 2 }}
                  />

                  <Typography variant="h5" gutterBottom>
                    {workerData.user.fullName}
                    {workerData.verified && (
                      <Verified color="primary" sx={{ ml: 1 }} />
                    )}

                  </Typography>
                  <Rating value={roundedRating || 0} readOnly precision={0.5} />
                  <Typography color="text.secondary" gutterBottom>
                    ({reviewsCount || 0} đánh giá)
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Stack spacing={2}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LocationOn color="primary" />
                    <Typography>{workerData.user.address}</Typography>
                  </Box>
                  {/* <Box display="flex" alignItems="center" gap={1}>
                    <Work color="primary" />
                    <Typography>Thợ sửa chữa đồ dân dụng</Typography>
                  </Box> */}
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
                          {completedBookingsCount || 0}
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
                    {getJobTypeName(isJobType)}
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
                  {/* Booking Form Fields */}
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
                      <select
                        className="schedule-input"
                        name="startTime"
                        value={bookingDetails.startTime}
                        onChange={handleInputChange}
                      >
                        {Array.from({ length: 24 }, (_, i) => (
                          <option key={i} value={`${String(i).padStart(2, "0")}:00`}>
                            {`${String(i).padStart(2, "0")}:00`}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="schedule-label">Giờ Kết Thúc</label>
                      <select
                        className="schedule-input"
                        name="endTime"
                        value={bookingDetails.endTime}
                        onChange={handleInputChange}
                      >
                        {Array.from({ length: 24 }, (_, i) => (
                          <option key={i} value={`${String(i).padStart(2, "0")}:00`}>
                            {`${String(i).padStart(2, "0")}:00`}
                          </option>
                        ))}
                      </select>
                    </div>


                  <div>
                    <label className="schedule-label">Đơn Giá (1 giờ)</label>
                    <div className="schedule-fixed-value">
                      {bookingDetails.hourlyRate} VND
                    </div>

                    <div>
                      <label className="schedule-label">Số Giờ Đã Đặt</label>
                      <div className="schedule-fixed-value">{totalHours} giờ</div>
                    </div>
                    <div>
                      <label className="schedule-label">Thành Tiền</label>
                      <div className="schedule-fixed-value">{totalCost} VND</div>
                    </div>
                  </div>

                  <div>
                    <label className="schedule-label">Địa chỉ cụ thể</label>
                    <textarea
                      className="schedule-input"
                      name="notes"
                      value={bookingDetails.notes}
                      onChange={handleInputChange}
                      placeholder="Ví dụ: 49 Bát Đàn, Quận Hoàn Kiếm, Hà Nội"
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
              <div className="popUp-right">
                <Card elevation={3}>
                  <CardContent>
                    {/* Display worker's bookings */}
                    <div className="worker-bookings">
                      <h3 className="worker-bookings-header">Lịch đã đặt của thợ</h3>
                      {filteredBookings.length === 0 ? (
                        <p>Không có lịch trình cho thợ này.</p>
                      ) : (
                        filteredBookings.map((booking) => (
                          <div className="block-hourDay">
                              <p>
                              {formatBookingTime(booking.startTime, booking.endTime, booking.bookingDate)}
                              </p>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        

      </Container>
      
      <Footer />
      
    </div>
    
  );
};

export default WorkerProfile;